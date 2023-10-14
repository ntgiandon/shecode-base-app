import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MANAGEMENT_SCREEN} from '~constants/screenKeys';
import {ManagementParamsList} from '~navigations/appNav/managementTab/type';
import {ManagementScreen} from '~scenes/management';

const ManagementStack = createNativeStackNavigator<ManagementParamsList>();

const ManagementStackScreen = () => {
  return (
    <ManagementStack.Navigator
      screenOptions={{gestureEnabled: false, headerShown: false, title: ''}}>
      <ManagementStack.Screen
        name={MANAGEMENT_SCREEN}
        component={ManagementScreen}
      />
    </ManagementStack.Navigator>
  );
};
export default ManagementStackScreen;
