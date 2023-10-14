import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  ACCOUNT_SCREEN_TAB,
  HOME_SCREEN_TAB,
  MAIN_SCREEN,
  MANAGEMENT_SCREEN_TAB,
} from '~constants/screenKeys';

export type MainParamsList = {
  [MAIN_SCREEN]: {};
  // SETTING_SCREEN: {
  //   fromProfile?: boolean;
  // };
};

export type TabParamsList = {
  [HOME_SCREEN_TAB]: {};
  [ACCOUNT_SCREEN_TAB]: {};
  [MANAGEMENT_SCREEN_TAB]: {};
};

export type MainNavProps<T extends keyof MainParamsList> = {
  navigation: NativeStackNavigationProp<MainParamsList, T>;
  route: RouteProp<MainParamsList, T>;
};

export type MainTabProps<T extends keyof TabParamsList> = {
  navigation: BottomTabNavigationProp<TabParamsList, T>;
  route: RouteProp<TabParamsList, T>;
};

export interface PropsTabBar {
  focused: boolean;
  color: string;
  size: number;
}
