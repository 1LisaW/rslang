import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserSettings,
  TutorialWordsGroups,
  UserSettingsReducer,
} from './types';
import Api from '../../Api/api';
import { StatusCodes } from '../../Api/api-types';
import StorageWorker from '../../localStorage';

const initialUserSettings: UserSettings = {
  currentGroup: TutorialWordsGroups.GROUP_1,
  currentPage: 0,
  pageInGroup: {},
};

type UserSettingsProps = {
  id: string;
  isAuthorized: boolean;
};

export const fetchUserSettings = createAsyncThunk(
  'userSettings',
  async (props: UserSettingsProps) => {
    const { id, isAuthorized } = props;
    if (!isAuthorized) {
      const data: UserSettings = {
        currentGroup: StorageWorker.currentGroup,
        currentPage: StorageWorker.currentPage,
        pageInGroup: StorageWorker.pageInGroup,
      };
      return data;
    }
    const userSettings = { ...initialUserSettings };
    if (!id) return userSettings;
    const response = await Api.getUserSettings(id);
    if ('status' in response && response.status !== StatusCodes.Unauthorized) {
      return userSettings;
    }
    const data: UserSettings =
      'status' in response
        ? { ...userSettings }
        : {
          currentGroup:
              response.optional && response.optional.currentGroup
                ? response.optional.currentGroup
                : TutorialWordsGroups.GROUP_1,
          currentPage:
              response.optional && response.optional.currentPage
                ? response.optional.currentPage
                : 0,
          pageInGroup:
              response.optional && response.optional.pageInGroup
                ? response.optional.pageInGroup
                : {},
        };
    return data;
  },
);

interface FetchUserSettingsResult {
  userSettings: UserSettings;
}
const fetchUserSettingsFullfilled: UserSettingsReducer<
FetchUserSettingsResult
> = (state, action) => {
  const userSettings = action.payload;
  return {
    ...state,
    ...userSettings,
  };
};

export default {
  [fetchUserSettings.fulfilled.toString()]: fetchUserSettingsFullfilled,
};
