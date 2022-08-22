import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { UsersAggregatedWordsResponse } from '../../Api/api-types';

export type WordList = {
  wordList: UsersAggregatedWordsResponse;
};

const initialState: WordList = {
  wordList: {
    paginatedResults: [],
    totalCount: [],
  },
};

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    updateWordList: (state, action: PayloadAction<WordList>) => {
      const {
        payload: { wordList },
      } = action;

      state.wordList = wordList;
    },
  },
});

export const { updateWordList } = wordListSlice.actions;

export const getWordList = (state: RootState) => state.wordList;

export default wordListSlice.reducer;
