import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

// React Navigation
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Bottom sheet
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Icons
import { Ionicons, MaterialIcons } from '@/components/icons';

// Core components
import { Typography } from '@/components/core';

// Utils
import { createSpacing } from '@/modules/theme/utils';
import { useTheme } from '@/modules/theme/hooks';
import { isIOS } from '@/utils';

// Constants
import { RoutesConstant } from '@/constants';

// Hooks
import { useAuth } from '@/modules/auth/hooks';

// Assets
import { AvatarSample } from '@/assets';

// Theme config.
import * as themeConfig from '@/modules/theme/config';

// Screen and Stacks.
import { HomeScreen } from '@/modules/home/screens';
import { PhraseCategoryScreen } from '@/modules/phrasebook/screens';
import { ProfileScreen } from '@/modules/profile/screens';
import { ChatStackNavigator } from '@/modules/chat/navigators';

export interface IBottomTabParamList extends Record<string, object | undefined> {
  HomeScreen: undefined;
  Phrasebook: undefined;
  Profile: undefined;
  ChatStack: undefined;
}

const TabStack = createBottomTabNavigator<IBottomTabParamList>();

const AddOnTabItemWidth = 80;

export const BottomTabNavigator: FC = () => {
  const theme = useTheme();

  const { isLoggedIn } = useAuth();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [240], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number): void => {
    // console.log('handleSheetChanges', index);
    null;
  }, []);

  const handleOpenBottomSheet = (): void => {
    bottomSheetRef.current?.expand();
  };

  const renderCustomTab = ({ state, descriptors, navigation }: BottomTabBarProps): ReactNode => {
    return (
      <View style={StyleSheet.flatten([styles.customTab_root, { backgroundColor: theme.palette.background.paper }])}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          let icon = null;
          const size = 24;
          switch (route.name) {
            case RoutesConstant.BottomTab.HomeScreen:
              icon = (
                <Ionicons
                  name={isFocused ? 'ios-home' : 'ios-home-outline'}
                  size={size}
                  color={isFocused ? theme.palette.primary.main : theme.palette.text.disabled}
                />
              );
              break;
            case RoutesConstant.BottomTab.ChatStack:
              icon = (
                <Ionicons
                  name={isFocused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                  size={size}
                  color={isFocused ? theme.palette.primary.main : theme.palette.text.disabled}
                />
              );
              break;
            case RoutesConstant.BottomTab.Profile:
              icon = (
                <Ionicons
                  name={isFocused ? 'person-circle' : 'person-circle-outline'}
                  size={size}
                  color={isFocused ? theme.palette.primary.main : theme.palette.text.disabled}
                />
              );
              break;

            default:
              icon = (
                <Ionicons
                  name={isFocused ? 'ios-book' : 'ios-book-outline'}
                  size={size}
                  color={isFocused ? theme.palette.primary.main : theme.palette.text.disabled}
                />
              );
              break;
          }

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true } as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.customTab_item}>
              {route.name === RoutesConstant.BottomTab.Profile ? (
                isLoggedIn ? (
                  <Image source={AvatarSample} style={styles.customTab_itemProfileImage} />
                ) : (
                  icon
                )
              ) : (
                icon
              )}

              <Typography
                variant="subtitle2"
                style={{
                  color: isFocused ? theme.palette.primary.main : theme.palette.text.disabled,
                  marginTop: createSpacing(0.5),
                }}>
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}

        {/* Custom button tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenBottomSheet}
          style={StyleSheet.flatten([styles.customTab_addOnItem, { backgroundColor: theme.palette.primary.main }])}>
          <MaterialIcons name="add" size={32} color={theme.palette.primary.contrastText} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBackdropBottomSheet = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.25} pressBehavior="close" />
    ),
    [],
  );

  return (
    <>
      <TabStack.Navigator
        initialRouteName={RoutesConstant.BottomTab.HomeScreen}
        screenOptions={{ headerShown: false }}
        tabBar={renderCustomTab}>
        <TabStack.Screen
          options={{ tabBarLabel: 'Home' }}
          name={RoutesConstant.BottomTab.HomeScreen}
          component={HomeScreen}
        />
        <TabStack.Screen
          options={{ tabBarLabel: 'Phrase' }}
          name={RoutesConstant.BottomTab.Phrasebook}
          component={PhraseCategoryScreen}
        />
        <TabStack.Screen
          options={{ tabBarLabel: 'Chat' }}
          name={RoutesConstant.BottomTab.ChatStack}
          component={ChatStackNavigator}
        />
        <TabStack.Screen
          options={{ tabBarLabel: 'Profile' }}
          name={RoutesConstant.BottomTab.Profile}
          component={ProfileScreen}
        />
      </TabStack.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdropBottomSheet}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        // detached={true}
        style={styles.bottomSheet_root}
        backgroundStyle={StyleSheet.flatten([
          styles.bottomSheet_backgroundStyle,
          { backgroundColor: theme.palette.background.paper },
        ])}
        handleIndicatorStyle={StyleSheet.flatten([
          styles.bottomSheet_handleIndicatorStyle,
          { backgroundColor: theme.palette.divider },
        ])}
        onChange={handleSheetChanges}>
        <View style={styles.bottomSheet_content}>
          <Typography>Hi, i am bottom sheet 👋 </Typography>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  customTab_root: {
    flexDirection: 'row',
    paddingRight: AddOnTabItemWidth,
    paddingLeft: createSpacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  customTab_item: {
    flex: 1,
    alignItems: 'center',
    marginTop: createSpacing(2),
    marginBottom: isIOS ? createSpacing(6) : createSpacing(1),
  },
  customTab_itemProfileImage: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  customTab_addOnItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 48,
    borderTopLeftRadius: 48,
    height: '100%',
    width: AddOnTabItemWidth,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomSheet_root: {
    flex: 1,
  },
  bottomSheet_backgroundStyle: { borderRadius: themeConfig.shape.borderRadius * 3 },
  bottomSheet_handleIndicatorStyle: { height: 2, width: 32 },
  bottomSheet_content: {
    flex: 1,
    alignItems: 'center',
    marginTop: createSpacing(10),
  },
});
