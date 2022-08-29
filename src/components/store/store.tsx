import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlicer from './authSlice';
import soundPlaySlicer from './soundPlaySlice';
import wordListSlicer from './wordListSlice';
import gameWordListSlicer from './gameWordListSlice';
import userSettingsSlicer from './userSettingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    wordList: wordListSlicer,
    gameWordList: gameWordListSlicer,
    soundPlay: soundPlaySlicer,
    userSettingsPage: userSettingsSlicer,
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
