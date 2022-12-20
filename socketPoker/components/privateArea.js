import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
const privateArea = () => {
  const nativePrivateCards = [
    {number: '', suit: ''},
    {number: '', suit: ''},
  ];
  const [privateCards, setPrivateCards] = useState(nativePrivateCards);
  const [handRank, setHandRank] = useState('High Card');
  const [allHandRanks, setAllHandRanks] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [betRound, setBetRound] = useState(0);
  const [betTurn, setBetTurn] = useState(0);
  const [betDiff, setBetDiff] = useState(0);
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

      {/* Private Cards Section */}
      <View style={styles.privateCards}>
        <View style={styles.cardVertical}>
          <Text style={styles.cardNumber}>
            {privateCards[0] != undefined
              ? privateCards[0].number
              : nativePrivateCards[0].number}
          </Text>
          <Image
            style={styles.suitVertical}
            source={
              cards[
                privateCards[0] != undefined
                  ? privateCards[0].suit
                  : nativePrivateCards[0].suit
              ]
            }
          />
        </View>
        <View style={styles.cardVertical}>
          <Text style={styles.cardNumber}>
            {privateCards[1] != undefined
              ? privateCards[1].number
              : nativePrivateCards[1].number}
          </Text>
          <Image
            style={styles.suitVertical}
            source={
              cards[
                privateCards[1] != undefined
                  ? privateCards[1].suit
                  : nativePrivateCards[1].suit
              ]
            }
          />
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
        <Text style={styles.hand}>{handRank}</Text>
      </View>
      <View style={styles.selfInfo}>
        <Text style={styles.totalMoney}>Total: ${totalMoney}</Text>
        <Text style={styles.currentBet}>
          Old: ${betRound} +({betDiff})
        </Text>
        <Text style={styles.currentBet}>New: ${betTurn}</Text>
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
  cardVertical: {
    height: 100,
    width: 80,
    borderWidth: 3,
    borderRadius: 8,
    margin: 1,
  },

  cardHorizontal: {
    height: 60,
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 1,
    marginTop: 1,
  },

  cardNumber: {
    paddingLeft: 5,
    paddingTop: 5,
    fontFamily: 'Njal-Bold',
    fontSize: 30,
  },

  suitVertical: {
    position: 'absolute',
    height: 40,
    width: 40,
    top: 30,
    left: 15,
  },

  suitHorizontal: {
    position: 'absolute',
    height: 40,
    width: 40,
    top: 10,
    right: 20,
  },
  hand: {
    fontSize: 20,
    fontFamily: 'Njal-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },

  selfInfo: {
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    marginLeft: 20,
    width: 220,
    borderRadius: 10,
    borderWidth: 3,
  },
  totalMoney: {
    fontSize: 20,
    fontFamily: 'Njal-Bold',

    borderBottomWidth: 1,
  },
  currentBet: {
    fontSize: 23,
    fontFamily: 'Njal-Bold',
    paddingTop: 5,
  },
  privateCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
export default privateArea;
