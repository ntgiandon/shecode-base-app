import * as React from 'react';
import {View} from 'react-native';
import {MyText} from '~components';

export const AccountScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MyText content="AccountScreen" />
    </View>
  );
};
