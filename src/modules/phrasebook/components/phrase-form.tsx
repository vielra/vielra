import React, { FC } from 'react';
import { Pressable, StyleSheet, View, ListRenderItem, FlatList } from 'react-native';

// Hook from
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Yup
import * as yup from 'yup';

// Core components.
import { Button, TextField, Typography } from '@/components/core';

// Utils
import { createSpacing } from '@/modules/theme/utilities';

// Theme config
import { themeConfig } from '@/modules/theme/configs';

// Hooks.
import { useDispatch } from 'react-redux';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';
import { usePhrasebook } from '@/modules/phrasebook/hooks';

// Interfaces
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';
import { Ionicons } from '@/components/icons';
import { NavigationProps } from '@/navigators';

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

  const navigation = useNavigation<NavigationProps>();

  const { listCategories, phrasebook_createIsLoading, phrasebook_create } = usePhrasebook();

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
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(phraseFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values): Promise<void> => {
    console.log('values', values);
    try {
      const response = await phrasebook_create(values);
      console.log('response', response);
      if (response) {
      }
    } catch (e) {}
    // dispatch(
    //   phrasebook_actionCreatePhrase(values, (routeName: string) => navigation.navigate(routeName as never))
    // );
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
        name='category_id'
        render={({ field: { onChange, value } }) => (
          <Pressable
            onPress={() => onChange(item.id)}
            style={StyleSheet.flatten([
              styles.categoryItemStyle,
              {
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                ...(index === 0 && {
                  marginLeft: createSpacing(4),
                }),
                ...(item.id === value && {
                  backgroundColor: item.color || theme.palette.secondary.main,
                }),
              },
            ])}>
            <Ionicons
              name='bookmarks'
              size={18}
              style={StyleSheet.flatten([
                styles.iconStyle,
                {
                  color: item.id === value ? '#ffffff' : item.color,
                },
              ])}
            />
            <Typography
              style={{
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
      <View style={styles.formInner}>
        {/* List phrase category */}
        <View style={styles.categoryListRoot}>
          <View
            style={StyleSheet.flatten([
              styles.categoryListContainer,
              {
                backgroundColor: theme.palette.background.paper,
              },
            ])}>
            <Typography
              gutterBottom={3}
              style={{
                marginLeft: createSpacing(4),
                color: theme.palette.text.secondary,
              }}
              variant='h6'>
              Select category
            </Typography>
            <FlatList
              horizontal
              data={listCategories}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderCategoryItem}
              style={StyleSheet.flatten([styles.flatListCategories, {}])}
              contentContainerStyle={{}}
            />

            {errors?.category_id && (
              <View style={{ marginLeft: createSpacing(4) }}>
                <Typography variant='subtitle2' style={{ color: 'red' }}>
                  {errors?.category_id?.message || 'Category is required'}
                </Typography>
              </View>
            )}
          </View>
        </View>

        <Controller
          control={control}
          name='text_vi'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder='Tiếng Việt'
              size='large'
              variant='filled'
              label='Tiếng Việt'
              labelSize='medium'
              multiline={true}
              rows={3}
              maxRows={5}
            />
          )}
        />

        <Controller
          control={control}
          name='text_id'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder='Bahasa Indonesia'
              size='medium'
              variant='filled'
              label='Bahasa Indonesia'
              labelSize='medium'
              multiline={true}
              rows={3}
              maxRows={5}
              // helperText={errors?.name?.message ?? undefined}
            />
          )}
        />

        <Controller
          control={control}
          name='text_en'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder='English'
              size='medium'
              label='English'
              labelSize='medium'
              multiline={true}
              variant='filled'
              rows={3}
              maxRows={5}
              isError={Boolean(errors?.text_en?.message)}
              helperText={errors?.text_en?.message ?? undefined}
            />
          )}
        />

        <Controller
          control={control}
          name='notes'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onChangeText={(e) => onChange(e)}
              onBlur={onBlur}
              placeholder='Notes...'
              size='medium'
              variant='filled'
              label='Notes'
              labelSize='medium'
              multiline
              rows={2}
              maxRows={5}
              isError={Boolean(errors?.notes?.message)}
              helperText={errors?.notes?.message ?? undefined}
            />
          )}
        />
      </View>
      <View style={styles.formFooter}>
        <Button
          variant='contained'
          color='secondary'
          title='Save Phrase'
          size='extra-large'
          onPress={handleSubmit(onSubmit, onError)}
          style={{ flex: 1 }}
          isLoading={phrasebook_createIsLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: createSpacing(4),
    paddingHorizontal: themeConfig.horizontalSpacing,
    flexGrow: 1,
  },
  formInner: {},
  formFooter: {
    height: 52,
  },
  categoryListRoot: {
    marginBottom: createSpacing(4),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  categoryListContainer: {
    borderRadius: themeConfig.shape.borderRadius,
    paddingVertical: createSpacing(3),
  },
  flatListCategories: {
    marginBottom: createSpacing(2),
  },
  categoryItemStyle: {
    borderWidth: 1,
    borderRadius: themeConfig.shape.borderRadius,
    marginRight: createSpacing(2),
    paddingHorizontal: createSpacing(3),
    paddingVertical: createSpacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    marginRight: createSpacing(2),
  },
});
