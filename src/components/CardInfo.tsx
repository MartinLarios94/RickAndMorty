import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Characters} from '../interfaces/RickAndMortyInterace';

interface Props {
  info: Characters;
}

const CardInfo: React.FC<Props> = ({info}) => {
  const {image} = info;
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={() => navigate('CharacterInfoScreen', info)}>
      <Image source={{uri: image}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 150,
    width: 150,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#F6F6B3',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    marginHorizontal: 20,
  },
});

export default CardInfo;
