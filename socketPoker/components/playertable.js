import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import {SocketContext} from '../screens/home';
const PlayerTable = () => {
  const socket = useContext(SocketContext);

  socket.emit();
  const [players, setPlayers] = useState([]);
  socket.emit('getPlayers', response => {
    setPlayers(response.players);
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
              <View style={styles.upperbox}>
                <Text style={styles.player}> {item.name} </Text>
                <Text style={styles.pos}>{item.pos} </Text>
              </View>
              <View style={styles.lowerbox}>
                <Text style={styles.smallText}>{item.total} </Text>
                <Text style={styles.smallText}>{item.current} </Text>
              </View>
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
  player: {
    flex: 1,
    padding: 5,
    paddingLeft: 0,
    fontFamily: 'Njal-Bold',
    fontSize: 25,
  },
  table: {
    borderWidth: 3,
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
