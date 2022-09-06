import Api from '../../../Api/api';
import { AuthData, UserResponse, TokenResponse } from '../../../Api/api-types';

type SignUpActionErrResponse = {
  success: boolean;
  data: string;
};

type SignUpActionSuccessResponse = {
  success: boolean;
  data: UserResponse | TokenResponse;
};

export type SignUpActionResponse =
  | SignUpActionErrResponse
  | SignUpActionSuccessResponse;

async function signUpAction(userInfo: AuthData): Promise<SignUpActionResponse> {
  const response = await Api.createUser(userInfo);

  if ('error' in response) {
    return { success: false, data: response.error };
  }

  return { success: true, data: response };
}

export default signUpAction;
