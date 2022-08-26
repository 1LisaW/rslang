// import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { WordListReducer, WordListState } from './types';
import Api from '../../Api/api';
// import { isAuth } from './authSlice';

const emptyWordList: WordListState = { wordList: [] };
// const isAuthorized = useSelector(isAuth);
type Params = {
  isAuthorized: boolean;
  id?: string;
  group?: number;
  page?: number;
};

export const fetchWordList = createAsyncThunk('wordList/fetchWordList', async (data: Params) => {
  const { isAuthorized, id, group, page } = data;
  if (!id) {
    const response = await Api.getWords({ group, page });
    return 'status' in response ? {
      ...emptyWordList,
    } : {
      wordList: response,
    };
  }
  if (isAuthorized) {
    const response = await Api.getUserAggregatedWords(id, { group, page });
    return 'status' in response ? {
      ...emptyWordList,
    } : {
      wordList: response.paginatedResults,
    };
  }
  const response = await Api.getWords({ group, page });
  return 'status' in response ? {
    ...emptyWordList,
  } : {
    wordList: response,
  };
});

const fetchWordListFullfilled: WordListReducer<WordListState> = (
  state,
  action,
) => {
  const wordList = action.payload;
  return {
    ...state,
    ...wordList,
  };
};

export default {
  [fetchWordList.fulfilled.toString()]: fetchWordListFullfilled,
};
