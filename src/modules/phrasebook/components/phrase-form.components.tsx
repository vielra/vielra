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
const phraseFormSchema = yup.object().shape({
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
  text: {
    id: string;
    en: string;
    vi: string;
  };
  notes: string;
};

export const PhraseForm: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { register_formIsDirty } = useAppSelector((s) => auth_rootSelector(s));

  const [currentStep, setCurrentStep] = useState<number>(1);

  const defaultValues = {
    text: {
      id: '',
      en: '',
      vi: '',
    },
    notes: '',
  };

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    resolver: yupResolver(phraseFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(auth_actionRegister(values));
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    // Display toast when form is error only last page

    // return console.log('❌❌ errorFields', errorFields);
    return errorFields;
  };

  // Pager ref
  const pagerRef = useRef<PagerView>(null);

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
    <View style={styles.root}>
      <View style={{ marginBottom: createSpacing(2) }}>
        <Controller
          control={control}
          name="text.id"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputBase
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder="B. Indonesia"
              size="medium"
              variant="filled"
              label="Bahasa Indonesia"
              labelSize="medium"
              isError={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message ?? undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="text.en"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputBase
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder="English"
              size="medium"
              variant="filled"
              label="English"
              labelSize="medium"
              isError={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message ?? undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="text.vi"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputBase
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder="Tiếng Việt"
              size="medium"
              variant="filled"
              label="Tiếng Việt"
              labelSize="medium"
              isError={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message ?? undefined}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          rounded
          variant="contained"
          color="success"
          startIcon="ios-checkmark"
          iconType="ionicons"
          title="Save Phrase"
          size="large"
          onPress={handleSubmit(onSubmit, onError)}
          style={{ flex: 1, marginLeft: createSpacing(4) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
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
