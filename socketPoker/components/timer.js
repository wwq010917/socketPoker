import React, {useState} from 'react';
import {View, Text} from 'react-native';

const Timer = () => {
  const [time, setTime] = useState(5);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <View>
      <Text>{time}</Text>
    </View>
  );
};

export default Timer;
