import React, {useState, useContext, createContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {ModalContext} from '../screens/game';
const Helper = () => {
  const {setModalVisible} = useContext(ModalContext);
  const cards = {
    Spade: require('../assets/spade.png'),
    Heart: require('../assets/heart.png'),
    Diamond: require('../assets/diamond.png'),
    Club: require('../assets/club.png'),
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('nice');
        setModalVisible(false);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Royal Flush</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>J</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>K</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Straight Flush</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>7</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>8</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>9</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>J</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Four Of Kind</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Club}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>2</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Full House</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>K</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>K</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>K</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Flush</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>9</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>8</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>6</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Straight</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Club}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>9</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>8</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>7</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>6</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Three Of Kind</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>10</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Two Pairs</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Club}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>6</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>One Pair</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Club}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>7</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>6</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>5</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>High Card</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>A</Text>
              <Image style={styles.suitVertical} source={cards.Club}></Image>
            </View>

            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>Q</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>8</Text>
              <Image style={styles.suitVertical} source={cards.Diamond}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>5</Text>
              <Image style={styles.suitVertical} source={cards.Heart}></Image>
            </View>
            <View style={styles.card}>
              <Text style={{paddingLeft: 2}}>3</Text>
              <Image style={styles.suitVertical} source={cards.Spade}></Image>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'baseline',
    marginTop: 60,
    height: '81%',
    width: '95%',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: 'white',
    elevation: 10,
  },
  textContainer: {
    width: '35%',
    marginTop: 14,
  },
  cardContainer: {
    width: '65%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
  },

  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
  },
  text: {
    fontFamily: 'Njal-Bold',
    fontSize: 22,
  },
  card: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    marginRight: 6,
  },

  suitVertical: {
    height: 20,
    width: 20,

    alignSelf: 'center',
  },
});
export default Helper;
