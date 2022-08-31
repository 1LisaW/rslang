import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { UserSettings, TutorialWordsGroups } from './types';

const DEFAULT_GROUP = TutorialWordsGroups.GROUP_1;
const DEFAULT_PAGE_IN_GROUP = 1;

function getGroupFromSettings(): number {
  const group = DEFAULT_GROUP;
  // TODO get last group from user settings API or from local storage or set default
  return group;
}

function getPagePerGroupFromSetings(group: TutorialWordsGroups): number {
  let pageInGroup = DEFAULT_PAGE_IN_GROUP;
  if (group === TutorialWordsGroups.GROUP_7_USER) pageInGroup = DEFAULT_PAGE_IN_GROUP;
  // TODO get last page in group from user settings API or from local storage or set default
  return pageInGroup;
}

const initialState: UserSettings = {
  currentGroup: getGroupFromSettings(),
  currentPage: 1,
  pageInGroup: [
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_1),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_2),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_3),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_4),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_5),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_6),
    getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_7_USER),
  ],
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<UserSettings>) => {
      const { currentGroup, pageInGroup } = action.payload;
      state.currentGroup = currentGroup;
      state.currentPage = pageInGroup[currentGroup];
    },
    setCurrentPage: (state, action: PayloadAction<UserSettings>) => {
      const { currentGroup, currentPage } = action.payload;
      state.currentPage = currentPage;
      state.pageInGroup[currentGroup] = currentPage;
    },
    setPageInCurrentGroup: (state, action: PayloadAction<UserSettings>) => {
      const { currentGroup, pageInGroup } = action.payload;
      state.pageInGroup[currentGroup] = pageInGroup[currentGroup];
    },
    setPages: (state, action: PayloadAction<UserSettings>) => {
      const { pageInGroup } = action.payload;
      state.pageInGroup = pageInGroup;
    },
    setGroupAndPages: (state, action: PayloadAction<UserSettings>) => {
      state = action.payload;
    },
  },
});

export const {
  setCurrentGroup,
  setPageInCurrentGroup,
  setPages,
  setGroupAndPages,
  setCurrentPage } =
 userSettingsSlice.actions;

export const getCurrentGroup = (state: RootState) => state.userSettings.currentGroup;
export const getPages = (state: RootState) => state.userSettings.pageInGroup;
export const getGroupAndPage = (state: RootState) => state.userSettings;
export const getPageInCurrentGroup =
 (state: RootState) => state.userSettings.pageInGroup[state.userSettings.currentGroup];

export default userSettingsSlice.reducer;
