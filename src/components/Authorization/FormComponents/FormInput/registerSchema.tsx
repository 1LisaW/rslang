import { object, string } from 'zod';

export const registerSchemaLogIn = object({
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const registerSchemaSignUp = object({
  name: string()
    .min(1, 'Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export enum InputTypes {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export const fieldsList = {
  name: {
    name: 'name',
    label: 'Name',
    type: InputTypes.Text,
    InputProps: false,
  },
  email: {
    name: 'email',
    label: 'Email Address',
    type: InputTypes.Email,
    InputProps: false,
  },
  password: {
    name: 'password',
    label: 'Password',
    type: InputTypes.Password,
    InputProps: true,
  },

  passwordConfirm: {
    name: 'passwordConfirm',
    label: 'Confirm Password',
    type: InputTypes.Password,
    InputProps: true,
  },
};
