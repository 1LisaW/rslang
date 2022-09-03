export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Endpoints {
  Users = 'users',
  Words = 'words',
  Token = 'token',
  AggregatedWords = 'aggregatedWords',
  Statistics = 'statistics',
  Settings = 'settings',
  Signin = 'signin',
}

export enum Difficulty {
  Easy = 'Easy',
  Hard = 'hard',
}

export enum Auth {
  Auth = 'auth',
  UnAuth = 'unAuth',
  Refresh = 'refresh',
}

export enum StatusCodes {
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  ServerError = 500,
}

export type QueryParams = {
  group?: number;
  page?: number;
};

export type QueryParamsToStr = {
  group?: string;
  page?: string;
};

export type QueryParamsAggregated = {
  group?: number;
  page?: number;
  wordsPerPage?: number;
  filter?: string;
};

export type QueryParamsAggregatedToStr = {
  group?: string;
  page?: string;
  wordsPerPage?: string;
  filter?: string;
};

export type AuthData = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserData = Omit<AuthData, 'name'>;

export type HeaderRequest = {
  Authorization?: string;
  Accept: string;
  'Content-Type': string;
};

export type RequestOptions = {
  method: Methods;
  withCredentials?: boolean;
  headers: HeaderRequest;
  body?: string;
};

export type SingleGameResult = {
  wordsCorrect: string[]; // array of word ids
  wordsIncorrect: string[];
  newWords: string[];
  learnedWords: string[];
  longestWinsInARow: number;
};

export type CumulativeGameStats = {
  newWordsQty: number;
  learnedWords: string[];
  longestWinsInARow: number;
  correctAnswers: number;
  totalAnswers: number;
};

export type GameResultsPerDay = {
  date: string; // date in 'YYYY-MM-DD' format. converter func is availble in util
  gameStats: CumulativeGameStats;
};

export type StatisticsOptional = {
  historicalStats: {
    [date: string]: {
      // date in 'YYYY-MM-DD' format. converter func is availble in util
      dailyGameSprintStats: CumulativeGameStats;
      dailyGameAudiocallStats: CumulativeGameStats;
      dailyCumulativeGameStats: CumulativeGameStats;
      dailyTutorialLearnedWords: string[];
    };
  };
};

export type StatisticResponse = {
  id: string;
  learnedWords: number;
  optional: StatisticsOptional;
};
export type StatisticData = Omit<StatisticResponse, 'id'>;

export type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export type TokenResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type WordResponse = {
  id?: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

export type ErrorResponse = {
  error: string;
  status: StatusCodes;
};

// TODO: add attributes in Optional for words statistics
export type GameWordStats = {
  wins?: number;
  fails?: number;
};

export type Optional = {
  isLearned?: boolean;
  wasInGame?: boolean;
  sprintStats?: GameWordStats;
  audioCallStats?: GameWordStats;
  winsInARow?: number;
};

export type UsersWordResponse = {
  id: string;
  difficulty?: Difficulty;
  wordId: string;
  optional?: Optional;
};

export type UsersWordData = Omit<UsersWordResponse, 'wordId'>;
export type UpdateUsersWordData = Omit<UsersWordData, 'id'>;

export type UserWord = { userWord?: UpdateUsersWordData };
export type TotalCount = { count: number }[];
export type PaginatedResults = WordResponse & UserWord;
export type UsersAggregatedWordsResponse = {
  paginatedResults: PaginatedResults[];
  totalCount: TotalCount;
};

// TODO: add attributes to users settings object;
export type SettingsOptional = {};
export type SettingsResponse = {
  id: string;
  optional?: SettingsOptional;
  wordsPerDay: string;
};
export type SettingsData = Omit<SettingsResponse, 'id'>;
