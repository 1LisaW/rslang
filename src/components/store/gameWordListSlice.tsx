import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GameWordListState } from './types';
import wordListFetch from './gameWordListFetch';

const initialState: GameWordListState = {
  gameWordList: [],
};

export const gameWordListSlice = createSlice({
  name: 'gameWordList',
  initialState,
  reducers: {
    updateGameWordList: (state, action: PayloadAction<GameWordListState>) => {
      const {
        payload: { gameWordList },
      } = action;

      state.gameWordList = gameWordList;
    },
  },
  extraReducers: wordListFetch,
});

export const { updateGameWordList } = gameWordListSlice.actions;

export const getGamesWordList = (state: RootState) => state.gameWordList;

export default gameWordListSlice.reducer;
