import {AppStateStatus} from 'react-native';
export interface IMNetInfoPayload {
  isLostConnection: boolean;
  isWifi?: boolean;
}
export interface IMDarkModePayload {
  isDark: boolean;
}
export interface IMAppStatePayload {
  // isReady: boolean;
  state: AppStateStatus;
}

export interface IMLoadingPayload {
  isEnable?: boolean;
}
