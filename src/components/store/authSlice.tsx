import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import StorageInstance from '../../localStorage';

export type AuthState = {
  isAuth: boolean;
  authUserId: string;
  authUserName: string;
};

const initialState: AuthState = {
  isAuth: !!StorageInstance.token,
  authUserId: StorageInstance.userId || '',
  authUserName: 'user-name',
  // TODO get name from API by user_id
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<AuthState>) => {
      const {
        payload: { isAuth, authUserId, authUserName },
      } = action;

      state.isAuth = isAuth;
      state.authUserId = authUserId;
      state.authUserName = authUserName;
    },
  },
});

export const { updateAuth } = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAuth;
export const getCurrentUserName = (state: RootState) => state.auth.authUserName;

export default authSlice.reducer;
