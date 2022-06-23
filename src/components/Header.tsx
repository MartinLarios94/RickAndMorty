import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  quantity: number;
  typeScreen: 'CharactersScreen' | 'EpisodesScreen' | 'LocationScreen';
}

const Header: React.FC<HeaderProps> = ({quantity, typeScreen}) => {
  let title: string = '';
  switch (typeScreen) {
    case 'CharactersScreen':
      title = 'Characters: ';
      break;
    case 'EpisodesScreen':
      title = 'Episodes: ';
      break;
    case 'LocationScreen':
      title = 'Locations: ';
      break;
  }
  return (
    <View style={styles.container}>
      {}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    color: 'rgb(255,255,255)',
    fontSize: 15,
    fontWeight: '400',
  },
  count: {
    color: 'rgb(255,255,255)',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 15,
  },
});

export default Header;
