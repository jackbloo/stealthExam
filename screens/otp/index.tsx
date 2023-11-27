import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const OTPScreen = () => {
  const correctOTP = '1111';
  const [otpNumbers, setOTPNumbers] = useState(['', '', '', '']);
  const [inpuTextFocused, setInputTextFocused] = useState(false);
  const [inputNumbers, setInputNumbers] = useState('');
  const inputTextRef = useRef(null);
  const handleBlur = () => {
    setInputTextFocused(false);
  };
  const handleFocus = () => {
    setInputTextFocused(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxesContainer}>
        {otpNumbers.map((el, index) => (
          <View key={index} style={styles.containerText}>
            <Text style={styles.boxText}>{el}</Text>
          </View>
        ))}
      </View>
      <TextInput
        maxLength={4}
        ref={inputTextRef}
        value={inputNumbers}
        onChangeText={setInputNumbers}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxesContainer: {},
  boxText: {},
  containerText: {},
});

export default OTPScreen;
