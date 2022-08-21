import React from 'react';
import AuthPage, { FormRole } from '../FormComponents/authPage';
import { fieldsList } from '../FormComponents/FormInput/registerSchema';

export default function SignUpPage() {
  return <AuthPage authFields={fieldsList} formRole={FormRole.SignIn} />;
}
