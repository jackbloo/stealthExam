import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Countdown from '../../components/countdown';
import {useDispatch} from 'react-redux';
import {setRegister} from '../../store/reducer';

const OTPScreen = ({navigation: {navigate}}: any) => {
  const correctOTP = '111111';
  const otpArray = ['', '', '', '', '', ''];
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(30);
  const [inpuTextFocused, setInputTextFocused] = useState(false);
  const [inputNumbers, setInputNumbers] = useState('');
  const [otpError, setOTPError] = useState(false);
  const inputTextRef = useRef<any>(null);
  const handleBlur = () => {
    setInputTextFocused(false);
  };
  const handleFocus = () => {
    setInputTextFocused(true);
    inputTextRef?.current?.focus();
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countdown > 0) {
        const newCount = countdown - 1;
        setCountdown(newCount);
      }
      if (countdown === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [countdown]);

  useEffect(() => {
    if (inputNumbers.length === 6) {
      if (inputNumbers !== correctOTP) {
        setOTPError(true);
        return;
      } else {
        Alert.alert('Successful', 'Successfully Registered a user', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(setRegister());
              navigate('Login');
            },
          },
        ]);
      }
    } else {
      setOTPError(false);
    }
  }, [inputNumbers, navigate, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Authentication Code</Text>
      <Text style={styles.description}>
        <Text>
          Enter the 6-digit that we have sent via the phone number to{' '}
        </Text>
        <Text style={styles.boldText}>+62 822- 25629 - 000</Text>
      </Text>

      {otpError && (
        <Text style={styles.errorText}>Please insert correct OTP Number</Text>
      )}
      <View style={styles.boxesContainer}>
        {otpArray.map((el, index) => (
          <TouchableOpacity
            key={index}
            style={
              inpuTextFocused && inputNumbers.length === index
                ? styles.activeContainerText
                : styles.containerText
            }
            onPress={handleFocus}>
            <Text style={styles.boxText}>{inputNumbers[index] || ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        maxLength={6}
        ref={inputTextRef}
        value={inputNumbers}
        onChangeText={setInputNumbers}
        onBlur={handleBlur}
        style={styles.inputText}
        keyboardType="number-pad"
      />

      <Countdown countdown={countdown} setCountdown={setCountdown} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    width: 300,
    textAlign: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
    marginTop: 30,
  },
  boxText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  containerText: {
    borderWidth: 2,
    color: 'black',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainerText: {
    borderWidth: 2,
    color: 'black',
    borderColor: 'green',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    opacity: 0,
    width: 200,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default OTPScreen;
