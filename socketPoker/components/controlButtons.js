import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SocketContext} from '../screens/home';
import {Slider} from '@miblanchard/react-native-slider';
const ControlButton = ({
  currentPlayer,
  betRound,
  setBetRound,
  pot,
  setPot,
  totalMoney,
  setTotalMoney,
  betTurn,
  setBetTurn,
  betDiff,
  setBetDiff,
  gameTurn,
  gameStart,
}) => {
  // useEffect(() => {
  //   // console.log(currentPlayer);
  //   if (currentPlayer == global.Name) {
  //     setCallState('FRC');
  //   } else {
  //     setCallState(false);
  //   }
  //   // console.log(callState);
  // }, [currentPlayer]);

  const [callState, setCallState] = useState(false);
  const [lockButtons, setLockButtons] = useState(true);
  const [betTurnTemp, setBetTurnTemp] = useState(0);
  const [slider, setSlider] = useState(false);
  const [largestBet, setLargestBet] = useState(0);
  const [largestRaise, setLargestRaise] = useState(0);
  const [selfPlay, setSelfPlay] = useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const socket = useContext(SocketContext);
  socket.on('getBetData', response => {
    setLargestBet(response.largestBet);
    setLargestRaise(response.largestRaise);
    setPot(response.pot);
    console.log(response);
  });

  useEffect(() => {
    console.log(largestBet);
    if (currentPlayer == global.Name && gameTurn == 'Preflop') {
      setCallState('FRC');
    } else if (currentPlayer == global.Name && largestBet == 0) {
      setCallState('FBC');
    } else if (currentPlayer == global.Name) {
      setCallState('FRC');
    } else if (gameTurn == 'Showdown') {
      setReadyState(true);
    }
  }, [currentPlayer]);

  const handleAllin = () => {
    setSelfPlay('Allin');
    setBetTurn(totalMoney + betRound);
    setBetDiff(totalMoney);
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
    if (totalMoney + betRound <= largestBet) {
      return false;
    }
    var bet = largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleRaise = async () => {
    if (totalMoney + betRound <= largestBet) {
      return false;
    }
    var bet = largestRaise + largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setBetTurnTemp(bet);
    setLockButtons(false);
    setSlider(true);
    setConfirmState(true);
  };
  const handleRaiseMin = async () => {
    if (totalMoney + betRound <= largestBet) {
      return false;
    }
    var bet = largestRaise + largestBet;
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };

  const handleRaiseHalf = async () => {
    if (totalMoney + betRound <= largestBet) {
      return false;
    }
    var bet = largestBet + Math.floor((largestBet + pot) / 2);
    setSelfPlay('Call');
    setBetTurn(bet);
    setBetDiff(bet - betRound);
    setLockButtons(false);
    setConfirmState(true);
  };
  const handleRaiseFull = async () => {
    if (totalMoney + betRound <= largestBet) {
      return false;
    } else if (totalMoney + betRound <= largestBet * 2 + pot) {
      return false;
    }
    var bet = largestBet * 2 + pot;
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

  const handleConfirm = async () => {
    if (betTurn == totalMoney) {
      setSelfPlay('Allin');
    }
    socket.emit('endTurn', global.Name, selfPlay, betTurn);

    //add function to communicate with server here
    setConfirmState(false);
    setLockButtons(true);
    setSlider(false);
    setCallState(false);
    setBetRound(betTurn);
    setBetTurn(0);
    setBetDiff(0);
  };
  const handleCancel = async () => {
    setSlider(false);
    setLockButtons(true);
    setConfirmState(false);
    setBetTurn(0);
    setBetDiff(0);
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
      {!slider && callState && gameStart && (
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
              <Text style={styles.ovalText}>Pot</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAllin}>
            <View style={styles.oval}>
              <Text style={styles.ovalText}>ALL IN</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {callState == 'FRC' && lockButtons && gameStart && (
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
      {callState == 'FBC' && lockButtons && gameStart && (
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
      {confirmState && (
        <View style={styles.squareButtons}>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.confirm}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancel}>CANCEL</Text>
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
    height: 60,
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
  confirm: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
  },
  cancel: {
    fontSize: 30,
    fontFamily: 'Njal-Bold',
    padding: 15,
  },
});
export default ControlButton;
