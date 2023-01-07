import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Intro = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Will change fadeAnim value to 1 in 5 seconds

  useEffect(() => {
    // Fade in the catchphrase over 1.5 seconds, then fade it out and navigate to the Home screen
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Home');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.catchphrase}>
          The Ultimate Texas Poker Experience
        </Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>Muyao</Text>
          <Text style={styles.author}>Jon</Text>
          <Text style={styles.author}>Wenqiao</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catchphrase: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Pacifico',
  },
  authorContainer: {
    marginTop: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  author: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});

export default Intro;
