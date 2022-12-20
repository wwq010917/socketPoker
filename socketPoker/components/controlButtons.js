import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SocketContext} from '../screens/home';
import {Slider} from '@miblanchard/react-native-slider';
const ControlButton = () => {
  const [gameTurn, setGameTurn] = useState('');
  const [callState, setCallState] = useState('FRC');
  const [lockButtons, setLockButtons] = useState(true);
  const handleAllin = () => {
    setSelfPlay('Allin');
    setBetTurn(totalMoney + betRound);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleFold = () => {
    setSelfPlay('Fold');
    setBetTurn(0);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleCall = () => {
    //if this happens then must go allin, block the button
    if (totalMoney + betRound <= roomStatus.data.largestBet) {
      return false;
    }
    var bet = roomStatus.data.largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleRaise = async () => {
    if (totalMoney + betRound <= roomStatus.data.largestBet) {
      return false;
    }
    var bet = roomStatus.data.largestRaise + roomStatus.data.largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setBetTurnTemp(bet);
    setLockButtons(false);
    setSlider(true);
    setConfirmState(true);
  };
  const handleRaiseMin = async () => {
    if (totalMoney + betRound <= roomStatus.data.largestBet) {
      return false;
    }
    var bet = roomStatus.data.largestRaise + roomStatus.data.largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };

  const handleRaiseHalf = async () => {
    if (totalMoney + betRound <= roomStatus.data.largestBet) {
      return false;
    }
    var bet =
      roomStatus.data.largestBet +
      Math.floor((roomStatus.data.largestBet + roomStatus.data.pot) / 2);
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleRaiseFull = async () => {
    if (totalMoney + betRound <= roomStatus.data.largestBet) {
      return false;
    } else if (
      totalMoney + betRound <=
      roomStatus.data.largestBet * 2 + roomStatus.data.pot
    ) {
      return false;
    }
    var bet = roomStatus.data.largestBet * 2 + roomStatus.data.pot;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);

    setLockButtons(false);
    setConfirmState(true);
  };

  const handleCheck = async () => {
    setSelfPlay('Check');
    setBetTurn(0);
    setLockButtons(false);
    setConfirmState(true);
  };
  const [slider, setSlider] = useState(false);
  return (
    <View>
      {slider && (
        <View style={styles.sliderContainer}>
          <Slider
            value={betTurnTemp}
            maximumValue={totalMoney}
            minimumValue={betTurnTemp}
            step={10}
            trackClickable={true}
            onValueChange={setBetTurn}
          />
        </View>
      )}
      {!slider && (
        <View style={styles.roundButtons}>
          <TouchableOpacity onPress={handleRaiseMin}>
            <View style={styles.oval}>
              <Text style={styles.ovalText}>MIN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRaiseHalf}>
            <View style={styles.oval}>
              <Text style={styles.ovalText}>1/2POT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRaiseFull}>
            <View style={styles.oval}>
              <Text style={styles.ovalText}>{gameTurn}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAllin}>
            <View style={styles.oval}>
              <Text style={styles.ovalText}>ALL IN</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {callState == 'FRC' && lockButtons && (
        <View style={styles.squareButtons}>
          <TouchableOpacity onPress={handleFold}>
            <Text style={styles.sb1}>FOLD</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRaise}>
            <Text style={styles.sb2}>RAISE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.sb3}>CALL</Text>
          </TouchableOpacity>
        </View>
      )}
      {callState == 'FBC' && lockButtons && (
        <View style={styles.squareButtons}>
          <TouchableOpacity onPress={handleFold}>
            <Text style={styles.sb1}>FOLD</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRaise}>
            <Text style={styles.sb2}>BET</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheck}>
            <Text style={styles.sb3}>CHECK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  roundButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingTop: 5,
    paddingRight: 50,
  },

  oval: {
    width: 40,
    height: 50,
    borderRadius: 40,
    borderWidth: 2,
    transform: [{scaleX: 2}],
  },
  ovalText: {
    fontSize: 14,
    fontFamily: 'Njal-Bold',
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  squareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 8,
    marginLeft: 30,
    marginRight: 30,
  },

  font: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
  },
});
export default ControlButton;
