import { PayloadAction } from '@reduxjs/toolkit';
import { PaginatedResults } from '../../Api/api-types';

export type ReducerAction<S, T> = (state: S, action: PayloadAction<T>) => void;

export type AuthState = {
  isAuth: boolean;
  authUserId: string;
  authUserName: string;
};

export type AuthReducer<T> = ReducerAction<AuthState, T>;

export type WordListState = { wordList: PaginatedResults[] | [] };

export type WordListReducer<T> = ReducerAction<WordListState, T>;
