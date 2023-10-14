import React from 'react';
import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Size} from '~styles';
import {MyText} from '~components';
import {Colors} from '~styles/colors';

interface IButtonProps {
  style?: ViewStyle;
  styleTitle?: TextStyle;
  backgroundColor?: string;
  onpress?: () => void;
  onLongPress?: () => void;
  title?: string;
  fontstyles?: FontStyle;
}

const MyButton = (props: IButtonProps) => {
  const {
    onpress,
    onLongPress,
    title,
    style,
    styleTitle,
    backgroundColor,
    fontstyles,
  } = props;
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onpress}
      style={({pressed}) => [
        styles.mbtn_Container,
        {
          opacity: pressed ? 0.8 : 1,
          backgroundColor: backgroundColor ?? Colors.WHITE,
        },
        style,
      ]}>
      {({pressed}) => (
        <MyText
          fontstyles={fontstyles}
          style={styleTitle}
          content={pressed ? `${title}` : `${title}`}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mbtn_Container: {
    borderRadius: Size.borderRadius5,
    paddingHorizontal: Size.size30,
    paddingVertical: Size.size10,
    elevation: 2,
  },
});

export {MyButton};
