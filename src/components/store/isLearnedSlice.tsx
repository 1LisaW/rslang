import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import isNotLearnedFetch, { initialIsNotLearnedPages } from './isLearnedFetch';

type Props = {
  page: number;
  group: number;
  isLearned: boolean;
};

const initialState = { ...initialIsNotLearnedPages };

export const isNotLearnedPagesSlice = createSlice({
  name: 'isNotLearnedPageList',
  initialState,
  reducers: {
    updateIsNotLearnedPages: (state, action: PayloadAction<Props>) => {
      const {
        payload: { page, group, isLearned },
      } = action;
      const newIsNotLearnedList = new Set(state.isNotLearnedPages[group]);
      if (isLearned) {
        newIsNotLearnedList.delete(page);
      } else {
        newIsNotLearnedList.add(page);
      }
      state.isNotLearnedPages = {
        ...state.isNotLearnedPages,
        [group]: Array.from(newIsNotLearnedList),
      };
    },
  },
  extraReducers: isNotLearnedFetch,
});

export const { updateIsNotLearnedPages } = isNotLearnedPagesSlice.actions;

export const getIsNotLearnedPageList = (state: RootState) => state.isNotLearnedPages;

export default isNotLearnedPagesSlice.reducer;
