import { useCallback, useMemo, useRef, useState, memo, useEffect, FC } from 'react';
import { View, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Typography } from '@/components/core';
import BottomSheet, { BottomSheetBackdropProps, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { bottomSheetStyles } from '@/components/shared/bottom-sheet/bottom-sheet.styles';

// components
import BaseBottomSheetBackdrop from '@/components/shared/bottom-sheet/bottom-sheet-backdrop';
import { PhraseCategoryItem } from './phrase-category-item';

// hooks
import { useAppDispatch } from '@/plugins/redux';
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePhrasebook } from '@/modules/phrasebook/hooks';

// utils
import { screenUtils } from '@/modules/app/utilities';

// utils / helpers
import { createSpacing } from '@/modules/theme/utilities';

// config
import { themeConfig } from '@/modules/theme/configs';
import { uiConfig } from '@/modules/app/configs';
import { NavigationProps } from '@/navigators';
import { IPhraseCategory } from '../interfaces';

// interfaces

const CLOSE_ANIMATION_SPEED = 200;

const BottomSheetPhrasebookCategoryList: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const ref = useRef<BottomSheet>(null);

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => [screenUtils.height / 1.4], []);

  const {
    listCategories,
    phrasebook_getListCategory,
    phrasebook_getListCategoryIsLoading,
    phrasebook_setListCategories,
    snapIndexBottomSheetCategoryList,
    phrasebook_setSnapIndexBottomSheetCategoryList,
  } = usePhrasebook();

  const getPhraseCategories = async (): Promise<void> => {
    try {
      const response = await phrasebook_getListCategory(undefined);
      if (response.isSuccess) {
        dispatch(phrasebook_setListCategories(response.data));
      }
    } catch (e) {}
  };

  const onBottomSheetChange = useCallback((currentIndex: number): void => {
    dispatch(phrasebook_setSnapIndexBottomSheetCategoryList(currentIndex));
  }, []);

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BaseBottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    [],
  );

  useEffect(() => {
    const onBackPress = () => {
      ref.current?.close({
        duration: CLOSE_ANIMATION_SPEED,
        overshootClamping: false,
      });
      if (isOpen) {
        return true;
      } else {
        return false;
      }
    };
    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [isOpen, navigation]);

  // get phrasebook categories if empty
  useEffect(() => {
    if (listCategories.length === 0) {
      getPhraseCategories();
    }
  }, [ref?.current, listCategories.length]);

  const onPressCategory = useCallback(
    (item: IPhraseCategory) => {
      ref?.current?.close();
      dispatch(phrasebook_setSnapIndexBottomSheetCategoryList(-1));
      setTimeout(() => {
        navigation.navigate('phrase_list_screen', { category: item });
      }, 150);
    },
    [ref.current, snapIndexBottomSheetCategoryList],
  );

  return (
    <BottomSheet
      ref={ref}
      index={snapIndexBottomSheetCategoryList}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints as Array<number>}
      enablePanDownToClose={true}
      style={StyleSheet.flatten([bottomSheetStyles.bottomSheet_root])}
      handleIndicatorStyle={bottomSheetStyles.bottomSheet_handleIndicatorStyle}
      backgroundStyle={StyleSheet.flatten([
        bottomSheetStyles.bottomSheet_backgroundStyle,
        {
          backgroundColor: theme.palette.background.paper,
          borderRadius: themeConfig.shape.borderRadius * 4,
        },
      ])}
      onChange={onBottomSheetChange}>
      <Typography style={styles.textHeader} gutterBottom={3} fontWeight='bold' color='text.secondary'>
        Phrasebook Category
      </Typography>

      {phrasebook_getListCategoryIsLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <BottomSheetFlatList
          data={listCategories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PhraseCategoryItem item={item} onPress={onPressCategory} />}
          contentContainerStyle={{ paddingBottom: createSpacing(6) }}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    textAlign: 'center',
  },
  loadingBox: {
    borderRadius: themeConfig.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: createSpacing(3),
    height: screenUtils.height - uiConfig.bottomTabHeight,
    zIndex: 3,
  },
  root: {
    position: 'relative',
  },
  container: {
    borderWidth: 1.3,
    borderRadius: themeConfig.shape.borderRadius,
    justifyContent: 'center',
  },
});

BottomSheetPhrasebookCategoryList.defaultProps = {
  options: [],
  multiple: false,
  size: 'medium',
  margin: 'normal',
  variant: 'outlined',
  rounded: false,
  color: 'primary',
  labelSize: 'small',
  editable: true,
  isError: false,
  isValid: false,
  helperText: undefined,
  multiline: false,
  bottomSheetHeight: 400,
  enableSearch: false,
  closeAfterSelect: false,
  fullScreen: false,
};

export default memo(BottomSheetPhrasebookCategoryList);
