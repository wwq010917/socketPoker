import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const PublicCards = () => {
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
  return (
    <View>
      <View style={styles.publicCardsTop}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[0].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[0].suit]} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[1].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[1].suit]} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[2].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[2].suit]} />
        </View>
      </View>
      <View style={styles.publicCardsBot}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[3].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[3].suit]} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{publicCards[4].number}</Text>
          <Image style={styles.suit} source={cards[publicCards[4].suit]} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  publicCardsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  publicCardsBot: {
    flexDirection: 'row',
    paddingLeft: 55,
  },
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
});
export default PublicCards;
