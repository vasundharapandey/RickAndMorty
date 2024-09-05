import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [randomImage, setRandomImage] = useState(null);
  const [aliveImage, setAliveImage] = useState(null);
  const [deadImage, setDeadImage] = useState(null);

  useEffect(() => {
    
    const fetchImages = async () => {
      try {
    
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const allCharacters = response.data.results;

        
        const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        setRandomImage(randomCharacter);

        
        const aliveCharacters = allCharacters.filter(char => char.status === 'Alive');
        const deadCharacters = allCharacters.filter(char => char.status === 'Dead');

        
        if (aliveCharacters.length > 0) {
          const randomAliveCharacter = aliveCharacters[Math.floor(Math.random() * aliveCharacters.length)];
          setAliveImage(randomAliveCharacter);
        }
        if (deadCharacters.length > 0) {
          const randomDeadCharacter = deadCharacters[Math.floor(Math.random() * deadCharacters.length)];
          setDeadImage(randomDeadCharacter);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterList', { category: 'all' })}>
        {randomImage && <Image source={{ uri: randomImage.image }} style={styles.image} />}
        <Text style={styles.text}>All Characters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterList', { category: 'alive' })}>
        {aliveImage && <Image source={{ uri: aliveImage.image }} style={styles.image} />}
        <Text style={styles.text}>Alive Characters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterList', { category: 'dead' })}>
        {deadImage && <Image source={{ uri: deadImage.image }} style={styles.image} />}
        <Text style={styles.text}>Dead Characters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
