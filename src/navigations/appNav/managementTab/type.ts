import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MANAGEMENT_SCREEN} from '~constants/screenKeys';

export type ManagementParamsList = {
  [MANAGEMENT_SCREEN]: {};
};

export type ManagementNavProps<T extends keyof ManagementParamsList> = {
  navigation: NativeStackNavigationProp<ManagementParamsList, T>;
  route: RouteProp<ManagementParamsList, T>;
};
