import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Game from '../screens/game';
import Intro from '../screens/Intro';
import React from 'react';
const Stack = createStackNavigator();

export default function HostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}
