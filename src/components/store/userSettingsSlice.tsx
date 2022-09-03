import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { UserSettings, TutorialWordsGroups } from './types';
import userSettingsFetch from './userSettingsFetch';
import StorageWorker from '../../localStorage';

const DEFAULT_GROUP = TutorialWordsGroups.GROUP_1;
// const DEFAULT_PAGE_IN_GROUP = 0;

function getGroupFromSettings(): number {
  const group = StorageWorker.currentGroup || DEFAULT_GROUP;
  // TODO get last group from user settings API or from local storage or set default
  return group;
}

// function getPagePerGroupFromSettings(group: TutorialWordsGroups): number {
//   let pageInGroup = DEFAULT_PAGE_IN_GROUP;
//   if (group === TutorialWordsGroups.GROUP_7_USER) pageInGroup = DEFAULT_PAGE_IN_GROUP;
//   // TODO get last page in group from user settings API or from local storage or set default
//   return pageInGroup;
// }

const initialState: UserSettings = {
  currentGroup: getGroupFromSettings(),
  currentPage: 0,
  pageInGroup: {},
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<UserSettings>) => {
      const { currentGroup, pageInGroup } = action.payload;
      state.currentGroup = currentGroup;
      state.currentPage = pageInGroup[currentGroup];
      StorageWorker.setUserSettings(
        currentGroup,
        pageInGroup[currentGroup] || 0,
      );
    },
    setCurrentPage: (state, action: PayloadAction<UserSettings>) => {
      const { currentGroup, currentPage } = action.payload;
      state.currentPage = currentPage;
      if (!state.pageInGroup) {
        state.pageInGroup = {};
      }
      state.pageInGroup[currentGroup] = currentPage;
      StorageWorker.setUserSettings(currentGroup, currentPage);
    },
  },
  extraReducers: userSettingsFetch,
});

export const { setCurrentGroup, setCurrentPage } = userSettingsSlice.actions;

export const getCurrentGroup = (state: RootState) => state.userSettings.currentGroup;
export const getPages = (state: RootState) => state.userSettings.pageInGroup;
export const getGroupAndPage = (state: RootState) => state.userSettings;
export const getPageInCurrentGroup =
(state: RootState) => state.userSettings.pageInGroup[state.userSettings.currentGroup];

export default userSettingsSlice.reducer;
