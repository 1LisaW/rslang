export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Endpoints {
  users = 'users',
  words = 'words',
  token = 'token',
  aggregatedWords = 'aggregatedWords',
  statistics = 'statistics',
  settings = 'settings',
  signin = 'signin',
}

export enum Difficulty {
  weak = 'weak',
  hard = 'hard',
}

export enum Auth {
  auth = 'auth',
  unAuth = 'unAuth',
  refresh = 'refresh',
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
  wordsPerPage?: string;
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

// TODO: add attributes to statistics object
export type StatisticsOptional = {};
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
  id: string;
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
};

// TODO: add attributes in Optional for words statistics
export type Optional = {};

export type UsersWordResponse = {
  id: string;
  difficulty: Difficulty;
  wordId: string;
  optional: Optional;
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
