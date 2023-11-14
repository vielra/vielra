import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

// components
import { Button, Divider, IconButton, Ionicons, Typography } from '@/components/core';
import BottomSheet, { BottomSheetBackdropProps, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { bottomSheetStyles } from '@/components/shared/bottom-sheet/bottom-sheet.styles';

// helpers / utils
import { screenUtils } from '@/modules/app/utilities';
import { createSpacing } from '@/modules/theme/utilities';

// assets
import { Assets } from '@/assets';

// hooks
import { useTheme } from '@/modules/theme/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '@/plugins/redux';
import { themeConfig } from '@/modules/theme/configs';
import { BottomSheetBackdrop } from '@/components/shared';
import { usePhrasebook } from '@/modules/phrasebook/hooks';
import { AppLanguageCode } from '@/modules/app/interfaces';
// config

const animationConfig = {
  duration: 200,
  overshootClamping: false,
};

const BottomSheetPhraseDetail = () => {
  const ref = useRef<BottomSheet>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const SNAP_POINTS = useMemo(() => [340, 500, screenUtils.height + insets.top], []);
  const {
    snapIndexBottomSheetDetail,
    phrasebook_setSnapIndexBottomSheetDetail,
    bottomSheetDetailData: data,
  } = usePhrasebook();

  const onBottomSheetChange = useCallback(
    (currentIndex: number) => {
      dispatch(phrasebook_setSnapIndexBottomSheetDetail(currentIndex));
    },
    [snapIndexBottomSheetDetail],
  );

  const onPressCloseButton = useCallback(() => {
    // ref.current?.close(animationConfig);
    dispatch(phrasebook_setSnapIndexBottomSheetDetail(-1));
    ref?.current?.close();
  }, [ref?.current, snapIndexBottomSheetDetail]);

  const onPressFinish = useCallback(() => {
    setIsSubmitSuccess(false);
    // ref.current?.close(animationConfig);
    // feedback_setHasSubmittedFeedback(true);
  }, [ref?.current, snapIndexBottomSheetDetail, isSubmitSuccess]);

  const renderIconFlag = (lang: AppLanguageCode) => {
    let flag;
    switch (lang) {
      case 'vi':
        flag = Assets.flagVN_xs;
        break;
      case 'en':
        flag = Assets.flagUS_xs;
        break;
      case 'id':
        flag = Assets.flagID_xs;
        break;
      default:
        flag = undefined;
        break;
    }

    return <Image source={flag} style={styles.phrase_iconFlag} />;
  };

  // backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => <BottomSheetBackdrop {...backdropProps} pressBehavior='close' />,
    [],
  );

  return (
    <BottomSheet
      animationConfigs={animationConfig}
      ref={ref}
      index={snapIndexBottomSheetDetail}
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
      {data && (
        <BottomSheetScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.content}>
          {isSubmitSuccess ? (
            <View style={styles.feedbackSubmitted}>
              <View style={StyleSheet.flatten([styles.boxIcon, { backgroundColor: theme.palette.success.main }])}>
                <Ionicons name='bookmarks' size={20} />
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
            <View style={styles.contentContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: createSpacing(5) }}>
                <Ionicons
                  name='bookmarks'
                  size={20}
                  style={{ marginRight: createSpacing(2), color: theme.palette.success.main }}
                />
                <Typography variant='h4' fontWeight='bold' gutterBottom>
                  Phrase
                </Typography>
              </View>
              {data && (
                <View style={{}}>
                  <View style={StyleSheet.flatten([styles.phraseTextContainer])}>
                    {renderIconFlag('vi')}
                    <Typography style={StyleSheet.flatten([styles.phraseText, styles.phraseTextPrimary])}>
                      {data.text.vi}
                    </Typography>
                  </View>
                  <Divider style={{ marginVertical: 10 }} />
                  <View style={styles.phraseTextContainer}>
                    {renderIconFlag('id')}
                    <Typography style={StyleSheet.flatten([styles.phraseText])}>{data.text.id}</Typography>
                  </View>
                  <Divider style={{ marginVertical: 10 }} />
                  <View style={styles.phraseTextContainer}>
                    {renderIconFlag('en')}
                    <Typography style={StyleSheet.flatten([styles.phraseText])}>{data.text.en}</Typography>
                  </View>
                </View>
              )}
              <Typography variant='h5' gutterBottom={4} color='text.secondary'>
                I would love to hear you thoughts and ideas on how I can improve your experience
              </Typography>
              <Divider />
            </View>
          )}
        </BottomSheetScrollView>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: createSpacing(3),
    marginBottom: createSpacing(3),
  },
  contentContainer: {
    paddingHorizontal: createSpacing(8),
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
  phraseTextPrimary: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
  phraseText: {
    fontSize: 16,
    lineHeight: 22,
  },
  phraseTextContainer: {
    flexDirection: 'row',
    width: screenUtils.width - 100,
  },
  phrase_iconFlag: {
    height: 20,
    width: 20,
    marginRight: createSpacing(4),
    marginTop: 6,
  },
  hiddenFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: createSpacing(2),
    marginTop: createSpacing(2),
  },
  hiddenFooterLeftContent: {},
  hiddenFooterRightContent: {
    marginLeft: 'auto',
  },
});

export default memo(BottomSheetPhraseDetail);
