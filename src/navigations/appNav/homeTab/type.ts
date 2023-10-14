import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HOME_SCREEN} from '~constants/screenKeys';

export type HomeParamsList = {
  [HOME_SCREEN]: {};
};

export type HomeNavProps<T extends keyof HomeParamsList> = {
  navigation: NativeStackNavigationProp<HomeParamsList, T>;
  route: RouteProp<HomeParamsList, T>;
};
