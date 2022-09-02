import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginatedResults, UsersWordData } from '../../Api/api-types';
import type { RootState } from './store';
import { WordListState } from './types';
import wordListFetch from './wordListFetch';

const initialState: WordListState = {
  isGameAvailable: true,
  wordList: [],
};

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    updateWordList: (state, action: PayloadAction<UsersWordData>) => {
      const {
        payload: { id, difficulty, optional },
      } = action;
      const changedWordId = state.wordList.findIndex(
        (word: PaginatedResults) => word._id === id,
      );
      const newWordsList = [...state.wordList];
      const updatedWord = {
        ...newWordsList[changedWordId],
        difficulty,
        optional,
      };
      newWordsList[changedWordId].userWord = updatedWord;
      state.wordList = newWordsList;
      const notLearned = newWordsList.filter(
        word => !word.userWord?.optional?.isLearned,
      );
      state.isGameAvailable = !!notLearned.length;
    },
    // updateGameAvailable: state => {
    //   console.log('state.wordList', state);
    //   const notLearned = state.wordList.filter(
    //     word => !word.userWord?.optional?.isLearned,
    //   );
    //   state.isGameAvailable = !!notLearned.length;
    // },
  },
  extraReducers: wordListFetch,
});

export const { updateWordList } = wordListSlice.actions;

export const getWordList = (state: RootState) => state.wordList;
export const getIsGameAvailable = (state: RootState) => state.wordList.isGameAvailable;

export default wordListSlice.reducer;
