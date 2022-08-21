/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
} & TextFieldProps;

function FormInput(props: IFormInputProps) {
  const { name, ...otherProps } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={
            errors[name] ? <span>{`${errors[name]!.message}`}</span> : ''
          }
        />
      )}
    />
  );
}

export default FormInput;
