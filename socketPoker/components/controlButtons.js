import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SocketContext} from '../screens/home';
const ControlButton = () => {
  const [squareButtons, setSquareButtons] = useState({
    first: 'FOLD',
    second: 'RAISE',
    third: 'CHECK',
    key: '1',
  });
  return (
    <View>
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
};
const styles = StyleSheet.create({
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
export default ControlButton;
