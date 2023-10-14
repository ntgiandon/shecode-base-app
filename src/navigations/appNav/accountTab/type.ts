import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ACCOUNT_SCREEN} from '~constants/screenKeys';

export type AccountParamsList = {
  [ACCOUNT_SCREEN]: {};
};

export type AccountNavProps<T extends keyof AccountParamsList> = {
  navigation: NativeStackNavigationProp<AccountParamsList, T>;
  route: RouteProp<AccountParamsList, T>;
};
