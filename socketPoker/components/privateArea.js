import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
const privateArea = () => {
  const [publicCards, setPublicCards] = useState([
    {number: 'A', suit: 'Spade', key: '1'},
    {number: '2', suit: 'Club', key: '2'},
    {number: '3', suit: 'Diamond', key: '3'},
    {number: '4', suit: 'Heart', key: '4'},
    {number: '5', suit: 'Spade', key: '5'},
  ]);

  const cards = {
    Spade: require('../assets/spade.png'),
    Heart: require('../assets/heart.png'),
    Diamond: require('../assets/diamond.png'),
    Club: require('../assets/club.png'),
  };
  const [pot, setPot] = useState(1000);
  return (
    <View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <Text style={styles.pot}>POT: £{pot}</Text>
      </View>
      <View style={styles.privateCards}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[0].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[0].suit]} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[1].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[1].suit]} />
        </View>
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <Text style={styles.pot}>Hand Hand</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 80,
    borderWidth: 3,
    borderRadius: 8,
    margin: 1,
  },
  cardNumber: {
    paddingLeft: 5,
    paddingTop: 5,
    fontFamily: 'Njal-Bold',
    fontSize: 30,
  },
  suit: {
    position: 'absolute',
    height: 40,
    width: 40,
    top: 30,
    left: 15,
  },
  pot: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 13,
    paddingTop: 21,
    borderRadius: 30,
    borderWidth: 3,
  },

  privateCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
export default privateArea;
