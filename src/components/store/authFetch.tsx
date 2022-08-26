import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthReducer, AuthState } from './types';
import Api from '../../Api/api';
import { StatusCodes } from '../../Api/api-types';

const unAuthorized: AuthState = {
  isAuth: false,
  authUserId: '',
  authUserName: '',
};

export const fetchAuth = createAsyncThunk('auth', async (id: string) => {
  const auth = { ...unAuthorized };
  console.log('incoming id ', id);
  if (!id) return auth;
  const response = await Api.getUser(id);
  if ('status' in response && response.status !== StatusCodes.Unauthorized) {
    return auth;
  }
  if ('status' in response && response.status === StatusCodes.Unauthorized) {
    const refreshTokens = await Api.getUserTokens(id);
    console.log('refresh token data', refreshTokens);
    return 'error' in refreshTokens
      ? auth
      : {
        isAuth: true,
        authUserId: refreshTokens.userId,
        authUserName: refreshTokens.name,
      };
  }
  console.log('redux get all data ', response);

  const data: AuthState =
    'status' in response
      ? { ...unAuthorized }
      : {
        isAuth: true,
        authUserId: response.id,
        authUserName: response.name,
      };
  console.log('data in store: ', data);
  return data;
});

interface FetchAuthResult {
  auth: AuthState;
}
const fetchAuthFullfilled: AuthReducer<FetchAuthResult> = (state, action) => {
  const auth = action.payload;
  return {
    ...state,
    ...auth,
  };
};

export default {
  [fetchAuth.fulfilled.toString()]: fetchAuthFullfilled,
};
