import {Platform} from 'react-native';
import Config from 'react-native-config';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const checkPlatform = <Type,>(android: Type, ios: Type): Type => {
  return Platform.OS === 'android' ? android : ios;
};

const getVersionName = () => {
  return checkPlatform<string>(
    String(Config.VERSION_NAME),
    String(Config.IOS_VERSION_NAME),
  );
};

const getBaseUrl = (): string => {
  return String(Config.API_URL);
};

const getGoogleMapKey = (): string => {
  return checkPlatform<string>(
    String(Config.GOOGLE_MAP_KEY_ANDROID),
    String(Config.GOOGLE_MAP_KEY_IOS),
  );
};

const getAppId = (): string => {
  return String(Config.APP_ID);
};
export {
  wait,
  checkPlatform,
  getVersionName,
  getBaseUrl,
  getAppId,
  getGoogleMapKey,
};
