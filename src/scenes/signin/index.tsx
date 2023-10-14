import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {shallowEqual} from 'react-redux';
import {MyText} from '~components';
import {useAppDispatch, useAppSelector} from '~hooks';
import {showOwnLoading} from '~redux/modules/app/appInfo/slice';
import {signInRequest} from '~redux/modules/auth/slice';

const SigninScreen = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.AppSlice.loading, shallowEqual);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MyText content="HomeScreen" />
      <MyText content={`current env: ${Config.ENV}`} />

      <TouchableOpacity
        disabled={loading}
        style={{padding: 20}}
        onPress={() => {
          dispatch(signInRequest({password: '123', userName: 'pvlinh02'}));
          dispatch(showOwnLoading());
        }}>
        <MyText content="Login" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //
});

export default React.memo(SigninScreen);
