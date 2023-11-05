import { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// hooks
import { useNavigation } from '@react-navigation/native';

// components
import { Button, Typography } from '@/components/core';

// assets

// interfaces
import { NavigationProps } from '@/navigators';

// helpers / utils
import { createSpacing } from '@/modules/theme/utilities';
import { Assets } from '@/assets';

const GuestInfo = (): JSX.Element => {
  const nav = useNavigation<NavigationProps>();

  const onPressLogin = useCallback(() => {
    nav.navigate('login_screen');
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileHeader}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={Assets.avatarSquareBlueSm} style={styles.avatar} resizeMode='contain' />
        </TouchableOpacity>
        <Typography color='text.primary' fontWeight='bold' gutterBottom variant='h2' style={{ textAlign: 'center' }}>
          Hi, Guest
        </Typography>
        <Typography color='text.secondary' style={{ textAlign: 'center', marginBottom: createSpacing(4) }}>
          You're not logged in
        </Typography>
      </View>
      <View style={{ width: 140, alignSelf: 'center' }}>
        <Button
          rounded
          onPress={onPressLogin}
          title='Login'
          size='extra-large'
          color='primary'
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
  avatar: {
    height: 132,
    width: 132,
    borderRadius: 132,
    marginBottom: createSpacing(5),
  },
});

export default GuestInfo;
