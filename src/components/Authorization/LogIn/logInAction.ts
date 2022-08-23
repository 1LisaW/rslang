import Api from '../../../Api/api';
import { AuthData, TokenResponse } from '../../../Api/api-types';

type LogInActionErrResponse = {
  success: boolean;
  data: string;
};
type LogInActionSuccessResponse = {
  success: boolean;
  data: TokenResponse;
};
export type LogInActionResponse =
  | LogInActionErrResponse
  | LogInActionSuccessResponse;

async function logInAction(userInfo: AuthData): Promise<LogInActionResponse> {
  const response = await Api.signin(userInfo);
  console.log('loginAction ', response);

  if ('error' in response) {
    return {
      success: false,
      data: 'Login failed. Combination of e-mail and password incorrect',
    };
  }

  return { success: true, data: response };
}

export default logInAction;
