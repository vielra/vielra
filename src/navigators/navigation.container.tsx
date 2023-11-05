import { NavigationContainer as NavContainer } from '@react-navigation/native';

// utils
import { navigationRef } from './navigation.util';

// root stack navigator
import RootStackNavigator from './root-stack.navigator';

// hooks
import { useTheme } from '@/modules/theme/hooks';

// navigation theme
import { darkTheme, lightTheme } from './navigation.theme';

interface Props extends Partial<React.ComponentProps<typeof NavContainer>> {}

const NavigationContainer = (props: Props) => {
  const { isDarkMode } = useTheme();
  return (
    <NavContainer {...props} ref={navigationRef} theme={isDarkMode ? darkTheme : lightTheme}>
      <RootStackNavigator />
    </NavContainer>
  );
};

export default NavigationContainer;
