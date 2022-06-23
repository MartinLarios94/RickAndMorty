import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InfoContainer from '../components/InfoContainer';
import useEpisodes from '../hooks/useEpisodes';
import {RootStackParams} from '../navigator/Navigation';

interface Props
  extends StackScreenProps<RootStackParams, 'CharacterInfoScreen'> {}

const {height} = Dimensions.get('screen');

const CharacterInfoScreen: React.FC<Props> = ({route, navigation}) => {
  const info = route.params;
  const {name, image, status, location, origin, species, episode} = info;

  const episodesList: number[] = episode.map(item => {
    const urlParts = item.split('/');
    const id: number = Number(urlParts[urlParts.length - 1]);
    return id;
  });

  const {episodes} = useEpisodes({id: episodesList});

  return (
    <ScrollView>
      <View style={characterStyle.imageContainer}>
        <View style={characterStyle.borderImage}>
          <Image source={{uri: image}} style={characterStyle.posterImage} />
        </View>
      </View>
      <View style={characterStyle.marginContainer}>
        <Text style={characterStyle.name}>{name}</Text>
      </View>
      <View style={characterStyle.statusContainer}>
        <View
          style={{
            ...characterStyle.status,
            backgroundColor:
              status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'grey',
          }}
        />
        <Text style={characterStyle.text}>{status}</Text>
      </View>
      <InfoContainer name={location.name} logo="location-outline" />
      <InfoContainer name={origin.name} logo="globe-outline" />
      <InfoContainer
        name={species}
        logo={species === 'Human' ? 'body-outline' : 'logo-electron'}
      />
      <View style={{marginBottom: 40}}>
        <InfoContainer name="Episodes :" logo="list-outline" />
        {episodes.map((item, index) => (
          <Text key={index} style={characterStyle.episodes}>
            {item.id}.- {item.name}
          </Text>
        ))}
      </View>
      <View style={characterStyle.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="chevron-back-outline" size={60} color="#1B1E23" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const characterStyle = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: height * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 7,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  borderImage: {
    flex: 1,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    overflow: 'hidden',
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  name: {
    color: 'rgb(255,255,255)',
    fontSize: 30,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 25,
  },
  status: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  text: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'baseline',
    marginLeft: 15,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 15,
    left: 5,
  },
  episodes: {
    color: 'rgb(255,255,255)',
    marginTop: 2,
    marginHorizontal: 56,
    fontSize: 15,
  },
});
export default CharacterInfoScreen;
