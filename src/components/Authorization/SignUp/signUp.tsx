import React from 'react';
import AuthPage, { FormRole } from '../FormComponents/authPage';
import { fieldsList } from '../FormComponents/FormInput/registerSchema';
import signUpAction from './signUpAction';

export default function SignUpPage() {
  return (
    <AuthPage
      authFields={fieldsList}
      formRole={FormRole.SignUp}
      action={signUpAction}
    />
  );
}
