import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Hook from
import * as yup from 'yup';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// react native pager view
import PagerView from 'react-native-pager-view';

// hooks.
import { useAuth } from '@/modules/auth/hooks';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { useToast } from '@/modules/app/hooks';

// core components.
import { Button, IconButton, TextField } from '@/components/core';

// utils
import { createSpacing } from '@/modules/theme/utilities';
import { screenUtils } from '@/modules/app/utilities';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigators';
import { authUtils } from '../utilities';
import { themeConfig } from '@/modules/theme/configs';

// Validation schema
const registerFormSchema = yup.object().shape({
  name: yup.string().required('Field name is required').min(3, 'Name at least 3 characters').max(255, ''),
  username: yup.string().required('Field username is required').min(3, 'Username at least 3 characters').max(255, ''),
  email: yup.string().required('Please input email').email('Please input valid email'),
  password: yup.string().required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm password'),
});

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const arrPager = [1, 2, 3];

const RegisterForm: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { showToast } = useToast();
  const { auth_register, persistedAuth_setUser } = useAuth();

  const defaultValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values): Promise<void> => {
    try {
      const response = await auth_register(values).unwrap();
      console.log('RESPONSE ->', response);
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
    } catch (e) {
      showToast({
        position: 'bottom',
        type: 'error',
        text1: 'Login failed',
      });
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    // Display toast when form is error only last page
    if (currentStep === arrPager.length) {
      showToast({
        text1: 'Please complete the register form',
        type: 'error',
        variant: 'filled',
        position: 'bottom',
      });
    }
    return errorFields;
  };

  // Pager ref
  const pagerRef = useRef<PagerView>(null);

  const isDisableNextButton = useMemo<boolean>(() => {
    if (currentStep === 1 && watch('name').trim() === '' && watch('email').trim() === '') {
      return true;
    } else if (currentStep === 2 && watch('email').trim() === '') {
      return true;
    } else {
      return false;
    }
  }, [watch('name'), watch('email')]);

  /** Handle change pager */
  const handleChangePager = useCallback(
    (type: 'previous' | 'next') => {
      const newValue = type === 'previous' ? currentStep - 1 : currentStep + 1;
      setCurrentStep(newValue);
      pagerRef.current?.setPage(newValue - 1);
    },
    [currentStep],
  );

  return (
    <PagerView ref={pagerRef} scrollEnabled={false} style={styles.pagerViewStyle} initialPage={0}>
      {arrPager.map((page) => (
        <View style={{ width: '100%', height: '100%' }} key={String(page)}>
          {page === 1 && (
            <View style={styles.container}>
              <Controller
                control={control}
                name='name'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    value={value}
                    onChangeText={(e) => onChange(e)}
                    onBlur={onBlur}
                    placeholder='Name'
                    size='large'
                    variant='outlined'
                    label='What your name ?'
                    labelSize='medium'
                    isError={Boolean(errors?.name?.message)}
                    helperText={errors?.name?.message ?? undefined}
                    margin='normal'
                  />
                )}
              />
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
                    label='What your email address ?'
                    labelSize='medium'
                    autoCapitalize='none'
                    isError={Boolean(errors?.email?.message)}
                    helperText={errors?.email?.message ?? undefined}
                  />
                )}
              />
            </View>
          )}
          {page === 2 && (
            <View style={styles.container}>
              {/* TODO: Check availability username on the server */}
              <Controller
                control={control}
                name='username'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    value={value}
                    onChangeText={(e) => onChange(e)}
                    onBlur={onBlur}
                    placeholder='Username'
                    size='large'
                    variant='outlined'
                    label='Create username'
                    labelSize='medium'
                    autoCapitalize='none'
                    isError={Boolean(errors?.username?.message)}
                    helperText={errors?.username?.message ?? undefined}
                  />
                )}
              />
            </View>
          )}
          {page === arrPager.length && (
            <View style={styles.container}>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    secureTextEntry={true}
                    value={value}
                    onChangeText={(e) => onChange(e)}
                    onBlur={onBlur}
                    placeholder='New Password'
                    size='large'
                    variant='outlined'
                    label='Create New Password'
                    labelSize='small'
                    autoCapitalize='none'
                    isError={Boolean(errors?.password?.message)}
                    helperText={errors?.password?.message ?? undefined}
                  />
                )}
              />
              <Controller
                control={control}
                name='password_confirmation'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    secureTextEntry={true}
                    value={value}
                    onChangeText={(e) => onChange(e)}
                    onBlur={onBlur}
                    placeholder='Confirm Passsword'
                    size='large'
                    variant='outlined'
                    label='Repeat Password'
                    labelSize='small'
                    autoCapitalize='none'
                    isError={Boolean(errors?.password_confirmation?.message)}
                    helperText={errors?.password_confirmation?.message ?? undefined}
                  />
                )}
              />
            </View>
          )}
          {/* Next and register button */}
          {page !== arrPager.length ? (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                {currentStep !== 1 && (
                  <IconButton
                    size='large'
                    onPress={() => handleChangePager('previous')}
                    icon='arrow-back'
                    iconType='material-icons'
                    // iconStyle={{ color: theme.palette.text.disabled }}
                  />
                )}
                <Button
                  rounded
                  title='Next'
                  size='extra-large'
                  iconType='ionicons'
                  endIcon='arrow-forward'
                  onPress={() => handleChangePager('next')}
                  disabled={isDisableNextButton}
                  style={{
                    ...(currentStep === 1
                      ? { flex: 1 }
                      : {
                          marginLeft: createSpacing(currentStep !== 1 ? 4 : 0),
                          minWidth: screenUtils.isSmallScreen ? 100 : 140,
                        }),
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <IconButton
                  size='large'
                  onPress={() => handleChangePager('previous')}
                  icon='arrow-back'
                  iconType='material-icons'
                  iconStyle={{ color: theme.palette.text.disabled }}
                />
                <Button
                  rounded
                  variant='contained'
                  title='Register'
                  size='extra-large'
                  iconType='ionicons'
                  endIcon='enter-outline'
                  onPress={handleSubmit(onSubmit, onError)}
                  style={{ flex: 1, marginLeft: createSpacing(4) }}
                />
              </View>
            </View>
          )}
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  groupedButtonContainer: {},
  pagerViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: 310,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: screenUtils.isSmallScreen ? themeConfig.horizontalSpacing : themeConfig.horizontalSpacing + 8,
    marginBottom: createSpacing(4),
  },
});

export default RegisterForm;
