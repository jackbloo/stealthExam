import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../store/reducer';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setLogin(false))}>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: 50,
  },
  button: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginTop: 20,
  },
  textButton: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
  },
});
export default Home;
