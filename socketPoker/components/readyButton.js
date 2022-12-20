import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SocketContext} from '../screens/home';
const ReadyButton = () => {
  const socket = useContext(SocketContext);

  const [unreadyState, setUnreadyState] = useState(false);
  const [readyState, setReadyState] = useState(true);
  socket.emit('getready', response => {
    // Update the state variable with the "players" data received in the response
    setUnreadyState(response.ready);
    setReadyState(!response.ready);
  });
  const handleReady = async () => {
    setReadyState(false);
    setUnreadyState(true);
    socket.emit('ready', response => {});
  };

  const handleUnready = async () => {
    setReadyState(true);
    setUnreadyState(false);
    socket.emit('unready');
  };
  return (
    <View>
      {readyState && (
        <View style={styles.readyButton}>
          <TouchableOpacity onPress={handleReady}>
            <Text style={styles.ready}>READY</Text>
          </TouchableOpacity>
        </View>
      )}
      {unreadyState && (
        <View style={styles.unreadyButton}>
          <TouchableOpacity onPress={handleUnready}>
            <Text style={styles.unready}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  ready: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 12,
    paddingLeft: 130,
    paddingRight: 133,
  },
  readyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 8,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'green',
  },

  unready: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
    paddingLeft: 130,
  },
  unreadyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 8,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'red',
  },
});
export default ReadyButton;
