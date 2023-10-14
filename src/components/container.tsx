import {
  AppState,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import React, {ReactNode, useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '~hooks';
import {shallowEqual} from 'react-redux';
import {Size, useCommonStyle} from '~styles';
import {
  errorClear,
  updateAppState,
  updateNetInfo,
} from '~redux/modules/app/appInfo/slice';
import {Colors} from '~styles/colors';
import {MyText, Loading, ErrorModal} from '~components';

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

interface Props {
  children?: ReactNode;
}

const Container = (props: Props) => {
  const {children} = props;
  const dispatch = useAppDispatch();
  const netInfo = useAppSelector(state => state.AppSlice.netInfo, shallowEqual);
  const loading = useAppSelector(state => state.AppSlice.loading, shallowEqual);
  const ownLoading = useAppSelector(
    state => state.AppSlice.ownLoading,
    shallowEqual,
  );
  const errorState = useAppSelector(
    state => state.AppSlice.error,
    shallowEqual,
  );
  const {CommonStyles} = useCommonStyle();
  const scheme = useColorScheme();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state?.isConnected) {
        dispatch(
          updateNetInfo({
            isLostConnection: true,
            isWifi: state.type.includes('wifi'),
          }),
        );
      } else {
        dispatch(
          updateNetInfo({
            isLostConnection: false,
            isWifi: state.type.includes('wifi'),
          }),
        );
      }
    });

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      dispatch(
        updateAppState({
          state: nextAppState,
        }),
      );
    });

    return () => {
      subscription.remove();
      unsubscribe();
    };
  }, []);

  const renderLostConnecttion = () => {
    if (!netInfo.isLostConnection) {
      return (
        <>
          <SafeAreaView style={[CommonStyles.errorStyle]} />
          <View
            style={[CommonStyles.errorStyle, styles.containerLostConnection]}>
            <MyText
              style={CommonStyles.textOwnSmall}
              content="Network unavailable"
            />
          </View>
        </>
      );
    }
  };

  const onCloseError = () => {
    dispatch(errorClear());
  };

  const getLoading = (): boolean => {
    if (ownLoading) {
      return true;
    } else if (loading) {
      return true;
    } else return false;
  };

  const getStatusBarColor = (): string => {
    return !netInfo.isLostConnection ? Colors.ERROR : 'transparent';
  };

  const getBarStyle = () => {
    return scheme === 'dark' ? STYLES[0] : STYLES[1];
  };

  return (
    <View style={[CommonStyles.container]}>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        animated={true}
        barStyle={getBarStyle()}
        showHideTransition={TRANSITIONS[0]}
      />
      {renderLostConnecttion()}
      {children}
      <Loading visible={getLoading()} />
      <ErrorModal
        message={errorState?.message}
        modalVisible={!!errorState}
        onClose={onCloseError}
      />
    </View>
  );
};

export default React.memo(Container);

const styles = StyleSheet.create({
  containerLostConnection: {
    paddingVertical: Size.size8,
    textAlign: 'center',
    alignItems: 'center',
  },
});
