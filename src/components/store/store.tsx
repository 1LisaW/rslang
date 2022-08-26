import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlicer from './authSlice';
import soundPlaySlicer from './soundPlaySlice';
import wordListSlicer from './wordListSlice';
import gameWordListSlicer from './gameWordListSlice';
import groupAndPageSlicer from './group-pageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    wordList: wordListSlicer,
    gameWordList: gameWordListSlicer,
    soundPlay: soundPlaySlicer,
    groupAndPage: groupAndPageSlicer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
  ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>>;
