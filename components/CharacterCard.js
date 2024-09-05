import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function CharacterCard({ character, isFavorite, onToggleFavorite, onPress }) {
  return (
    <Animatable.View animation="fadeInUp" duration={500}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <View>
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.species}>{character.species}</Text>
            <Text style={styles.status}>{character.status}</Text>
          </View>
          <TouchableOpacity onPress={() => onToggleFavorite(character)}>
            <Text style={[styles.heart, isFavorite ? styles.filledHeart : styles.emptyHeart]}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 25,resizeMode:'contain' },
  name: { fontSize: 16, fontWeight: 'bold' },
  species: { fontSize: 14, color: 'gray' },
  status: { fontSize: 14, color: 'darkgreen' },
  heart: { fontSize: 24, marginLeft: 10 },
  filledHeart: { color: 'red' },
  emptyHeart: { color: 'black' }
});
