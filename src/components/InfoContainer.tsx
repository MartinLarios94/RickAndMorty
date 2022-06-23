import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  name: string;
  logo: string;
  size?: number;
  color?: string;
}

const InfoContainer: React.FC<Props> = ({
  name,
  logo,
  size = 17,
  color = 'grey',
}) => {
  return (
    <View style={styles.statusContainer}>
      <Icon name={logo} size={size} color={color} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default InfoContainer;
