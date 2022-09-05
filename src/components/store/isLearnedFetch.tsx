import { createAsyncThunk } from '@reduxjs/toolkit';
import { IsNotLearnedPagesReducer, IsNotLearnedPagesState } from './types';
import Api from '../../Api/api';
import { PaginatedResults } from '../../Api/api-types';

type Params = {
  isAuthorized: boolean;
  id?: string;
  group?: number;
  page?: number;
  wordsPerPage?: number;
};

const initialGroupState = Array.from({ length: 30 }, (_, i) => i);
const initialIsNotLearnedPageState: Record<number, number[]> = {
  0: initialGroupState,
  1: initialGroupState,
  2: initialGroupState,
  3: initialGroupState,
  4: initialGroupState,
  5: initialGroupState,
};

export const initialIsNotLearnedPages: IsNotLearnedPagesState = {
  isNotLearnedPages: initialIsNotLearnedPageState,
};

const generateNewState = (paginatedResults: PaginatedResults[]) => {
  const defaultAcc: Record<number, Set<number>> = {};
  const result = paginatedResults.reduce((acc, item) => {
    const { group } = item;
    if (!acc[group]) {
      acc[group] = new Set();
    }
    acc[group].add(item.page);

    return acc;
  }, defaultAcc);
  const newObject: Record<number, number[]> = {};
  Object.entries(result).forEach(([key, value]: [string, Set<number>]) => {
    newObject[+key] = Array.from(value);
  });

  return newObject;
};

export const fetchIsNotLearnedPages = createAsyncThunk(
  'isNotLearnedPages/fetchIsNotLearnedPages',
  async (data: Params) => {
    const { isAuthorized, id } = data;
    if (isAuthorized && id) {
      const response = await Api.getUserAggregatedWords(id, {
        wordsPerPage: 4000,
        // eslint-disable-next-line @typescript-eslint/quotes
        filter: `{"$or":[{"userWord.optional.isLearned":null},{"userWord.optional.isLearned":false},{"userWord":null},{"userWord.optional":null}]}`,
      });

      return 'error' in response
        ? initialIsNotLearnedPages
        : {
          isNotLearnedPageList: generateNewState(
            response[0].paginatedResults,
          ),
        };
    }
    return initialIsNotLearnedPages;
  },
);

const fetchWordListFullfilled: IsNotLearnedPagesReducer<IsNotLearnedPagesState> = (
  state,
  action,
) => {
  const isNotLearnedPageList = action.payload;
  return {
    ...state,
    ...isNotLearnedPageList,
  };
};

export default {
  [fetchIsNotLearnedPages.fulfilled.toString()]: fetchWordListFullfilled,
};
