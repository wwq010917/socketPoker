import React, {useState, useContext, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faGear} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {SocketContext} from '../screens/home';
import {ModalContext} from '../screens/game';
const Header = ({navigation}) => {
  const {setModalVisible} = useContext(ModalContext);
  const socket = useContext(SocketContext);
  const [startGame, setStartGame] = useState(false);
  const [Round, setRound] = useState('');
  const [roomNumber, setNumber] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(5);
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    socket.on('timer', wait => {
      setWaiting(wait);
    });
  }, [waiting]);
  useEffect(() => {
    //
    socket.on('countdown', count => {
      setTime(count);
      if (count == 0) {
        console.log('something');
        setPassed(true);
        socket.on('stage', stage => {
          console.log('something2');
          console.log(stage);
          setRound(stage);
        });
      }
    });
  }, [time]); // the empty array ensures that the effect only runs once

  socket.emit('getRoomNumber', response => {
    setNumber(response.roomNumber);
  });

  return (
    <View style={styles.header}>
      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => {
            socket.emit('disconnected');
            navigation.navigate('Home');
          }}>
          <FontAwesomeIcon icon={faArrowLeft} size={40} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {!waiting && (
        <View style={styles.roomNumberContainter}>
          <Text style={styles.roomNumber}>{roomNumber}</Text>
        </View>
      )}
      {waiting && !passed && (
        <View>
          <Text style={{fontSize: 30}}>{time}</Text>
        </View>
      )}
      {waiting && passed && (
        <View>
          <Text style={{fontSize: 26}}>{Round}</Text>
        </View>
      )}

      <View style={styles.settings}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <FontAwesomeIcon icon={faGear} size={35} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  back: {
    paddingLeft: 10,
    position: 'absolute',
    left: 0,
  },

  settings: {
    paddingRight: 10,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
  },
  roomNumberContainter: {
    alignSelf: 'center',
  },
  roomNumber: {
    fontSize: 30,
  },
});
export default Header;
