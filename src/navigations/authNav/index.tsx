import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN_SCREEN} from '~constants/screenKeys';
import SigninScreen from '~scenes/signin';

const Stack = createNativeStackNavigator();

const authScreen = [
  {
    name: LOGIN_SCREEN,
    component: SigninScreen,
  },
];

const AuthScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        animation: 'none',
        headerShown: false,
      }}>
      {authScreen.map((item, key) => (
        <Stack.Screen key={key} name={item.name} component={item.component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthScreens;
