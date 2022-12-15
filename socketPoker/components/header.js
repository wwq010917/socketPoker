import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faGear} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
const Header = ({navigation}) => {
  return (
    <View style={styles.header}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon icon={faArrowLeft} size={40} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.settings}>
        <TouchableOpacity>
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
  },

  back: {
    paddingLeft: 10,
    paddingTop: 10,
  },

  settings: {
    paddingRight: 10,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
  },
});
export default Header;
