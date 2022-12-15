import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../components/header';
import Table from '../components/playertable';
import PublicCards from '../components/publiccards';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';

export default function Game({navigation}) {
  const [publicCards, setPublicCards] = useState([
    {number: 'A', suit: 'Spade', key: '1'},
    {number: '2', suit: 'Club', key: '2'},
    {number: '3', suit: 'Diamond', key: '3'},
    {number: '4', suit: 'Heart', key: '4'},
    {number: '5', suit: 'Spade', key: '5'},
  ]);

  const [blind, setblind] = useState([{small: 10, big: 20}]);
  const [pot, setPot] = useState(1000);

  const cards = {
    Spade: require('../assets/spade.png'),
    Heart: require('../assets/heart.png'),
    Diamond: require('../assets/diamond.png'),
    Club: require('../assets/club.png'),
  };

  const [squareButtons, setSquareButtons] = useState({
    first: 'FOLD',
    second: 'RAISE',
    third: 'CHECK',
    key: '1',
  });

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 3,
          backgroundColor: 'black',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.body}>
        {/* Player Table element */}
        <Table />

        <View style={styles.bodyRight}>
          {/* Public cards element */}
          <PublicCards />
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
          <Text style={styles.sb1}>{squareButtons.first}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.sb1}>{squareButtons.second}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.sb1}>{squareButtons.third}</Text>
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

  player: {
    flex: 1,
    padding: 5,
    paddingLeft: 0,
    fontFamily: 'Njal-Bold',
    fontSize: 25,
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

  sb1: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
  },
});
