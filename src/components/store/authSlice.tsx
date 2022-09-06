import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import StorageInstance from '../../localStorage';
import { AuthState } from './types';
import authFetch from './authFetch';

const initialState: AuthState = {
  isAuth: false,
  authUserId: StorageInstance.userId || '',
  authUserName: '',
  // TODO get name from API by user_id
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      StorageInstance.deleteDataFromStorage();

      state.isAuth = false;
      state.authUserId = '';
      state.authUserName = '';
    },
  },
  extraReducers: authFetch,
});

export const { logOut } = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAuth;
export const getCurrentUserId = (state: RootState) => state.auth.authUserId;
export const getCurrentUserName = (state: RootState) => state.auth.authUserName;

export default authSlice.reducer;
