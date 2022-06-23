import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ResultEpisode} from '../interfaces/RickAndMortyInterace';

interface Props {
  info: ResultEpisode;
}

const EpisodesInfo: React.FC<Props> = ({info}) => {
  const {id, name, air_date, episode, characters} = info;
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={() => navigate('EpisodesInfo', characters)}>
      <Text style={styles.mainTitle}>
        {episode} - {air_date}
      </Text>
      <Text style={styles.subTitle}>
        {id} - {name}
      </Text>
      <Text style={styles.characters}>
        Total Characters: {characters.length}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    backgroundColor: '#2D2F34',
    marginHorizontal: 10,
    height: 120,
    width: 300,
    marginBottom: 25,
    borderRadius: 10,
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
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  characters: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    marginHorizontal: 20,
  },
});

export default EpisodesInfo;
