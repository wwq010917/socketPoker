import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import Table from '../components/playertable';
import PublicCards from '../components/publiccards';
import PrivateArea from '../components/privateArea';
export default function Game({navigation}) {
  const [squareButtons, setSquareButtons] = useState({
    first: 'FOLD',
    second: 'RAISE',
    third: 'CHECK',
    key: '1',
  });

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
      <View style={styles.roundButtons}>
        <TouchableOpacity>
          <View style={styles.oval}>
            <Text></Text>
          </View>
        </TouchableOpacity>

        <View style={styles.oval}>
          <Text></Text>
        </View>
        <View style={styles.oval}>
          <Text></Text>
        </View>
        <View style={styles.oval}>
          <Text></Text>
        </View>
      </View>
      <View style={styles.squareButtons}>
        <TouchableOpacity>
          <Text style={styles.font}>{squareButtons.first}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.font}>{squareButtons.second}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.font}>{squareButtons.third}</Text>
        </TouchableOpacity>
      </View>
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
  },
  roundButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingTop: 20,
    paddingRight: 50,
  },

  oval: {
    width: 40,
    height: 50,
    borderRadius: 40,
    borderWidth: 2,
    transform: [{scaleX: 2}],
  },

  squareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },

  font: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
  },
});
