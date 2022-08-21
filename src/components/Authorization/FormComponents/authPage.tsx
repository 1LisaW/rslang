/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormInput from './FormInput/formInput';
import {
  registerSchemaSignIn,
  registerSchemaSignUp,
  fieldsList,
  InputTypes,
} from './FormInput/registerSchema';

type RegisterSignInInput = TypeOf<typeof registerSchemaSignIn>;
type RegisterSignUpInput = TypeOf<typeof registerSchemaSignUp>;
type RegisterInput = RegisterSignInInput | RegisterSignUpInput;

type AuthFieldsTypes =
  | Omit<typeof fieldsList, 'name' | 'passwordConfirm'>
  | typeof fieldsList;

type PropTypes = {
  authFields: AuthFieldsTypes;
  formRole: FormRole;
};

export const enum FormRole {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

function AuthPage({ authFields, formRole }: PropTypes) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(
      formRole === FormRole.SignUp
        ? registerSchemaSignUp
        : registerSchemaSignIn,
    ),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (formValues) => {
    console.log('formValues', formValues);
    setLoading(true);
  };
  console.log(errors);

  const passwordProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {values.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Box sx={{ maxWidth: '30rem' }} className="popup">
      <Typography variant="h4" component="h1" sx={{ pb: '2rem' }}>
        {formRole}
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {Object.entries(authFields).map(([attrName, attrValue]) => {
            let visibleType = attrValue.type;
            if (visibleType === InputTypes.Password) {
              visibleType = values.showPassword
                ? InputTypes.Text
                : InputTypes.Password;
            }
            return (
              <FormInput
                name={attrName}
                key={attrName}
                required
                fullWidth
                label={attrValue.label}
                sx={{ mb: 2 }}
                type={visibleType}
                InputProps={attrValue.InputProps ? passwordProps : undefined}
              />
            );
          })}

          <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={loading}
            sx={{ py: '0.8rem', pt: '1rem' }}
          >
            {formRole}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default AuthPage;
