import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {Size, useCommonStyle} from '~styles';
import {Colors} from '~styles/colors';

interface ILoadingProps {
  visible: boolean;
  size?: 'large' | 'small';
  color?: string;
}

const Loading = (props: ILoadingProps) => {
  const {visible, size} = props;
  const {CommonStyles} = useCommonStyle();
  return visible ? (
    <View style={CommonStyles.containerCenter}>
      <View style={[CommonStyles.innerCenter, styles.ld_container]}>
        <ActivityIndicator size={size ?? 'large'} color={Colors.BLACK} />
      </View>
    </View>
  ) : null;
};

export {Loading};

const styles = StyleSheet.create({
  ld_container: {
    width: 65,
    height: 65,
    backgroundColor: Colors.WHITE,
    borderRadius: Size.borderRadius8,
  },
});
