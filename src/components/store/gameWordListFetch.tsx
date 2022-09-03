import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameWordListReducer, GameWordListState } from './types';
import Api from '../../Api/api';
import { PaginatedResults } from '../../Api/api-types';

const emptyWordList: GameWordListState = {
  gameWordList: [],
};
type Params = {
  redirectedFromTutorial: boolean;
  isAuthorized: boolean;
  id?: string;
  group?: number;
  page?: number;
  wordsPerPage: number;
};

export const fetchWordList = createAsyncThunk(
  'gameWordList/fetchGameWordList',
  async (data: Params) => {
    const {
      redirectedFromTutorial,
      isAuthorized,
      id,
      group,
      page,
      wordsPerPage,
    } = data;
    const pageFilterParams = `[${Array.from(
      { length: (page || 0) + 1 },
      (_, i) => `{"page":${i}}`,
    )}]`;

    if (isAuthorized && id) {
      const response = redirectedFromTutorial
        ? await Api.getUserAggregatedWords(id, {
          wordsPerPage: wordsPerPage * ((page || 0) + 1),
          // eslint-disable-next-line @typescript-eslint/quotes
          filter: `{"$and":[{"group":${group}},{"$or":[{"userWord.optional.isLearned":null},{"userWord.optional.isLearned":false},{"userWord":null},{"userWord.optional":null}]},{"$or":${pageFilterParams}}]}`,
        })
        : await Api.getUserAggregatedWords(id, {
          wordsPerPage,
          filter: `{"$and":[{"group":${group}},{"page":${page}}]}`,
        });
      return 'error' in response
        ? {
          ...emptyWordList,
        }
        : {
          gameWordList: response[0].paginatedResults
            .sort((a, b) => b.page - a.page)
            .slice(0, 20) as PaginatedResults[],
        };
    }
    const response = await Api.getWords({ group, page });
    return 'error' in response
      ? {
        ...emptyWordList,
      }
      : {
        gameWordList: response,
      };
  },
);

const fetchWordListFullfilled: GameWordListReducer<GameWordListState> = (
  state,
  action,
) => {
  const gameWordList = action.payload;
  return {
    ...state,
    ...gameWordList,
  };
};

export default {
  [fetchWordList.fulfilled.toString()]: fetchWordListFullfilled,
};
