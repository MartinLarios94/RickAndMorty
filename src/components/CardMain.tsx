import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  Title: string;
  Screen: 'Home' | 'Episodes' | 'Locations';
  Image: ImageSourcePropType;
}

const CardMain: React.FC<Props> = ({Title, Screen, Image}) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(Screen)}>
      <ImageBackground
        style={{
          ...mainStyles.imageContainer,
          width: Screen === 'Locations' ? 200 : 150,
          marginTop: Screen === 'Locations' ? 20 : 0
        }}
        imageStyle={mainStyles.image}
        source={Image}>
        <Text style={mainStyles.text}>{Title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const mainStyles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    height: 200,
    marginHorizontal: 10,
    shadowColor: '#5afc03',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 9.98,
    elevation: 6,
  },
  image: {
    borderRadius: 20,
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
export default CardMain;
