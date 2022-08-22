import React from 'react';
import AuthPage, { FormRole } from '../FormComponents/authPage';
import { fieldsList } from '../FormComponents/FormInput/registerSchema';
import logInAction from './logInAction';

export default function LogInPage() {
  const { name, passwordConfirm, ...logInAttrList } = fieldsList;
  return (
    <AuthPage
      authFields={logInAttrList}
      formRole={FormRole.LogIn}
      action={logInAction}
    />
  );
}
