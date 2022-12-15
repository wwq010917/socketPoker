import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
const PlayerTable = () => {
  const [players, setPlayers] = useState([
    {name: 'Player1', total: 1000, current: 100, pos: 'BTN', key: '1'},
    {name: 'Player2', total: 1000, current: 100, pos: 'SB', key: '2'},
    {name: 'Player3', total: 1000, current: 100, pos: 'BB', key: '3'},
    {name: 'Player4', total: 1000, current: 100, pos: '', key: '4'},
    {name: 'Player5', total: 1000, current: 100, pos: '', key: '5'},
    {name: 'Player6', total: 1000, current: 100, pos: '', key: '6'},
    {name: 'Player7', total: 1000, current: 100, pos: '', key: '7'},
    {name: 'Player8', total: 1000, current: 100, pos: '', key: '8'},
    {name: 'Player9', total: 1000, current: 100, pos: '', key: '9'},
  ]);

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
