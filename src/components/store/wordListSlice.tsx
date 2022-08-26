import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { WordListState } from './types';
import wordListFetch from './wordListFetch';

const initialState: WordListState = {
  wordList: [],
};

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    updateWordList: (state, action: PayloadAction<WordListState>) => {
      const {
        payload: { wordList },
      } = action;

      state.wordList = wordList;
    },
  },
  extraReducers: wordListFetch,
});

export const { updateWordList } = wordListSlice.actions;

export const getWordList = (state: RootState) => state.wordList;

export default wordListSlice.reducer;
