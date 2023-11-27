import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CountdownProps} from '../../interface';

const Countdown = ({countdown, setCountdown}: CountdownProps) => {
  return (
    <View style={styles.container}>
      {countdown !== 0 && <Text>{`(00:${countdown})`}</Text>}
      <TouchableOpacity
        onPress={() => (countdown === 0 ? setCountdown(30) : null)}>
        <Text style={countdown === 0 ? styles.active : styles.disable}>
          Resend Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: 'black',
    fontWeight: 'bold',
  },
  disable: {
    color: 'grey',
  },
});
export default Countdown;
