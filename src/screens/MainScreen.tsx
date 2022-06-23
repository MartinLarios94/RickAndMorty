/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import CardMain from '../components/CardMain';

const MainScreen = () => {
  return (
    <ImageBackground
      style={{flex: 1}}
      blurRadius={7}
      source={require('../assets/background.jpg')}>
      <View style={mainStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <CardMain
            Title="Characters"
            Screen="Home"
            Image={require('../assets/characters.jpg')}
          />
          <CardMain
            Title="Episodes"
            Screen="Episodes"
            Image={require('../assets/episodes.jpg')}
          />
        </View>
        <CardMain
          Title="Locations"
          Screen="Locations"
          Image={require('../assets/locations.jpg')}
        />
      </View>
    </ImageBackground>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    height: 200,
    width: 150,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    top: 90,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.34)',
  },
});

export default MainScreen;
