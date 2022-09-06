import { createAsyncThunk } from '@reduxjs/toolkit';
import { WordListReducer, WordListState } from './types';
import Api from '../../Api/api';
import { PaginatedResults } from '../../Api/api-types';

const emptyWordList: WordListState = {
  isGameAvailable: true,
  wordList: [],
};
type Params = {
  isAuthorized: boolean;
  id?: string;
  group?: number;
  page?: number;
  wordsPerPage?: number;
};

export const fetchWordList = createAsyncThunk(
  'wordList/fetchWordList',
  async (data: Params) => {
    const { isAuthorized, id, group, page, wordsPerPage } = data;
    if (isAuthorized && id && typeof group === 'number' && group === 6) {
      const responseDifficult = await Api.getUserAggregatedWords(id, {
        wordsPerPage: 4000,
        // eslint-disable-next-line @typescript-eslint/quotes
        filter: `{"$or":[{"userWord.difficulty":"hard"}]}`,
      });

      return 'error' in responseDifficult
        ? {
          ...emptyWordList,
        }
        : {
          isGameAvailable: !![...responseDifficult[0].paginatedResults].filter(
            word => !word.userWord?.optional?.isLearned,
          ).length,
          wordList: [...responseDifficult[0].paginatedResults] as PaginatedResults[],
        };
    }
    if (isAuthorized && id) {
      const response = await Api.getUserAggregatedWords(id, {
        wordsPerPage,
        filter: `{"$and":[{"page":${page || 0}},{"group":${group}}]}`,
      });

      return 'error' in response
        ? {
          ...emptyWordList,
        }
        : {
          isGameAvailable: !![...response[0].paginatedResults].filter(
            word => !word.userWord?.optional?.isLearned,
          ).length,
          wordList: [...response[0].paginatedResults] as PaginatedResults[],
        };
    }
    const response = await Api.getWords({ group, page });
    return 'error' in response
      ? {
        ...emptyWordList,
      }
      : {
        isGameAvailable: true,
        wordList: response,
      };
  },
);

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
