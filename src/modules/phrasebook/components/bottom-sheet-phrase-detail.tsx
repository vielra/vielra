import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// hooks
import { useTheme } from '@/modules/theme/hooks';
import { useApp } from '@/modules/app/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// components
import { Button, Divider, IconButton, MaterialCommunityIcon, Typography } from '@/components/core';

import BottomSheet, { BottomSheetBackdropProps, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { bottomSheetStyles } from '@/components/shared/bottom-sheet/bottom-sheet.styles';

// helpers / utils
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing } from '@/modules/theme/utilities';

// config
import { themeConfig } from '@/modules/theme/configs';
import { BottomSheetBackdrop } from '@/components/shared';

const animationConfig = {
  duration: 200,
  overshootClamping: false,
};

const BottomSheetPhraseDetail = () => {
  const ref = useRef<BottomSheet>(null);
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const SNAP_POINTS = useMemo(() => [340, 732, screenUtils.height + insets.top], []);

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const { openBottomSheet, feedback_setOpenBottomSheet, feedback_setHasSubmittedFeedback } = useFeedback();

  const { bottomTabVisible, app_setBottomTabVisible } = useApp();

  const handleClose = (): void => {
    ref.current?.snapToIndex(-1, animationConfig);
    feedback_setOpenBottomSheet(false);
    app_setBottomTabVisible(true);
  };

  useEffect(() => {
    if (openBottomSheet) {
      ref.current?.snapToIndex(1, animationConfig);
      app_setBottomTabVisible(false);
      handleClose();
    }
  }, [bottomTabVisible, openBottomSheet]);

  const onBottomSheetChange = useCallback(
    (index: number) => {
      if (index < 0) {
        handleClose();
        app_setBottomTabVisible(true);
      } else {
        app_setBottomTabVisible(false);
      }
    },
    [openBottomSheet],
  );

  const onPressCloseButton = useCallback(() => {
    ref.current?.close(animationConfig);
  }, [ref?.current, bottomTabVisible, openBottomSheet]);

  const onSubmitSuccess = useCallback(() => {
    setIsSubmitSuccess(true);
    ref.current?.snapToIndex(0, animationConfig);
  }, [ref?.current, bottomTabVisible, openBottomSheet, isSubmitSuccess]);

  const onPressFinish = useCallback(() => {
    setIsSubmitSuccess(false);
    ref.current?.close(animationConfig);
    feedback_setHasSubmittedFeedback(true);
    app_setBottomTabVisible(true);
  }, [ref?.current, bottomTabVisible, openBottomSheet, isSubmitSuccess]);

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      snapPoints={SNAP_POINTS}
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
      <View
        style={{
          zIndex: 10,
          top: 0,
          right: createSpacing(4),
          position: 'absolute',
          alignSelf: 'flex-end',
        }}>
        <IconButton size='large' onPress={onPressCloseButton} icon='close' iconType='ionicons' />
      </View>
      <BottomSheetScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.content}>
        {isSubmitSuccess ? (
          <View style={styles.feedbackSubmitted}>
            <View style={StyleSheet.flatten([styles.boxIcon, { backgroundColor: theme.palette.success.main }])}>
              <MaterialCommunityIcon name='send-check' size={32} style={{ color: theme.palette.success.light }} />
            </View>
            <Typography
              variant='h3'
              fontWeight='bold'
              gutterBottom={2}
              color='text.secondary'
              style={{ textAlign: 'center' }}>
              Thank you!
            </Typography>
            <Typography gutterBottom={1} color='text.secondary' style={{ textAlign: 'center' }}>
              We love hearing from you!
            </Typography>
            <Typography gutterBottom={5} color='text.secondary' style={{ textAlign: 'center' }}>
              Thank you for leaving feedback for us.
            </Typography>
            <View style={{ marginBottom: createSpacing(3), width: 180 }}>
              <Button onPress={onPressFinish} title='Done' size='large' rounded color='primary' variant='contained' />
            </View>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialCommunityIcon
                name='message-badge'
                size={26}
                style={{ marginRight: createSpacing(2), color: theme.palette.success.main }}
              />
              <Typography variant='h2' fontWeight='bold' gutterBottom>
                Feedback
              </Typography>
            </View>
            <Typography variant='h5' gutterBottom={4} color='text.secondary'>
              I would love to hear you thoughts and ideas on how I can improve your experience
            </Typography>
            <Divider />
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: createSpacing(8),
    paddingTop: createSpacing(3),
    marginBottom: createSpacing(3),
  },
  boxIcon: {
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: createSpacing(3),
  },
  feedbackSubmitted: {
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
});

export default memo(BottomSheetPhraseDetail);
