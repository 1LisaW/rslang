import { PayloadAction } from '@reduxjs/toolkit';

export type ReducerAction<S, T> = (state: S, action: PayloadAction<T>) => void;

export type AuthState = {
  isAuth: boolean;
  authUserId: string;
  authUserName: string;
};

export type AuthReducer<T> = ReducerAction<AuthState, T>;
