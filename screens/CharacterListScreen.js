import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CharacterListScreen({ route, navigation }) {
  const { category } = route.params;
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    let url = 'https://rickandmortyapi.com/api/character';
    if (category !== 'all') {
      url += `?status=${category}`;
    }

    axios.get(url)
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error(error));
  }, [category]);

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { character: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text>{item.name}</Text>
              <Text>{item.species}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { flexDirection: 'row', padding: 10, margin: 5, backgroundColor: 'white', borderRadius: 5 },
  image: { width: 50, height: 50, marginRight: 10 }
});
