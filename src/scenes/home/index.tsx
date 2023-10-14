import * as React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import {shallowEqual} from 'react-redux';
import {MyText} from '~components';
import {useAppDispatch, useAppSelector} from '~hooks';
import {updateUserRequest} from '~redux/modules/app/account/slice';
import {signOutRequest} from '~redux/modules/auth/slice';
import {useCommonStyle} from '~styles';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    state => state.AuthSlice.currentUser,
    shallowEqual,
  );
  const appStateIsReady = useAppSelector(
    state => state.AppSlice.appState,
    shallowEqual,
  );

  const {CommonStyles} = useCommonStyle();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MyText
        children={
          <MyText
            color="red"
            content={`${appStateIsReady?.state.toString()}`}
          />
        }
        content={`app state: `}
      />
      <MyText content={currentUser?.name} />
      <MyText content={`current env: ${Config.ENV}`} />

      <TouchableOpacity
        onPress={() => {
          dispatch(signOutRequest({id: '1998'}));
        }}>
        <MyText content="Log out" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(
            updateUserRequest({
              id: '1998',
              name: 'hihi' + new Date().getMilliseconds(),
            }),
          );
        }}>
        <MyText content="update user" />
      </TouchableOpacity>

      <MyText content="this is my text" fontstyles="large" color="red" />
      <MyText content="this is my text" fontstyles="medium" color="red" />
      <MyText content="this is my text" fontstyles="regular" color="red" />
      <MyText content="this is my text" fontstyles="small" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  centerView: {
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
