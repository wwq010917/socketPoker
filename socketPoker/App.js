import 'react-native-gesture-handler';
import React from 'react';
import HostStack from './routes/hostStack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <HostStack />
    </NavigationContainer>
  );
}
