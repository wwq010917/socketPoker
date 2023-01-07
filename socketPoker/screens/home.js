import React, {useState, createContext, useContext} from 'react';
import {StyleSheet, Text, View, Button, Modal, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
export const SocketContext = createContext(io('http://10.0.2.2:3001'));
const storeName = async value => {
  try {
    await AsyncStorage.setItem('name', value);
  } catch (e) {
    // saving error
  }
};

const retrieveName = async () => {
  try {
    const name = await AsyncStorage.getItem('name');

    return name;
  } catch (error) {
    console.error(error);
    return '';
  }
};
export default function Home({navigation}) {
  const socket = useContext(SocketContext);

  // Declare state variables using the useState hook
  const [isHostGamePressed, setIsHostGamePressed] = useState(false);
  const [modalOneVisible, setModalOneVisible] = useState(false);
  const [Name, onChangeText] = useState('');
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,8}$/;
  const [roomNumber, onChangeNumber] = useState('1234');

  // Function to validate player's name
  const validateName = name => {
    return nameRegex.test(name);
  };

  // Event handler for when the host creates a game
  const handleHostCreate = async () => {
    // Check if the name is valid
    if (!validateName(Name)) {
      // Show an alert to the user
      Alert.alert(
        'Invalid name',
        'The name must be at least 1 and at most 8 characters long and no special characters',
        [{text: 'OK'}],
      );
      return; // Return early to exit the function
    }
    setModalOneVisible(false);

    // Emit a 'create' event through the socket connection
    socket.emit('create', Name);
    await storeName(Name);
    console.log('Name is ' + (await retrieveName()));
    global.Name = Name;
    navigation.navigate('Game');
  };

  // Event handler for when the user wants to join a game
  const handleJoinPress = async () => {
    onChangeText(await retrieveName());
    setModalOneVisible(true);
    setIsHostGamePressed(false);
  };

  // Event handler for when the user wants to host a game
  const handleHostPress = async () => {
    onChangeText(await retrieveName());
    setModalOneVisible(true);
    setIsHostGamePressed(true);
  };

  // Event handler for when the user submits the form to join a game
  const handleJoin = async () => {
    // Check if the name is valid
    if (!validateName(Name)) {
      // Show an alert to the user
      Alert.alert(
        'Invalid name',
        'The name must be at least 1 and at most 8 characters long and no special characters',
        [{text: 'OK'}],
      );
      return; // Return early to exit the function
    }
    // Set modal visibility to false
    setModalOneVisible(false);
    // When the client connects, send a 'join' event with the player's name and the room name
    socket.emit('join', Name, roomNumber, response => {
      if (response.success) {
        // The join event was successful
        global.Name = Name;
        storeName(Name);
        navigation.navigate('Game');
      } else {
        // The join event was not successful
        Alert.alert('Error', response.message, [{text: 'OK'}]);
      }
    });
  };
  return (
    <View style={styles.HomeContainer}>
      <Modal transparent={true} animationType="fade" visible={modalOneVisible}>
        <View style={styles.modalView}>
          <View style={styles.nameContainer}>
            <View style={styles.namePromt}>
              <Text style={{fontSize: 16}}>Your name: </Text>
            </View>
            <View style={styles.nameInputBox}>
              <TextInput
                style={{fontSize: 16}}
                onChangeText={onChangeText}
                value={Name}
                autoFocus
              />
            </View>
          </View>
          {isHostGamePressed ? null : (
            <View style={styles.roomContainer}>
              <View style={styles.roomPrompt}>
                <Text style={{fontSize: 16}}>Room Number: </Text>
              </View>
              <View style={styles.roomInputBox}>
                <TextInput
                  style={{frontsize: 16}}
                  onChangeText={onChangeNumber}
                  value={roomNumber}
                  keyboardType={'number-pad'}
                />
              </View>
            </View>
          )}
          <View>
            <View style={styles.buttonContainer}>
              <View style={styles.joinButton}>
                <Button
                  onPress={isHostGamePressed ? handleHostCreate : handleJoin}
                  title={isHostGamePressed ? 'Create' : 'Join'}
                />
              </View>
              <View style={styles.closeButton}>
                <Button
                  onPress={() => {
                    setModalOneVisible(false);
                  }}
                  title="Close"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.title}>POCKET POKER</Text>
      </View>
      <View style={styles.menu}>
        <View style={styles.hostButton}>
          <Button onPress={handleHostPress} title="Host game" />
        </View>
        <View>
          <Button onPress={handleJoinPress} title="Join Game" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: '#F3F4FB',
  },
  nameContainer: {
    padding: 5,
    flexDirection: 'row',
    //elevation: 4,
    borderWidth: 2,
    borderColor: '#92A8D1',
    borderRadius: 10,
    marginBottom: 20,
  },
  namePromt: {flex: 0.5, marginRight: 80, alignSelf: 'center'},
  nameInputBox: {
    flex: 0.5,
    //borderWidth: 1,
    alignSelf: 'center',
  },
  roomContainer: {
    padding: 5,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#92A8D1',
    borderRadius: 10,
    marginBottom: 20,
  },
  roomPrompt: {flex: 0.5, marginRight: 80, alignSelf: 'center'},
  roomInputBox: {
    flex: 0.5,
    //borderWidth: 1,
    alignSelf: 'center',
  },
  buttonContainer: {
    padding: 5,
    flexDirection: 'row',
    //borderWidth: 2,
  },
  joinButton: {flex: 1, marginRight: 20},
  closeButton: {flex: 1},
  modalView: {
    marginTop: 280,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    borderColor: '#AAAAAA',
    // Add additional styles here
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Njal-Bold',
    color: 'black',
    fontSize: 50,
    marginTop: 200,
    marginBottom: 300,
  },
  menu: {
    paddingTop: 40,
    alignItems: 'stretch',
    //borderWidth: 5,
  },
  hostButton: {
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 24,
  },
});
