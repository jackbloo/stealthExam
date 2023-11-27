import {createSlice} from '@reduxjs/toolkit';
import {InitialStateType} from '../../interface';

const initialState: InitialStateType = {
  isLogin: false,
  registered: [],
  tempUser: {email: '', password: ''},
};

//State slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, {payload}) => {
      state.isLogin = payload;
    },
    setTempUser: (state, {payload}) => {
      state.tempUser = payload;
    },
    setRegister: state => {
      state.registered = [...state.registered, state.tempUser];
      state.tempUser = {email: '', password: ''};
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const {setLogin, setRegister, setTempUser} = authSlice.actions;

export default authSlice.reducer;
