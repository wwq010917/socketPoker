import React, {useState, useContext, createContext} from 'react';
import {StyleSheet, View, Modal, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/header';
import Table from '../components/playertable';
import PublicCards from '../components/publiccards';
import PrivateArea from '../components/privateArea';
import ReadyButton from '../components/readyButton';
import ControlButton from '../components/controlButtons';
import Helper from '../components/Helper';
import {io} from 'socket.io-client';
import {SocketContext} from '../screens/home';

export const ModalContext = createContext({
  setModalVisible: () => {},
});
export default function Game({navigation}) {
  const socket = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(false);
  socket.on('checkStart', response => {
    setGameStart(response);
  });
  socket.on('checkCurrentPlayer', response => {
    setCurrentPlayer(response);
  });
  return (
    <ModalContext.Provider value={{setModalVisible}}>
      <View style={modalVisible ? styles.container2 : styles.container}>
        {/* The rest of your component goes here */}
        <Header navigation={navigation} />
        <Modal
          style={styles}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          backdropOpacity={0.3}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <Helper></Helper>
        </Modal>
        <View style={styles.body}>
          {/* Player Table element */}
          <Table
            gameStart={gameStart}
            setGameStart={setGameStart}
            currentPlayer={currentPlayer}
          />
          <View style={styles.bodyRight}>
            {/* Public cards element */}
            <PublicCards />
            {/* Private cards element */}
            <PrivateArea />
          </View>
        </View>
        <ControlButton currentPlayer={currentPlayer} />
        <ReadyButton gameStart={gameStart} />
      </View>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'grey',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  body: {
    flexDirection: 'row',
  },
  bodyRight: {
    flexDirection: 'column',
    padding: 1,
  },
});
