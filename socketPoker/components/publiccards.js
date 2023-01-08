import React, {useState, useContext, useRef} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';
import {SocketContext} from '../screens/home';
const PublicCards = () => {
  const socket = useContext(SocketContext);
  const [publicCards, setPublicCards] = useState([
    {number: 'A', suit: 'Spade'},
    {number: '2', suit: 'Club'},
    {number: '3', suit: 'Diamond'},
    {number: '4', suit: 'Heart'},
    {number: '5', suit: 'Spade'},
  ]);
  const [gameTurn, setGameTurn] = useState('');
  const cards = {
    Spade: require('../assets/spade.png'),
    Heart: require('../assets/heart.png'),
    Diamond: require('../assets/diamond.png'),
    Club: require('../assets/club.png'),
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  socket.on('publicCard', publicCards => {
    setPublicCards(publicCards);
  });
  socket.on('stage', stage => {
    setGameTurn(stage);
    console.log(stage);
    // Fade in the public cards when they are revealed
    if (stage === 'Flop') {
      //console.log(stage);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    } else if (stage === 'Turn') {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    } else if (stage === 'River') {
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  });
  return (
    <View>
      <View style={styles.publicCardsTop}>
        <View style={styles.cardVertical}>
          {(gameTurn == 'Flop' ||
            gameTurn == 'Turn' ||
            gameTurn == 'River' ||
            gameTurn == 'Showdown') && (
            <Animated.View style={{opacity: fadeAnim}}>
              <Text style={styles.cardNumber}>{publicCards[0].number}</Text>
              <Image
                style={styles.suitVertical}
                source={cards[publicCards[0].suit]}
              />
            </Animated.View>
          )}
        </View>
        <View style={styles.cardVertical}>
          {(gameTurn == 'Flop' ||
            gameTurn == 'Turn' ||
            gameTurn == 'River' ||
            gameTurn == 'Showdown') && (
            <Animated.View style={{opacity: fadeAnim}}>
              <Text style={styles.cardNumber}>{publicCards[1].number}</Text>
              <Image
                style={styles.suitVertical}
                source={cards[publicCards[1].suit]}
              />
            </Animated.View>
          )}
        </View>
        <View style={styles.cardVertical}>
          {(gameTurn == 'Flop' ||
            gameTurn == 'Turn' ||
            gameTurn == 'River' ||
            gameTurn == 'Showdown') && (
            <Animated.View style={{opacity: fadeAnim}}>
              <Text style={styles.cardNumber}>{publicCards[2].number}</Text>
              <Image
                style={styles.suitVertical}
                source={cards[publicCards[2].suit]}
              />
            </Animated.View>
          )}
        </View>
      </View>
      <View style={styles.publicCardsBot}>
        <View style={styles.cardVertical}>
          {(gameTurn == 'Turn' ||
            gameTurn == 'River' ||
            gameTurn == 'Showdown') && (
            <Animated.View style={{opacity: fadeAnim2}}>
              <Text style={styles.cardNumber}>{publicCards[3].number}</Text>
              <Image
                style={styles.suitVertical}
                source={cards[publicCards[3].suit]}
              />
            </Animated.View>
          )}
        </View>
        <View style={styles.cardVertical}>
          {(gameTurn == 'River' || gameTurn == 'Showdown') && (
            <Animated.View style={{opacity: fadeAnim3}}>
              <Text style={styles.cardNumber}>{publicCards[4].number}</Text>
              <Image
                style={styles.suitVertical}
                source={cards[publicCards[4].suit]}
              />
            </Animated.View>
          )}
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
