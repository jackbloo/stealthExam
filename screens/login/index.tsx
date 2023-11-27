import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin, setTempUser} from '../../store/reducer';
import {RootState} from '../../store/store';

const Login = ({navigation: {navigate}}: any) => {
  const dispatch = useDispatch();
  const registeredUser = useSelector(
    (state: RootState) => state.auth.registered,
  );
  const [userData, setUserData] = useState({email: '', password: ''});
  const [errorData, setErrorData] = useState({email: false, password: false});
  const [wrongEmail, setWrongEmail] = useState(false);

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
    setWrongEmail(false);
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
      el => el.email === userData.email && userData.password === el.password,
    );
    if (filteredUser.length === 0) {
      setWrongEmail(true);
      return;
    }
    dispatch(setTempUser(userData));
    Alert.alert('Successful', 'Login Successfull', [
      {
        text: 'OK',
        onPress: () => {
          setUserData({email: '', password: ''});
          setErrorData({email: false, password: false});
          dispatch(setLogin(true));
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {wrongEmail && (
        <Text style={styles.errorText}>
          Please login with a registered email
        </Text>
      )}
      <View style={styles.otherContainer}>
        <Text>Not yet Registered? </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Register')}>
          <Text>Register</Text>
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
    marginTop: 30,
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

export default Login;
