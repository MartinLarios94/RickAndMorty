import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {CharactersImage} from '../interfaces/RickAndMortyInterace';

interface Props {
  character: CharactersImage;
}

const CharacterProfile: React.FC<Props> = ({character}) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: character.image}} />
      <Text style={styles.text}>{character.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    height: 100,
    width: 300,
    backgroundColor: '#2D2F34',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    width: 200,
  },
});
export default CharacterProfile;
