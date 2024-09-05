
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CharacterCard from '../components/CharacterCard'; 
import { SafeAreaView } from 'react-native-safe-area-context';
export default function CharacterListScreen({ route, navigation }) {
  const { category } = route.params;

  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    fetchCharacters('https://rickandmortyapi.com/api/character/?' + (category !== 'all' ? `status=${category}` : ''));
  }, [category]);

  useEffect(() => {
    let url = 'https://rickandmortyapi.com/api/character/?';
    if (statusFilter) url += `status=${statusFilter}&`;
    if (speciesFilter) url += `species=${speciesFilter}&`;
    if (genderFilter) url += `gender=${genderFilter}&`;

    fetchCharacters(url);
  }, [statusFilter, speciesFilter, genderFilter]);

  const fetchCharacters = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      let fetchedCharacters = response.data.results;
      fetchedCharacters = sortCharactersWithFavorites(fetchedCharacters, favorites);
      setCharacters(fetchedCharacters);
      setNextPage(response.data.info.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortCharactersWithFavorites = (charactersList, favoritesList) => {
    return charactersList.sort((a, b) => {
      const isAFavorite = favoritesList.some(fav => fav.id === a.id);
      const isBFavorite = favoritesList.some(fav => fav.id === b.id);
      if (isAFavorite && !isBFavorite) return -1;
      if (!isAFavorite && isBFavorite) return 1;
      return 0;
    });
  };

  const toggleFavorite = async (character) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let updatedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (updatedFavorites.some(fav => fav.id === character.id)) {
        updatedFavorites = updatedFavorites.filter(fav => fav.id !== character.id);
      } else {
        updatedFavorites.push(character);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setCharacters(sortCharactersWithFavorites(characters, updatedFavorites));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
        setCharacters((prevCharacters) =>
          sortCharactersWithFavorites(prevCharacters, parsedFavorites)
        );
      }
    };
    loadFavorites();
  }, []);

  const loadMoreCharacters = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

  return (
    <SafeAreaView style={styles.biggestContainer}>
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filters:</Text>
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Status</Text>
            <Picker
              selectedValue={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Alive" value="Alive" />
              <Picker.Item label="Dead" value="Dead" />
              <Picker.Item label="Unknown" value="unknown" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Species</Text>
            <Picker
              selectedValue={speciesFilter}
              onValueChange={(value) => setSpeciesFilter(value)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Human" value="Human" />
              <Picker.Item label="Alien" value="Alien" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Gender</Text>
            <Picker
              selectedValue={genderFilter}
              onValueChange={(value) => setGenderFilter(value)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Genderless" value="genderless" />
              <Picker.Item label="Unknown" value="unknown" />
            </Picker>
          </View>
        </View>
      </View>

      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFavorite={favorites.some(fav => fav.id === item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
          />
        )}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  biggestContainer: { flex: 1 ,
    height:'100%'
  },
  container: { flex: 1, padding: 10 },
  filterContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 ,color:'white'},
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  pickerContainer: { flex: 1, marginHorizontal: 5 },
  pickerLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  picker: { height: 50, width: '100%', backgroundColor: '#ddd', borderRadius: 5 },
});
