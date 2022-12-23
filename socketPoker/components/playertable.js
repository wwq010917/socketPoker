import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import {SocketContext} from '../screens/home';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
const PlayerTable = ({gameStart, setGameStart, currentPlayer}) => {
  // Retrieve the socket connection from the React context
  const socket = useContext(SocketContext);

  // Set up a state variable called "players" with an initial value of an empty array
  const [players, setPlayers] = useState([]);

  // Send a message called "getPlayers" over the socket connection,
  // and provide a callback function to be executed when a response is received
  socket.emit('getPlayers', response => {
    // Update the state variable with the "players" data received in the response
    setPlayers(response.players);
  });

  socket.on('wait', success => {
    if (success == true) {
      socket.emit('start');
      // setGameStart(true);
    }
  });
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  return (
    <View style={styles.tableWrapper}>
      <View style={styles.table}>
        <FlatList
          data={players}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({item}) => (
            <View style={styles.box}>
              <View>
                <View style={styles.upperbox}>
                  <Text
                    style={
                      item.name === global.Name ? styles.self : styles.player
                    }>
                    {item.name}
                  </Text>
                  <Text style={styles.pos}>{item.pos} </Text>
                </View>
                <View style={styles.lowerbox}>
                  <Text style={styles.smallText}>{item.total} </Text>
                  <Text style={styles.smallText}>{item.current} </Text>
                </View>
              </View>
              {item.readyState && !gameStart && (
                <View style={styles.readyOverlay}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={40}
                    style={styles.check}
                  />
                </View>
              )}
              {item.name == currentPlayer && gameStart && (
                <View style={styles.readyOverlay}></View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tableWrapper: {
    flex: 1,
  },
  self: {
    flex: 1,
    padding: 5,
    paddingLeft: 0,
    fontFamily: 'Njal-Bold',
    fontSize: 25,
    color: 'red',
  },
  player: {
    flex: 1,
    padding: 5,
    paddingLeft: 0,
    fontFamily: 'Njal-Bold',
    fontSize: 28,
  },
  table: {
    borderWidth: 3,
  },
  box: {
    flex: 1,
  },
  readyOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'green',
    height: '100%',
    width: '100%',
  },

  check: {
    flex: 1,
    marginLeft: 40,
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperbox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
  },

  lowerbox: {
    flex: 1,
    flexDirection: 'row',
  },

  pos: {
    fontSize: 15,
    fontFamily: 'Njal-Bold',
    // backgroundColor: 'yellow',
    // alignSelf: 'flex-end'
    position: 'absolute',
    right: 0,
  },
});
export default PlayerTable;
