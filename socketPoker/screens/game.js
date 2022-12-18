import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import Table from '../components/playertable';
import PublicCards from '../components/publiccards';
import PrivateArea from '../components/privateArea';
import ReadyButton from '../components/readyButton';
import ControlButton from '../components/controlButtons';
export default function Game({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.body}>
        {/* Player Table element */}
        <Table />
        <View style={styles.bodyRight}>
          {/* Public cards element */}
          <PublicCards />
          {/* Private cards element */}
          <PrivateArea />
        </View>
      </View>
      <ControlButton />
      <ReadyButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  body: {
    flexDirection: 'row',
  },

  bodyRight: {
    flexDirection: 'column',
    padding: 1,
  },
});
