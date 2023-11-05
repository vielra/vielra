import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import { BottomTab } from '@/modules/app/components/bottom-tab';

// screens
import { PhraseCategoryScreen } from '@/modules/phrasebook/screens';
import { ProfileScreen } from '@/modules/profile/screens';
import { DashboardScreen } from '@/modules/dashboard/screens';

// interfaces
import { ScreenType } from './navigation.type';
import { ChatScreen } from '@/modules/chat/screens';

// screens list
export const BOTTOM_TAB_SCREENS: ScreenType[] = [
  {
    name: 'dashboard_screen',
    label: 'Dashboard',
    component: DashboardScreen,
  },
  {
    name: 'phrase_category_screen',
    label: 'Layouts',
    component: PhraseCategoryScreen,
  },
  {
    name: 'chat_screen',
    label: 'Chat',
    component: ChatScreen,
  },
  {
    name: 'profile_screen',
    label: 'Profile',
    component: ProfileScreen,
  },
];

const BottomTabStack = createBottomTabNavigator();

const BottomTabStackNavigator = (): JSX.Element | null => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <BottomTabStack.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTab {...props} />}>
      {BOTTOM_TAB_SCREENS.map((x) => {
        return <BottomTabStack.Screen key={x.name} component={x.component} name={x.name} />;
      })}
    </BottomTabStack.Navigator>
  );
};

export default BottomTabStackNavigator;
