import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const { REACT_APP_SOUND_INTERRUPT } = process.env;

export type SoundState = {
  isPlaying: boolean;
  interruptOnClick: boolean; // onclick behavior  - wait or stop and play new sound
};

const initialState: SoundState = {
  isPlaying: false,
  interruptOnClick: REACT_APP_SOUND_INTERRUPT === 'yes' || true,
};

export const soundPlaySlice = createSlice({
  name: 'soundPlay',
  initialState,
  reducers: {
    stop: state => {
      if (state.interruptOnClick) {
        state.isPlaying = false;
      }
    },

    start: state => {
      state.isPlaying = true;
    },

    updateInterruptBehavior: (state, action: PayloadAction<SoundState>) => {
      const {
        payload: { interruptOnClick },
      } = action;
      state.interruptOnClick = interruptOnClick;
    },
  },
});

export const { start, stop, updateInterruptBehavior } = soundPlaySlice.actions;

export const isSoundPlaying = (state: RootState) => state.soundPlay.isPlaying;

export default soundPlaySlice.reducer;
