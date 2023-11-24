import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

// hook from
import * as yup from 'yup';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// core components.
import { Button, TextField } from '@/components/core';

// configs
import { themeConfig } from '@/modules/theme/configs';

// hooks
import { useAuth } from '@/modules/auth/hooks';
import { useToast } from '@/modules/app/hooks';
import { useAppDispatch } from '@/plugins/redux';
import { useTheme } from '@/modules/theme/hooks';

// utils
import { authUtils } from '@/modules/auth/utilities';
import { createSpacing } from '@/modules/theme/utilities';
import { useNavigation } from '@react-navigation/native';

// interfaces
import { NavigationProps } from '@/navigators';
import { IResponseLoginError } from '../redux';

// validation schema
const loginFormSchema = yup.object().shape({
  email: yup.string().required('Please input email').email('Please input valid email'),
  password: yup.string().required('Please input password'),
});

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  // const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { auth_login, auth_loginIsLoading, persistedAuth_setUser } = useAuth();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const response = await auth_login(values).unwrap();
      if (response.token && response.user) {
        dispatch(persistedAuth_setUser(response.user));
        authUtils.saveToken(response.token);
        navigation.navigate('dashboard_screen');
      } else {
        showToast({
          position: 'bottom',
          type: 'error',
          text1: 'Invalid credentials',
        });
      }
    } catch (_error) {
      const e: IResponseLoginError = _error as IResponseLoginError;
      if (e.status === 400) {
        showToast({
          position: 'bottom',
          type: 'error',
          text1: 'Invalid credentials',
        });
      } else {
        showToast({
          position: 'bottom',
          type: 'error',
          text1: 'Login failed',
        });
      }
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    return console.log('❌❌ errorFields', errorFields);
    // return errorFields;
  };

  return (
    <>
      <View style={styles.root}>
        <View style={{ marginBottom: createSpacing(5) }}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder='Email address'
                size='large'
                variant='outlined'
                label='Email address'
                labelSize='small'
                autoCapitalize='none'
                isError={Boolean(errors?.email?.message)}
                helperText={errors?.email?.message ?? undefined}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                secureTextEntry={true}
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder='Password'
                size='extra-large'
                variant='outlined'
                label='Password'
                labelSize='small'
                autoCapitalize='none'
                isError={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message ?? undefined}
              />
            )}
          />
        </View>
        <Button
          rounded
          title='Login'
          size='extra-large'
          iconType='ionicons'
          startIcon='enter-outline'
          style={{ flex: 1 }}
          isLoading={auth_loginIsLoading}
          onPress={handleSubmit(onSubmit, onError)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: themeConfig.horizontalSpacing,
  },
});

export default LoginForm;
