import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
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
import { useTheme } from '@/modules/theme/hooks';

// Core components.
import { Button, IconButton } from '@/components/core';
import { TextInputBase } from '@/components/core/base';

// Action creators
import { auth_actionLogin } from '@/modules/auth/redux';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Validation schema
const loginFormSchema = yup.object().shape({
  email: yup.string().required('Email cannot be empty').email('Please input valid email'),
  password: yup.string().required('Password is required'),
});

type FormValues = {
  email: string;
  password: string;
};

const arrPager = [1, 2];

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [currentStep, setCurrentStep] = useState<number>(1);

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    control,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(auth_actionLogin(values));
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    // return console.log('❌❌ errorFields', errorFields);
    return errorFields;
  };

  // Pager ref
  const pagerRef = useRef<PagerView>(null);

  const isDisabledNextButton = useMemo<boolean>(() => {
    if (currentStep === 1 && watch('email').trim() === '') {
      return true;
    } else if (currentStep === 2 && watch('email').trim() === '') {
      return true;
    } else {
      return false;
    }
  }, [watch('email')]);

  /** Handle change pager */
  const handleChangePager = useCallback(
    (type: 'previous' | 'next') => {
      const newValue = type === 'previous' ? currentStep - 1 : currentStep + 1;
      setCurrentStep(newValue);
      pagerRef.current?.setPage(newValue - 1);
    },
    [currentStep],
  );

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
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputBase
                      value={value}
                      onChangeText={(e) => onChange(e)}
                      onBlur={onBlur}
                      placeholder="Email address"
                      size="large"
                      variant="filled"
                      label="Email address"
                      labelSize="medium"
                      autoCapitalize="none"
                      isError={Boolean(errors?.email?.message)}
                      helperText={errors?.email?.message ?? undefined}
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
                      placeholder="Password"
                      size="large"
                      variant="filled"
                      label="Password"
                      labelSize="small"
                      autoCapitalize="none"
                      isError={Boolean(errors?.password?.message)}
                      helperText={errors?.password?.message ?? undefined}
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
                  title="Login"
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
