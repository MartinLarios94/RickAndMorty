import React, {useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EpisodesInfo from '../components/EpisodesInfo';
import Header from '../components/Header';
import useCharactersPaginated from '../hooks/useCharactersPaginated';
import useEpisodesPaginated from '../hooks/useEpisodesPaginated';

const EpisodesScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {isLoading, isEnd, episodesPaginated, getEpisodes} =
    useEpisodesPaginated();
  const {Episodes} = useCharactersPaginated();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="lightblue" size={100} />
      </View>
    );
  }
  return (
    <View style={{...episodesStyles.container, marginTop: top + 10}}>
      <Animated.FlatList
        data={episodesPaginated}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [-1, 0, 110 * index, 110 * (index + 2)];
          const opacityInputRange = [-1, 0, 130 * index, 130 * (index + 0.5)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View style={{transform: [{scale}], opacity}}>
              <EpisodesInfo info={item} />
            </Animated.View>
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={getEpisodes}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <Header typeScreen="EpisodesScreen" quantity={Episodes.count} />
        )}
        ListFooterComponent={() =>
          !isEnd ? (
            <ActivityIndicator size={30} color="grey" />
          ) : (
            <Text style={episodesStyles.warning}>
              There's not data to show!
            </Text>
          )
        }
      />
    </View>
  );
};

const episodesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  warning: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(255,156,140)',
  },
});

export default EpisodesScreen;
