import {createSlice} from '@reduxjs/toolkit';
import {InitialStateType} from '../../interface';

const initialState: InitialStateType = {
  isLogin: null,
  registered: [],
};

//State slice
export const authSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setLogin: (state, {payload}) => {
      state.isLogin = payload;
    },
    setRegister: (state, {payload}) => {
      state.registered = [...state.registered, payload];
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const {setLogin, setRegister} = authSlice.actions;

export default authSlice.reducer;
