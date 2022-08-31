import { PayloadAction } from '@reduxjs/toolkit';
import { PaginatedResults } from '../../Api/api-types';

export type ReducerAction<S, T> = (state: S, action: PayloadAction<T>) => void;

export type AuthState = {
  isAuth: boolean;
  authUserId: string;
  authUserName: string;
};

export type UserSettings = {
  currentGroup: TutorialWordsGroups;
  pageInGroup: {
    [group: number]: number;
  };
};

export enum TutorialWordsGroups {
  GROUP_1 = 1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  GROUP_5,
  GROUP_6,
  GROUP_7_USER,
}

export type AuthReducer<T> = ReducerAction<AuthState, T>;

export type WordListState = { wordList: PaginatedResults[] | [] };

export type GameWordListState = { gameWordList: PaginatedResults[] | [] };

export type WordListReducer<T> = ReducerAction<WordListState, T>;

export type GameWordListReducer<T> = ReducerAction<GameWordListState, T>;
