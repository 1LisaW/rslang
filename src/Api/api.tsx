import {
  Methods,
  Endpoints,
  QueryParams,
  // QueryParamsToStr,
  QueryParamsAggregated,
  QueryParamsAggregatedToStr,
  AuthData,
  UpdateUserData,
  RequestOptions,
  UserResponse,
  TokenResponse,
  WordResponse,
  ErrorResponse,
  UsersWordResponse,
  // UsersWordData,
  UpdateUsersWordData,
  PaginatedResults,
  UsersAggregatedWordsResponse,
  StatisticResponse,
  StatisticData,
  SettingsResponse,
  SettingsData,
  Auth,
  StatusCodes,
} from './api-types';
import StorageWorker from '../localStorage';

const { REACT_APP_PATH_TO_SERVER } = process.env;
class Api {
  static getFetchOption = (method: Methods, data = {}) => {
    const hasBody = method === Methods.PUT || method === Methods.POST;
    const body = hasBody ? { body: JSON.stringify(data) } : data;
    const fetchOption: RequestOptions = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return { ...fetchOption, ...body };
  };

  static setTokens = (tokenData: TokenResponse | ErrorResponse) => {
    if ('token' in tokenData) {
      StorageWorker.token = tokenData.token;
      StorageWorker.refreshToken = tokenData.refreshToken;
    } else {
      StorageWorker.deleteDataFromStorage();
    }
  };

  static getFetchOptionAuth = (method: Methods, auth: Auth, data = {}) => {
    const fetchOptionAuth = this.getFetchOption(method, data);

    fetchOptionAuth.withCredentials = true;
    fetchOptionAuth.headers.Authorization = `Bearer ${
      auth === Auth.Auth ? StorageWorker.token : StorageWorker.refreshToken
    }`;

    return fetchOptionAuth;
  };

  static requestMethod = async (
    method: Methods,
    path: string,
    auth: Auth,
    data = {},
  ) => {
    const fetchOptions =
      auth === Auth.Auth
        ? this.getFetchOptionAuth(method, auth, data)
        : this.getFetchOption(method, data);

    try {
      const response = await fetch(
        `${REACT_APP_PATH_TO_SERVER}${path}`,
        fetchOptions,
      );

      if (!response.ok) {
        return { error: response.statusText, status: response.status };
      }

      const content = await response.json();

      return content;
    } catch (error: unknown) {
      return error instanceof Error
        ? { error: error.message, status: StatusCodes.ServerError }
        : '';
    }
  };

  static convertNumberAttrToStr = (objectToConvert: QueryParamsAggregated) => {
    const convertedObject = Object.keys(objectToConvert).reduce(
      (acc: QueryParamsAggregatedToStr, key) => {
        if (
          (key === 'page' ||
            key === 'group' ||
            key === 'wordsPerPage' ||
            key === 'filter') &&
          (typeof objectToConvert[key] === 'number' ||
            typeof objectToConvert[key] === 'string')
        ) {
          acc[key] = (objectToConvert[key] || 0).toString();
        }
        return acc;
      },
      {},
    );
    return convertedObject;
  };

  static getWords = async (
    options: QueryParams,
  ): Promise<WordResponse[] | ErrorResponse> => {
    const optionsToStr = this.convertNumberAttrToStr(options);
    const params = new URLSearchParams(optionsToStr).toString();
    const searchParams = params ? `?${params}` : params;
    const path = `${Endpoints.Words}${searchParams}`;
    const words: WordResponse[] | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.UnAuth,
    );

    return words;
  };

  static getWord = async (
    id: string,
  ): Promise<WordResponse | ErrorResponse> => {
    const path = `${Endpoints.Words}/${id}`;
    const word: WordResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.UnAuth,
    );

    return word;
  };

  static createUser = async (
    userInfo: AuthData,
  ): Promise<UserResponse | ErrorResponse> => {
    const user: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.POST,
      Endpoints.Users,
      Auth.UnAuth,
      userInfo,
    );
    if ('id' in user) {
      StorageWorker.userId = user.id;
      const { name, ...updatedUser } = userInfo;
      await this.signin(updatedUser);
    }
    return user;
  };

  static getUser = async (
    id: string,
  ): Promise<UserResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${id}`;
    const user: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.Auth,
    );
    return user;
  };

  static updateUser = async (
    id: string,
    userInfo: UpdateUserData,
  ): Promise<UserResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${id}`;
    const updatedUser: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.PUT,
      path,
      Auth.Auth,
      userInfo,
    );
    return updatedUser;
  };

  static deleteUser = async (id: string): Promise<void> => {
    const path = `${Endpoints.Users}/${id}`;
    await this.requestMethod(Methods.DELETE, path, Auth.Auth);
  };

  static getUserTokens = async (
    id: string,
  ): Promise<TokenResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${id}/${Endpoints.Token}`;
    const tokens: TokenResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.Refresh,
    );
    this.setTokens(tokens);
    return tokens;
  };

  static getUsersWords = async (
    userId: string,
  ): Promise<UsersWordResponse[] | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Words}`;
    const usersWords: UsersWordResponse[] | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersWords;
  };

  static createUsersWord = async (
    userId: string,
    wordId: string,
    data: UpdateUsersWordData,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Words}/${wordId}`;
    const usersWord: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.POST, path, Auth.Auth, data);

    return usersWord;
  };

  static getUsersWord = async (
    userId: string,
    wordId: string,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Words}/${wordId}`;
    const usersWords: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersWords;
  };

  static updateUsersWord = async (
    userId: string,
    wordId: string,
    data: UpdateUsersWordData,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Words}/${wordId}`;
    const usersWord: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.PUT, path, Auth.Auth, data);

    return usersWord;
  };

  static deleteUsersWord = async (
    userId: string,
    wordId: string,
  ): Promise<void> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Words}/${wordId}`;
    await this.requestMethod(Methods.DELETE, path, Auth.Auth);
  };

  static getUserAggregatedWords = async (
    userId: string,
    options: QueryParamsAggregated,
  ): Promise<UsersAggregatedWordsResponse[] | ErrorResponse> => {
    const convertedParams = this.convertNumberAttrToStr(options);

    const params = new URLSearchParams(convertedParams).toString();
    const searchParams = params ? `?${params}` : '';
    const path = `${Endpoints.Users}/${userId}/${Endpoints.AggregatedWords}${searchParams}`;
    const usersAggregatedWords: UsersAggregatedWordsResponse[] | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersAggregatedWords;
  };

  static getUserAggregatedWord = async (
    userId: string,
    wordId: string,
  ): Promise<PaginatedResults[] | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.AggregatedWords}/${wordId}`;
    const usersAggregatedWord: PaginatedResults[] | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersAggregatedWord;
  };

  static getUserStatistic = async (
    userId: string,
  ): Promise<StatisticResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Statistics}`;
    const usersAggregatedWord: StatisticResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersAggregatedWord;
  };

  static updateUserStatistic = async (
    userId: string,
    statisticData: StatisticData,
  ): Promise<StatisticResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Statistics}`;
    const usersAggregatedWord: StatisticResponse | ErrorResponse =
      await this.requestMethod(Methods.PUT, path, Auth.Auth, statisticData);

    return usersAggregatedWord;
  };

  static getUserSettings = async (
    userId: string,
  ): Promise<SettingsResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Settings}`;
    const usersAggregatedWord: SettingsResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.Auth);

    return usersAggregatedWord;
  };

  static updateUserSettings = async (
    userId: string,
    settingsData: SettingsData,
  ): Promise<SettingsResponse | ErrorResponse> => {
    const path = `${Endpoints.Users}/${userId}/${Endpoints.Settings}`;
    const usersAggregatedWord: SettingsResponse | ErrorResponse =
      await this.requestMethod(Methods.PUT, path, Auth.Auth, settingsData);

    return usersAggregatedWord;
  };

  static signin = async (
    userInfo: UpdateUserData,
  ): Promise<TokenResponse | ErrorResponse> => {
    const path = `${Endpoints.Signin}`;
    const tokens: TokenResponse | ErrorResponse = await this.requestMethod(
      Methods.POST,
      path,
      Auth.UnAuth,
      userInfo,
    );
    if ('userId' in tokens) {
      StorageWorker.userId = tokens.userId;
      this.setTokens(tokens);
    }
    return tokens;
  };
}

export default Api;
