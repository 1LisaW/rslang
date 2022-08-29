import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { userSettings, TutorialWordsGroups } from './types';

const DEFAULT_GROUP = TutorialWordsGroups.GROUP_1;
const DEFAULT_PAGE_IN_GROUP = 1;

function getGroupFromSettings(): number {
  const group = DEFAULT_GROUP;
  // TODO get last group from user settings API or from local storage or set default
  return group;
}

function getPagePerGroupFromSetings(group: TutorialWordsGroups): number {
  let pageInGroup = DEFAULT_PAGE_IN_GROUP;
  if (group === 7) pageInGroup = DEFAULT_PAGE_IN_GROUP;
  // TODO get last page in group from user settings API or from local storage or set default
  return pageInGroup;
}

const initialState: userSettings = {
  currentGroup: getGroupFromSettings(),
  pageInGroup: {
    1: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_1),
    2: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_2),
    3: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_3),
    4: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_4),
    5: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_5),
    6: getPagePerGroupFromSetings(TutorialWordsGroups.GROUP_6),
    7: DEFAULT_GROUP,
  },
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<userSettings>) => {
      const { currentGroup } = action.payload;
      state.currentGroup = currentGroup;
    },
    setPageInCurrentGroup: (state, action: PayloadAction<userSettings>) => {
      const { currentGroup, pageInGroup } = action.payload;
      state.pageInGroup[currentGroup] = pageInGroup[currentGroup];
    },
  },
});

export const { setCurrentGroup, setPageInCurrentGroup } = userSettingsSlice.actions;

export const getCurrentGroup = (state: RootState) => state.userSettingsPage.currentGroup;
export const getGroupAndPage = (state: RootState) => state.userSettingsPage;
export const getPageInCurrentGropup =
 (state: RootState) => state.userSettingsPage.pageInGroup[state.userSettingsPage.currentGroup];

export default userSettingsSlice.reducer;
