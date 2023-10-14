import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {useCommonStyle} from '~styles';

interface Props {
  style?: TextStyle;
  content?: string;
  color?: string;
  numberOfLines?: number;
  textAllCap?: boolean;
  fontstyles?: FontStyle;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  children?: React.ReactNode;
}

const MyText: React.FC<Props> = (props: Props) => {
  const {
    style,
    content,
    color,
    numberOfLines,
    fontstyles,
    ellipsizeMode,
    children,
    textAllCap,
  } = props;

  const {CommonStyles} = useCommonStyle();
  const {colors} = useTheme();

  const fontSize = (fontstyle: FontStyle): TextStyle => {
    const size = fontstyle?.split('|')[0];
    const style = fontstyle?.split('|')[1];

    switch (size) {
      case 'large':
        return {...CommonStyles.textLarge, ...fontStyle(style)};
      case 'medium':
        return {...CommonStyles.textMid, ...fontStyle(style)};
      case 'regular':
        return {...CommonStyles.textReg, ...fontStyle(style)};
      case 'small':
        return {...CommonStyles.textSmall, ...fontStyle(style)};
      default:
        return {...CommonStyles.textReg, ...fontStyle(style)};
    }
  };

  const fontStyle = (style: string): TextStyle => {
    switch (style) {
      case 'bold':
        return styles.mt_bold;
      case 'italic':
        return styles.mt_italic;
      case 'normal':
        return styles.mt_normal;
      default:
        return styles.mt_normal;
    }
  };

  const colorStyle = (): TextStyle => {
    return {color: color ?? colors.text};
  };

  const getText = useMemo(
    () => (textAllCap ? content?.toLocaleUpperCase() : content),
    [textAllCap, content],
  );

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={false}
      numberOfLines={numberOfLines ?? 1}
      style={[fontSize(fontstyles ?? 'regular|normal'), colorStyle(), style]}>
      {getText}
      <Text>{children}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  mt_normal: {
    fontStyle: 'normal',
    fontWeight: '400',
  },
  mt_bold: {
    fontWeight: '700',
  },
  mt_italic: {
    fontStyle: 'italic',
  },
});

export {MyText};
