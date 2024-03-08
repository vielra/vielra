import { memo, useCallback, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';

// hooks
import { useToast } from '@/modules/app/hooks';

// components
import { Button, IconButton, Typography } from '@/components/core';

// interfaces
// import { IUser } from '@/interfaces';

// helpers / utils
import { createSpacing } from '@/modules/theme/utilities';
import { useAuth } from '@/modules/auth/hooks';

// rn image picker
import { launchImageLibrary } from 'react-native-image-picker';

// firebase
// UNCOMMENT THIS LINE IF RUNNING ON IOS
// import storage from '@react-native-firebase/storage';

// fast image
import FastImage from 'react-native-fast-image';
import { Assets } from '@/assets';
import { useAppDispatch } from '@/plugins/redux';
import { NavigationProps, navigate } from '@/navigators';
import { useNavigation } from '@react-navigation/native';

const AVATAR_SIZE = 132;

const ProfileInfo = (): JSX.Element => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const [uploadIsLoading, setUploadIsLoading] = useState(false);

  const { showToast } = useToast();

  const { user, auth_setOpenBottomConfirmSheetLogout, openBottomSheetConfirmLogout } = useAuth();
  // console.log('ProfileInfo', user);

  const onPressLogout = useCallback(() => {
    dispatch(auth_setOpenBottomConfirmSheetLogout(true));
  }, [openBottomSheetConfirmLogout]);

  const handleUpdateUserPhoto = async (photoURL: string | null): Promise<void> => {};

  const handleUploadPhoto = async (fileUri: string, fileName: string) => {
    setUploadIsLoading(true);
    const imageRef = storage().ref(`users/photos/${user?.uid}/${fileName}`);
    await imageRef.putFile(fileUri, { contentType: 'image/jpg' }).catch((error) => {
      setUploadIsLoading(false);
      showToast({
        text1: 'Failed to upload profile picture.',
        variant: 'filled',
        position: 'top',
        type: 'error',
      });
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });

    if (url) {
      handleUpdateUserPhoto(url);
    } else {
      setUploadIsLoading(false);
      showToast({
        text1: 'Failed to upload profile picture.',
        variant: 'filled',
        position: 'top',
        type: 'error',
      });
    }
  };

  const onPressPicture = async (): Promise<void> => {
    if (!uploadIsLoading) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        includeExtra: true,
        presentationStyle: 'overFullScreen',
        selectionLimit: 1,
      });
      if (!result.didCancel && result?.assets?.[0]?.uri) {
        handleUploadPhoto(result.assets?.[0]?.uri, result.assets?.[0]?.fileName as string);
      } else {
        // user cancel picker image
      }
    }
  };

  const onRemoveProfilePic = (): void => {
    handleUpdateUserPhoto(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileHeader}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressPicture} style={styles.avatarContainer}>
          {user?.photo_url && (
            <IconButton
              variant='contained'
              color='error'
              icon='trash'
              iconSize={20}
              iconType='ionicons'
              style={styles.removeAvatarBtn}
              onPress={onRemoveProfilePic}
            />
          )}
          {uploadIsLoading && (
            <View style={styles.loadingUpload}>
              <ActivityIndicator size={24} />
            </View>
          )}
          <View style={styles.avatarImageContainer}>
            {user?.photo_url ? (
              <FastImage
                style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                defaultSource={Assets.avatarSquareBlueSm}
                source={{
                  uri: user?.photo_url as string,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Image source={Assets.avatarSquareBlueSm} style={styles.avatar} resizeMode='contain' />
            )}
          </View>
        </TouchableOpacity>
        <Typography color='text.secondary' gutterBottom style={{ textAlign: 'center' }}>
          Hi,
        </Typography>
        <Typography
          color='text.primary'
          fontWeight='bold'
          gutterBottom={3}
          variant='h3'
          style={{ textAlign: 'center' }}>
          {user?.name}
        </Typography>
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Button
          rounded
          onPress={() => navigation.navigate('phrase_favorite_screen')}
          title='Favorite Phrases'
          color='primary'
          variant='contained'
          startIcon='heart'
          iconType='ionicons'
          style={{ marginBottom: createSpacing(4) }}
        />
        <Button
          rounded
          onPress={onPressLogout}
          title='Log out'
          size='large'
          color='error'
          variant='text'
          startIcon='enter-outline'
          iconType='ionicons'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    height: AVATAR_SIZE + 6,
    width: AVATAR_SIZE + 6,
    borderRadius: AVATAR_SIZE + 6,
    position: 'relative',
    marginBottom: createSpacing(3),
  },
  avatarImageContainer: {
    height: AVATAR_SIZE + 6,
    width: AVATAR_SIZE + 6,
    borderRadius: AVATAR_SIZE + 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#ffffff',
  },

  removeAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  loadingUpload: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: AVATAR_SIZE,
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginBottom: createSpacing(5),
  },
});

export default memo(ProfileInfo);
