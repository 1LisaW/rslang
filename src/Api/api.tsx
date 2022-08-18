import {
  Methods,
  Endpoints,
  QueryParams,
  QueryParamsToStr,
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
  UsersWordData,
  UpdateUsersWordData,
  PaginatedResults,
  UsersAggregatedWordsResponse,
  StatisticResponse,
  StatisticData,
  SettingsResponse,
  SettingsData,
  Auth,
} from './api-types';

const { PATH_TO_SERVER } = process.env;

class Api {
  static token: string;

  static refreshToken: string;

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

  static getFetchOptionAuth = (method: Methods, auth: Auth, data = {}) => {
    const fetchOptionAuth = this.getFetchOption(method, data);

    fetchOptionAuth.withCredentials = true;
    fetchOptionAuth.headers.Authorization = `Bearer ${
      auth === Auth.auth ? this.token : this.refreshToken
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
      auth === Auth.auth
        ? this.getFetchOptionAuth(method, auth, data)
        : this.getFetchOption(method, data);

    try {
      const response = await fetch(`${PATH_TO_SERVER}${path}`, fetchOptions);
      const content = await response.json();
      if (response.ok) {
        return content;
      }
      const errorMessage = content.error.errors
        .map((item: { message: string }) => item.message)
        .join(',');

      return {
        error: errorMessage,
      };
    } catch (error: unknown) {
      return error instanceof Error ? error.message : '';
    }
  };

  static convertNumberAttrToStr = (
    objectToConvert: QueryParams | QueryParamsAggregated,
  ) => {
    const convertedObject = Object.keys(objectToConvert).reduce(
      (acc: QueryParamsToStr | QueryParamsAggregatedToStr, key) => {
        if (
          (key === 'page' || key === 'group') &&
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
    const path = `${Endpoints.words}${searchParams}`;
    const words: WordResponse[] | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.unAuth,
    );

    return words;
  };

  static getWord = async (
    id: string,
  ): Promise<WordResponse | ErrorResponse> => {
    const path = `${Endpoints.words}/${id}`;
    const word: WordResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.unAuth,
    );

    return word;
  };

  static createUser = async (
    userInfo: AuthData,
  ): Promise<UserResponse | ErrorResponse> => {
    const user: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.POST,
      Endpoints.users,
      Auth.unAuth,
      userInfo,
    );
    return user;
  };

  static getUser = async (
    id: string,
  ): Promise<UserResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${id}`;
    const user: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.auth,
    );
    return user;
  };

  static updateUser = async (
    id: string,
    userInfo: UpdateUserData,
  ): Promise<UserResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${id}`;
    const updatedUser: UserResponse | ErrorResponse = await this.requestMethod(
      Methods.PUT,
      path,
      Auth.auth,
      userInfo,
    );
    return updatedUser;
  };

  static deleteUser = async (id: string): Promise<void> => {
    const path = `${Endpoints.users}/${id}`;
    await this.requestMethod(Methods.DELETE, path, Auth.auth);
  };

  static getUserTokens = async (
    id: string,
  ): Promise<TokenResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${id}/${Endpoints.token}`;
    const tokens: TokenResponse | ErrorResponse = await this.requestMethod(
      Methods.GET,
      path,
      Auth.refresh,
    );
    return tokens;
  };

  static getUsersWords = async (
    userId: string,
  ): Promise<UsersWordResponse[] | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.words}`;
    const usersWords: UsersWordResponse[] | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersWords;
  };

  static createUsersWord = async (
    userId: string,
    wordId: string,
    data: UsersWordData,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.words}/${wordId}`;
    const usersWord: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.POST, path, Auth.auth, data);

    return usersWord;
  };

  static getUsersWord = async (
    userId: string,
    wordId: string,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.words}/${wordId}`;
    const usersWords: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersWords;
  };

  static updateUsersWord = async (
    userId: string,
    wordId: string,
    data: UpdateUsersWordData,
  ): Promise<UsersWordResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.words}/${wordId}`;
    const usersWord: UsersWordResponse | ErrorResponse =
      await this.requestMethod(Methods.PUT, path, Auth.auth, data);

    return usersWord;
  };

  static deleteUsersWord = async (
    userId: string,
    wordId: string,
  ): Promise<void> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.words}/${wordId}`;
    await this.requestMethod(Methods.DELETE, path, Auth.auth);
  };

  static getUserAggregatedWords = async (
    userId: string,
    options: QueryParamsAggregated,
  ): Promise<UsersAggregatedWordsResponse | ErrorResponse> => {
    const convertedParams = this.convertNumberAttrToStr(options);
    const params = new URLSearchParams(convertedParams).toString();
    const searchParams = params ? `?${params}` : params;
    const path = `${Endpoints.words}/${userId}/${Endpoints.aggregatedWords}${searchParams}`;
    const usersAggregatedWords: UsersAggregatedWordsResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersAggregatedWords;
  };

  static getUserAggregatedWord = async (
    userId: string,
    wordId: string,
  ): Promise<PaginatedResults[] | ErrorResponse> => {
    const path = `${Endpoints.words}/${userId}/${Endpoints.aggregatedWords}/${wordId}`;
    const usersAggregatedWord: PaginatedResults[] | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersAggregatedWord;
  };

  static getUserStatistic = async (
    userId: string,
  ): Promise<StatisticResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.statistics}`;
    const usersAggregatedWord: StatisticResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersAggregatedWord;
  };

  static updateUserStatistic = async (
    userId: string,
    statisticData: StatisticData,
  ): Promise<StatisticResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.statistics}`;
    const usersAggregatedWord: StatisticResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth, statisticData);

    return usersAggregatedWord;
  };

  static getUserSettings = async (
    userId: string,
  ): Promise<SettingsResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.settings}`;
    const usersAggregatedWord: SettingsResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth);

    return usersAggregatedWord;
  };

  static updateUserSettings = async (
    userId: string,
    settingsData: SettingsData,
  ): Promise<SettingsResponse | ErrorResponse> => {
    const path = `${Endpoints.users}/${userId}/${Endpoints.settings}`;
    const usersAggregatedWord: SettingsResponse | ErrorResponse =
      await this.requestMethod(Methods.GET, path, Auth.auth, settingsData);

    return usersAggregatedWord;
  };

  static signin = async (
    userInfo: UpdateUserData,
  ): Promise<TokenResponse | ErrorResponse> => {
    const path = `${Endpoints.signin}`;
    const tokens: TokenResponse | ErrorResponse = await this.requestMethod(
      Methods.POST,
      path,
      Auth.unAuth,
      userInfo,
    );
    return tokens;
  };
}

export default Api;
