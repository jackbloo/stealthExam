import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTempUser} from '../../store/reducer';
import {RootState} from '../../store/store';

const Register = ({navigation: {navigate}}: any) => {
  const dispatch = useDispatch();
  const registeredUser = useSelector(
    (state: RootState) => state.auth.registered,
  );
  const [userData, setUserData] = useState({email: '', password: ''});
  const [errorData, setErrorData] = useState({email: false, password: false});
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const handlePassword = (data: string) => {
    if (
      RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/g,
      ).test(data)
    ) {
      setErrorData({
        ...errorData,
        password: false,
      });
    } else {
      setErrorData({
        ...errorData,
        password: true,
      });
    }
    setUserData({
      ...userData,
      password: data,
    });
  };
  const handleEmail = (data: string) => {
    if (RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(data)) {
      setErrorData({
        ...errorData,
        email: false,
      });
    } else {
      setErrorData({
        ...errorData,
        email: true,
      });
    }
    setUserData({
      ...userData,
      email: data,
    });
  };

  const handleSubmit = () => {
    setDuplicateEmail(false);
    if (
      userData.email === '' &&
      !RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(userData.email)
    ) {
      setErrorData({...errorData, email: true});
      return;
    }
    if (
      userData.password === '' &&
      !RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/g,
      ).test(userData.password)
    ) {
      setErrorData({...errorData, password: true});
      return;
    }
    const filteredUser = registeredUser.filter(
      el => el.email.toLowerCase() === userData.email.toLowerCase(),
    );
    if (filteredUser.length > 0) {
      setDuplicateEmail(true);
      return;
    }
    dispatch(setTempUser(userData));
    setUserData({email: '', password: ''});
    setErrorData({email: false, password: false});
    navigate('Otp');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={userData.email}
        style={errorData.email ? styles.inputError : styles.input}
        onChangeText={handleEmail}
      />
      {errorData.email && (
        <Text style={styles.errorText}>Please input correct email</Text>
      )}
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={userData.password}
        style={errorData.password ? styles.inputError : styles.input}
        secureTextEntry
        onChangeText={handlePassword}
      />
      {errorData.password && (
        <Text style={styles.errorText}>Please input correct password</Text>
      )}
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
      {duplicateEmail && (
        <Text style={styles.errorText}>
          The email is registered. Please choose another email
        </Text>
      )}
      <View style={styles.otherContainer}>
        <Text>Are you Registered? </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
  },
  inputError: {
    width: 200,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  otherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Register;
