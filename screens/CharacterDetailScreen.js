import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CharacterDetailScreen({ route }) {
  const { character } = route.params;

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Status: <Text style={styles.detailValue}>{character.status}</Text></Text>
        <Text style={styles.detailText}>Species: <Text style={styles.detailValue}>{character.species}</Text></Text>
        <Text style={styles.detailText}>Gender: <Text style={styles.detailValue}>{character.gender}</Text></Text>
        <Text style={styles.detailText}>Origin: <Text style={styles.detailValue}>{character.origin.name}</Text></Text>
        <Text style={styles.detailText}>Episodes: <Text style={styles.detailValue}>{character.episode.length}</Text></Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: 'center', backgroundColor: '#f5f5f5' },
  image: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: '#ccc', marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  detailsContainer: { width: '100%', paddingHorizontal: 20 },
  detailText: { fontSize: 16, color: '#555', marginBottom: 8 },
  detailValue: { fontWeight: 'bold', color: '#000' }
});
