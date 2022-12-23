import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SocketContext} from '../screens/home';
import {Slider} from '@miblanchard/react-native-slider';
const ControlButton = currentPlayer => {
  useEffect(() => {
    console.log(currentPlayer.currentPlayer);
    if (currentPlayer.currentPlayer == global.Name) {
      setCallState('FRC');
    } else {
      setCallState(false);
    }
    console.log(callState);
  }, [currentPlayer]);

  const [gameTurn, setGameTurn] = useState('');
  const [callState, setCallState] = useState(false);
  const [lockButtons, setLockButtons] = useState(true);
  const [betTurnTemp, setBetTurnTemp] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [betTurn, setBetTurn] = useState(0);
  const [slider, setSlider] = useState(false);
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
      {!slider && callState && (
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
            <View style={styles.squareContainer1}>
              <Text style={styles.font}>FOLD</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRaise}>
            <View style={styles.squareContainer2}>
              <Text style={styles.font}>RAISE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall}>
            <View style={styles.squareContainer3}>
              <Text style={styles.font}>CALL</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {callState == 'FBC' && lockButtons && (
        <View style={styles.squareButtons}>
          <TouchableOpacity onPress={handleFold}>
            <View style={styles.squareContainer1}>
              <Text style={styles.font}>FOLD</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRaise}>
            <View style={styles.squareContainer2}>
              <Text style={styles.font}>BET</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheck}>
            <View style={styles.squareContainer3}>
              <Text style={styles.font}>CHECK</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    marginLeft: 30,
    marginTop: 15,
    marginRight: 30,
    borderWidth: 3,
    borderRadius: 10,
    padding: 6,
  },
  roundButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingTop: 20,
    paddingRight: 50,
    paddingBottom: 5,
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
    height: 50,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 8,
    marginLeft: 30,
    marginRight: 30,
  },
  squareContainer1: {
    paddingTop: 10,
  },
  squareContainer2: {
    paddingTop: 10,
  },
  squareContainer3: {
    paddingTop: 10,
  },
  font: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
  },
});
export default ControlButton;
