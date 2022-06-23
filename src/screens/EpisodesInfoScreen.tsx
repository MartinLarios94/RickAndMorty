/* eslint-disable react-native/no-inline-styles */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import CharacterProfile from '../components/CharacterProfile';
import useCharacters from '../hooks/useCharacters';
import {RootStackParams} from '../navigator/Navigation';

interface EpisodesInfoProps
  extends StackScreenProps<RootStackParams, 'EpisodesInfo'> {}

const EpisodesInfoScreen: React.FC<EpisodesInfoProps> = ({
  route,
  navigation,
}) => {
  const {top} = useSafeAreaInsets();
  const info = route.params;

  const charactersList: number[] = info.map(item => {
    const urlParts = item.split('/');
    const id: number = Number(urlParts[urlParts.length - 1]);
    return id;
  });

  // let ids: string = '';

  // for (let i = 0; i < info.length; i++) {
  //   const urls = info[i];
  //   const urlParts = urls.split('/');
  //   // const id: string = urlParts[urlParts.length - 1];
  // }

  const {characters, isLoading} = useCharacters({id: charactersList});

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="lightblue" size={100} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: top + 10,
      }}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CharacterProfile character={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <TouchableOpacity
            style={{marginLeft: 10, marginBottom: 10, flexDirection: 'row'}}
            onPress={() => navigation.pop()}>
            <Icon name="chevron-back-outline" size={60} color="grey" />
            <Text style={episodeInfoStyle.text}>Back</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const episodeInfoStyle = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'grey',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default EpisodesInfoScreen;
