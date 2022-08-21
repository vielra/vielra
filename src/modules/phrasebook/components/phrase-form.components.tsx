import React, { FC } from 'react';
import { Pressable, StyleSheet, View, ListRenderItem, FlatList } from 'react-native';

// Hook from
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Yup
import * as yup from 'yup';

// Core components.
import { Button, Typography } from '@/components/core';
import { TextInputBase } from '@/components/core/base';

// Action creators
import { phrasebook_actionCreatePhrase } from '@/modules/phrasebook/redux';

// Utils
import { isSmallScreen } from '@/utils';
import { createSpacing } from '@/modules/theme/utils';

// Components
import DropShadow from 'react-native-drop-shadow';
import { LayoutView } from '@/components/shared';

// Theme config
import * as themeConfig from '@/modules/theme/config';

// Hooks.
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';
import { usePhrasebook } from '@/modules/phrasebook/hooks';

// Interfaces
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';

// Validation schema
const phraseFormSchema = yup.object().shape({
  category_id: yup.string().required('Category is required'),
  text_vi: yup.string().required('Field text vietnamese is required').max(255, 'Field name is too long'),
});

type FormValues = {
  category_id: string;
  text_id: string;
  text_en: string;
  text_vi: string;
  notes: string;
};

export const PhraseForm: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const navigation = useNavigation();

  const { phraseCategory_data, createPhrase_isLoading } = usePhrasebook();

  const defaultValues = {
    category_id: '',
    text_id: '',
    text_en: '',
    text_vi: '',
    notes: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(phraseFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    // prettier-ignore
    dispatch(
      phrasebook_actionCreatePhrase(values, (routeName: string) => navigation.navigate(routeName as never))
    );
  };

  const onError: SubmitErrorHandler<FormValues> = (errorFields) => {
    // Display toast when form is error only last page

    console.log('❌❌ errorFields', errorFields);
    return errorFields;
  };

  const renderCategoryItem: ListRenderItem<IPhraseCategory> = ({ item, index }) => {
    return (
      <Controller
        control={control}
        name="category_id"
        render={({ field: { onChange, value } }) => (
          <Pressable
            onPress={() => onChange(item.id)}
            style={StyleSheet.flatten([
              styles.categoryItemStyle,
              {
                backgroundColor: theme.palette.background.paper,
                borderColor: item.color || theme.palette.divider,
                ...(index === 0 && {
                  marginLeft: createSpacing(4),
                }),
                ...(item.id === value && {
                  backgroundColor: item.color || theme.palette.secondary.main,
                }),
              },
            ])}>
            <Typography
              variant="body2"
              style={{
                lineHeight: 16,
                color: item.color || theme.palette.text.primary,
                ...(item.id === value && {
                  color: item.color ? theme.palette.primary.contrastText : theme.palette.text.primary,
                }),
              }}>
              {item.name.en}
            </Typography>
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={styles.root}>
      <View style={{ marginBottom: createSpacing(4) }}>
        {/* List phrase category */}
        <LayoutView style={{ marginBottom: createSpacing(2) }}>
          <DropShadow style={styles.categoryListRoot}>
            <View
              style={StyleSheet.flatten([
                styles.categoryListContainer,
                {
                  backgroundColor: theme.palette.background.paper,
                },
              ])}>
              <Typography
                style={{
                  marginLeft: createSpacing(4),
                  marginBottom: createSpacing(2),
                  color: theme.palette.text.secondary,
                }}
                variant="h6">
                Select category
              </Typography>
              <FlatList
                horizontal
                data={phraseCategory_data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderCategoryItem}
                style={StyleSheet.flatten([styles.flatListCategories, {}])}
                contentContainerStyle={{}}
                keyboardShouldPersistTaps="handled"
              />

              {errors?.category_id && (
                <View style={{ marginLeft: createSpacing(4) }}>
                  <Typography variant="subtitle2" style={{ color: 'red' }}>
                    {errors?.category_id?.message || 'Category is required'}
                  </Typography>
                </View>
              )}
            </View>
          </DropShadow>

          <Controller
            control={control}
            name="text_vi"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputBase
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder="Tiếng Việt"
                size="medium"
                variant="outlined"
                label="Tiếng Việt"
                labelSize="medium"
                multiline={true}
                // isError={Boolean(errors?.name?.message)}
                // helperText={errors?.name?.message ?? undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="text_id"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputBase
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder="B. Indonesia"
                size="medium"
                variant="outlined"
                label="Bahasa Indonesia"
                labelSize="medium"
                multiline={true}
                // isError={Boolean(errors?.name?.message)}
                // helperText={errors?.name?.message ?? undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="text_en"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputBase
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder="English"
                size="medium"
                variant="outlined"
                label="English"
                labelSize="medium"
                multiline={true}
                // isError={Boolean(errors?.name?.message)}
                // helperText={errors?.name?.message ?? undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputBase
                value={value}
                onChangeText={(e) => onChange(e)}
                onBlur={onBlur}
                placeholder="notes"
                size="medium"
                variant="outlined"
                label="notes"
                labelSize="medium"
                multiline={true}
                // isError={Boolean(errors?.name?.message)}
                // helperText={errors?.name?.message ?? undefined}
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              // startIcon="ios-checkmark"
              // iconType="ionicons"
              title="Save Phrase"
              size="extra-large"
              onPress={handleSubmit(onSubmit, onError)}
              style={{ flex: 1 }}
              isLoading={createPhrase_isLoading}
            />
          </View>
        </LayoutView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: createSpacing(4) },
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

  categoryListRoot: {
    marginBottom: createSpacing(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  categoryListContainer: {
    borderRadius: themeConfig.shape.borderRadius,
    paddingVertical: createSpacing(3),
  },
  flatListCategories: {
    marginBottom: createSpacing(2),
  },
  categoryItemStyle: {
    width: undefined,
    borderWidth: 1,
    borderRadius: themeConfig.shape.borderRadius,
    marginRight: createSpacing(2),
    paddingHorizontal: createSpacing(5),
    paddingVertical: createSpacing(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
