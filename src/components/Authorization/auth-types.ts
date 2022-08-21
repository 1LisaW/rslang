import { TypeOf } from 'zod';
import {
  registerSchemaLogIn,
  registerSchemaSignUp,
} from './FormComponents/FormInput/registerSchema';

export type RegisterLogInInput = TypeOf<typeof registerSchemaLogIn>;
export type RegisterSignUpInput = TypeOf<typeof registerSchemaSignUp>;
export type RegisterInput = RegisterLogInInput | RegisterSignUpInput;
