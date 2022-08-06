import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Hook from
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Yup
import * as yup from 'yup';

// React native pager view
import PagerView from 'react-native-pager-view';

// Hoooks.
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';
import { useTheme } from '@/modules/theme/hooks';

// Core components.
import { Button, IconButton } from '@/components/core';
import { TextInputBase } from '@/components/core/base';

// Action creators
import { auth_actionRegister, auth_actionSetRegisterFormIsDirty, auth_rootSelector } from '@/modules/auth/redux';
import { toast_actionSetToast } from '@/modules/toast/redux';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Validation schema
const registerFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Field name is required')
    .min(3, 'Name at least 3 characters')
    .max(255, 'Field name is too long'),
  email: yup.string().required('Email cannot be empty').email('Please input valid email'),
  password: yup.string().required('Password is required'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const arrPager = [1, 2, 3, 4];

export const RegisterForm: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { register_formIsDirty } = useAppSelector((s) => auth_rootSelector(s));

  const [currentStep, setCurrentStep] = useState<number>(1);

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
    getValues,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(auth_actionRegister(values));
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    // Display toast when form is error only last page
    if (currentStep === arrPager.length) {
      dispatch(
        toast_actionSetToast({
          show: true,
          messages: 'Please complete the register form!',
          severity: 'error',
          variant: 'filled',
          autoHide: true,
          placement: 'bottom',
        }),
      );
    }
    // return console.log('❌❌ errorFields', errorFields);
    return errorFields;
  };

  // Pager ref
  const pagerRef = useRef<PagerView>(null);

  const isDisabledNextButton = useMemo<boolean>(() => {
    if (currentStep === 1 && watch('name').trim() === '') {
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

  useEffect(() => {
    if (isDirty && (getValues('email').trim() !== '' || getValues('username').trim() !== '')) {
      if (!register_formIsDirty) {
        dispatch(auth_actionSetRegisterFormIsDirty(isDirty));
      }
    } else {
      if (register_formIsDirty) {
        dispatch(auth_actionSetRegisterFormIsDirty(false));
      }
    }
  }, [isDirty, getValues('email'), getValues('username')]);

  // console.log('Error', errors);

  /**
   * Handle press next button on page input email
   */
  // const handleNextOnInputEmail = useCallback(() => {
  //   handleSubmit(() => null, onError)();
  // }, [errors]);

  return (
    <>
      <PagerView ref={pagerRef} scrollEnabled={false} style={styles.pagerViewStyle} initialPage={0}>
        {arrPager.map((page) => (
          <View style={{ width: '100%', height: '100%' }} key={String(page)}>
            {page === 1 && (
              <View style={{ marginBottom: createSpacing(2) }}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="Name"
                      size="large"
                      variant="filled"
                      label="What your name ?"
                      labelSize="medium"
                      isError={Boolean(errors?.name?.message)}
                      helperText={errors?.name?.message ?? undefined}
                    />
                  )}
                />
              </View>
            )}

            {page === 2 && (
              <View style={{ marginBottom: createSpacing(2) }}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="Email address"
                      size="large"
                      variant="filled"
                      label="What your email address ?"
                      labelSize="medium"
                      autoCapitalize="none"
                      isError={Boolean(errors?.email?.message)}
                      helperText={errors?.email?.message ?? undefined}
                    />
                  )}
                />
              </View>
            )}

            {page === 3 && (
              <View style={{ marginBottom: createSpacing(2) }}>
                {/* TODO: Check availability username on the server */}
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="Username"
                      size="large"
                      variant="filled"
                      label="Create username"
                      labelSize="medium"
                      autoCapitalize="none"
                      isError={Boolean(errors?.username?.message)}
                      helperText={errors?.username?.message ?? undefined}
                    />
                  )}
                />
              </View>
            )}

            {page === arrPager.length && (
              <View style={{ marginBottom: createSpacing(2) }}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      secureTextEntry={true}
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="New Password"
                      size="large"
                      variant="filled"
                      label="Create New Password"
                      labelSize="small"
                      autoCapitalize="none"
                      isError={Boolean(errors?.password?.message)}
                      helperText={errors?.password?.message ?? undefined}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password_confirmation"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      secureTextEntry={true}
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="Confirm Passsword"
                      size="large"
                      variant="filled"
                      label="Repeat Password"
                      labelSize="small"
                      autoCapitalize="none"
                      isError={Boolean(errors?.password_confirmation?.message)}
                      helperText={errors?.password_confirmation?.message ?? undefined}
                    />
                  )}
                />
              </View>
            )}

            {/* Next and register button */}
            {page !== arrPager.length ? (
              <View style={styles.buttonContainer}>
                {currentStep !== 1 && (
                  <IconButton
                    size="medium"
                    onPress={() => handleChangePager('previous')}
                    icon="arrow-back"
                    iconType="material-icons"
                    iconStyle={{ color: theme.palette.text.disabled }}
                  />
                )}
                <Button
                  rounded
                  variant="contained"
                  color="secondary"
                  endIcon="arrow-forward"
                  iconType="material-icons"
                  title="Next"
                  // onPress={() => (page === 2 ? handleNextOnInputEmail() : handleChangePager('next'))}
                  onPress={() => handleChangePager('next')}
                  size="large"
                  disabled={isDisabledNextButton}
                  style={{
                    ...(currentStep === 1
                      ? {
                          flex: 1,
                        }
                      : {
                          marginLeft: createSpacing(currentStep !== 1 ? 4 : 0),
                          minWidth: isSmallScreen ? 100 : 120,
                        }),
                  }}
                />
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <IconButton
                  size="medium"
                  onPress={() => handleChangePager('previous')}
                  icon="arrow-back"
                  iconType="material-icons"
                  iconStyle={{ color: theme.palette.text.disabled }}
                />
                <Button
                  rounded
                  variant="contained"
                  color="success"
                  startIcon="ios-checkmark"
                  iconType="ionicons"
                  title="Register"
                  size="large"
                  onPress={handleSubmit(onSubmit, onError)}
                  style={{ flex: 1, marginLeft: createSpacing(4) }}
                />
              </View>
            )}
          </View>
        ))}
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  groupedButtonContainer: {},
  pagerViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: 264,
    marginHorizontal: createSpacing(isSmallScreen ? 6 : 10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
