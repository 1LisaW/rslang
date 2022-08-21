/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AuthPage, { FormRole } from '../FormComponents/authPage';
import { fieldsList } from '../FormComponents/FormInput/registerSchema';

export default function SignUpPage() {
  const { name, passwordConfirm, ...signUpAttrList } = fieldsList;
  return <AuthPage authFields={signUpAttrList} formRole={FormRole.SignUp} />;
}
