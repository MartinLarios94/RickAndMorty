import React from 'react';
import {View, ActivityIndicator, StyleSheet, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CardInfo from '../components/CardInfo';
import Header from '../components/Header';
import useCharactersPaginated from '../hooks/useCharactersPaginated';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {Characters, charactersList, isLoading, loadCharacters} =
    useCharactersPaginated();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="lightblue" size={100} />
      </View>
    );
  }
  return (
    <View style={{...homeStyles.container, marginTop: top + 10}}>
      <Animated.FlatList
        data={charactersList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CardInfo info={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCharacters}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <Header typeScreen="CharactersScreen" quantity={Characters.count} />
        )}
        ListFooterComponent={() => <ActivityIndicator size={30} color="grey" />}
      />
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
