import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormInput from './FormInput/formInput';
import {
  registerSchemaLogIn,
  registerSchemaSignUp,
  fieldsList,
  InputTypes,
} from './FormInput/registerSchema';
import { LogInActionResponse } from '../LogIn/logInAction';
import { SignUpActionResponse } from '../SignUp/signUpAction';
import { AuthData } from '../../../Api/api-types';
import { RegisterInput } from '../auth-types';
import { isAuth } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';
import { fetchAuth } from '../../store/authFetch';
import StorageWorker from '../../../localStorage';

type LogInFieldsType = Omit<typeof fieldsList, 'name' | 'passwordConfirm'>;

type AuthFieldsTypes = LogInFieldsType | typeof fieldsList;

type PropTypes = {
  authFields: AuthFieldsTypes;
  formRole: FormRole;
  action: (
    userInfo: AuthData,
  ) => Promise<LogInActionResponse | SignUpActionResponse>;
};

export const enum FormRole {
  LogIn = 'logIn',
  SignUp = 'signUp',
}

function AuthPage({ authFields, formRole, action }: PropTypes) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [submitErr, setSubmitError] = useState('');
  const isAuthorized = useSelector(isAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

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
      formRole === FormRole.SignUp ? registerSchemaSignUp : registerSchemaLogIn,
    ),
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset();
      // if (isAuthorized) navigate(location.pathname);
      // console.log('location.pathname ', location);
    }
  }, [isSubmitSuccessful, isAuthorized]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (formValues) => {
    setSubmitError('');
    const authData: AuthData = {
      name: 'name' in formValues ? formValues.name : '',
      email: formValues.email,
      password: formValues.password,
    };
    setLoading(true);
    action(authData)
      .then(resp => {
        if (!resp.success) {
          setSubmitError(resp.data.toString());
        } else {
          dispatch(fetchAuth(StorageWorker.userId));
          navigate(location.pathname);
        }
      })
      .finally(() => setLoading(false));
  };
  console.log('errors', errors);

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
          {submitErr && (
            <Alert severity="warning" className="submit-error">
              {submitErr}
            </Alert>
          )}
        </Box>
      </FormProvider>
    </Box>
  );
}

export default AuthPage;
