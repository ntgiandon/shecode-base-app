import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainParamsList, TabParamsList} from '../type';
import {
  ACCOUNT_SCREEN_TAB,
  HOME_SCREEN_TAB,
  MAIN_SCREEN,
  MANAGEMENT_SCREEN_TAB,
} from '~constants/screenKeys';
import HomeStackScreen from '~navigations/appNav/homeTab';
import ManagementStackScreen from '~navigations/appNav/managementTab';
import AccountStackScreen from '~navigations/appNav/accountTab';

const Stack = createNativeStackNavigator<MainParamsList>();
const Tab = createBottomTabNavigator<TabParamsList>();

const HomeTabs = () => {
  const badge = 2;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarStyle: {
        //   paddingTop: checkPlatform<number>(0, Size.size10),
        //   height: checkPlatform<number>(Size.size56, Size.size80),
        // },
        // tabBarBadgeStyle: {
        //   marginTop: checkPlatform<number>(0, -Size.size5),
        //   backgroundColor: Colors.PRIMARY,
        // },
        // tabBarHideOnKeyboard: true,
        // title: '',
        // tabBarActiveTintColor: Colors.PRIMARY,
        // tabBarInactiveTintColor: Colors.TEXT_NORMAL,
      }}>
      <Tab.Screen
        name={MANAGEMENT_SCREEN_TAB}
        component={ManagementStackScreen}
        // options={{
        //   tabBarIcon: props => <TabBarIconDiscover {...props} />,
        // }}
      />
      <Tab.Screen
        name={HOME_SCREEN_TAB}
        component={HomeStackScreen}
        // options={{
        //   tabBarIcon: props => <TabBarIconHome {...props} />,
        // }}
      />
      <Tab.Screen
        name={ACCOUNT_SCREEN_TAB}
        component={AccountStackScreen}
        // options={{
        //   tabBarIcon: props => <TabBarIconProfile />,
        //   tabBarBadge: badge > 0 ? badge : undefined,
        // }}
      />
    </Tab.Navigator>
  );
};

const AppsScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        animation: 'none',
        headerShown: false,
      }}>
      <Stack.Screen name={MAIN_SCREEN} component={HomeTabs} />
    </Stack.Navigator>
  );
};

export default AppsScreens;
