import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CharacterDetailScreen({ route }) {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Origin: {character.origin.name}</Text>
      <Text>Episodes: {character.episode.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold' }
});
