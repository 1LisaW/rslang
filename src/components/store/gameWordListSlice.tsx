import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { UsersAggregatedWordsResponse } from '../../Api/api-types';

export type GameWordList = {
  wordList: UsersAggregatedWordsResponse;
};

const initialState: GameWordList = {
  wordList: {
    paginatedResults: [],
    totalCount: [],
  },
};

export const gameWordListSlice = createSlice({
  name: 'gameWordList',
  initialState,
  reducers: {
    updateGameWordList: (state, action: PayloadAction<GameWordList>) => {
      const {
        payload: { wordList },
      } = action;

      state.wordList = wordList;
    },
  },
});

export const { updateGameWordList } = gameWordListSlice.actions;

export const getGameWordList = (state: RootState) => state.gameWordList;

export default gameWordListSlice.reducer;
