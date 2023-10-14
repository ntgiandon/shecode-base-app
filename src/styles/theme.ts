import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {Colors} from '~styles/colors';

const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    error: Colors.ERROR,
    success: Colors.SUCCESS,
  },
};

const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: '#000000',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    error: Colors.ERROR,
    success: Colors.SUCCESS,
  },
};

export {MyDarkTheme, MyLightTheme};
