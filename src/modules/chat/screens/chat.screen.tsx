import { View } from 'react-native';

// components
import { Button, Screen, Typography } from '@/components/core';

// hooks
import { useTheme } from '@/modules/theme/hooks';
import { useNavigation } from '@react-navigation/native';

// interfaces
import { NavigationProps } from '@/navigators';

const ChatScreen = (): JSX.Element => {
  const theme = useTheme();
  const nav = useNavigation<NavigationProps>();

  return (
    <Screen
      preset='fixed'
      statusBarStyle='light-content'
      backgroundColor={theme.palette.background.paper}
      style={{ paddingTop: 12, paddingHorizontal: theme.horizontalSpacing }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography color='text.disabled' style={{ textAlign: 'center' }} gutterBottom={2}>
          Chat Screen
        </Typography>
        <Button title='Go to settings' onPress={() => nav.navigate('settings_screen')} />
      </View>
    </Screen>
  );
};

export default ChatScreen;
