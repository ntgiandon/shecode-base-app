import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN} from '~constants/screenKeys';
import {HomeScreen} from '~scenes/home';
import {HomeParamsList} from '~navigations/appNav/homeTab/type';

const HomeStack = createNativeStackNavigator<HomeParamsList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{gestureEnabled: false, headerShown: false, title: ''}}>
      <HomeStack.Screen name={HOME_SCREEN} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;
