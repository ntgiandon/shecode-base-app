import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ACCOUNT_SCREEN} from '~constants/screenKeys';
import {AccountParamsList} from '~navigations/appNav/accountTab/type';
import {AccountScreen} from '~scenes/account';

const AccountStack = createNativeStackNavigator<AccountParamsList>();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{gestureEnabled: false, headerShown: false, title: ''}}>
      <AccountStack.Screen name={ACCOUNT_SCREEN} component={AccountScreen} />
    </AccountStack.Navigator>
  );
};
export default AccountStackScreen;
