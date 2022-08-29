import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { WordListState } from './types';
import wordListFetch from './wordListFetch';

const initialState: WordListState = {
  wordList: [],
};

export const gameWordListSlice = createSlice({
  name: 'gameWordList',
  initialState,
  reducers: {
    updateGameWordList: (state, action: PayloadAction<WordListState>) => {
      const {
        payload: { wordList },
      } = action;

      state.wordList = wordList;
    },
  },
  extraReducers: wordListFetch,
});

export const { updateGameWordList } = gameWordListSlice.actions;

export const getGameWordList = (state: RootState) => state.wordList;

export default gameWordListSlice.reducer;
