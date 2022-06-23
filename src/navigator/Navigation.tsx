import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CharacterInfoScreen from '../screens/CharacterInfoScreen';
import MainScreen from '../screens/MainScreen';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {Characters} from '../interfaces/RickAndMortyInterace';
import EpisodesScreen from '../screens/EpisodesScreen';
import EpisodesInfoScreen from '../screens/EpisodesInfoScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  HomeScreen: undefined;
  CharacterInfoScreen: Characters;
  Episodes: undefined;
  EpisodesInfo: string[];
};

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#1B1E23',
        },
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CharacterInfoScreen"
        component={CharacterInfoScreen}
      />
      <Stack.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.BottomSheetSlideInSpec,
            close: TransitionSpecs.BottomSheetSlideOutSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          cardStyleInterpolator: ({current, next, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                  {
                    rotate: current.progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0.5, 0],
                    }),
                  },
                  {
                    scale: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.9],
                        })
                      : 1,
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            };
          },
        }}
      />
      <Stack.Screen name="EpisodesInfo" component={EpisodesInfoScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
