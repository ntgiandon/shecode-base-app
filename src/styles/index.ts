import {useTheme} from '@react-navigation/native';
import {Dimensions, PixelRatio, TextStyle, ViewStyle} from 'react-native';
import {checkPlatform} from '~utils';
import {Colors} from '~styles/colors';

interface ICommonStyle {
  shadow: ViewStyle;
  container: ViewStyle;
  containerCenter: ViewStyle;
  innerCenter: ViewStyle;
  textSmall: TextStyle;
  textReg: TextStyle;
  textMid: TextStyle;
  textLarge: TextStyle;
  textOwnSmall: TextStyle;
  textOwnReg: TextStyle;
  textOwnMid: TextStyle;
  textOwnLarge: TextStyle;
  headerStyle: ViewStyle;
  safeArea: ViewStyle;
  errorStyle: ViewStyle;
  successStyle: ViewStyle;
}

const scaleSize = (size: number) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const Font = {
  LINE_HEIGHT_24: scaleFont(24),
  LINE_HEIGHT_20: scaleFont(20),
  LINE_HEIGHT_16: scaleFont(16),

  FONT_SIZE_20: scaleFont(20),
  FONT_SIZE_16: scaleFont(16),
  FONT_SIZE_14: scaleFont(14),
  FONT_SIZE_12: scaleFont(12),

  FONT_WEIGHT_REGULAR: '400',
  FONT_WEIGHT_BOLD: '700',

  FONT_FAMILY_REGULAR: 'OpenSans-Regular',
  FONT_FAMILY_BOLD: 'OpenSans-Bold',
};

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 390;

const Size = {
  WINDOW_WIDTH: WINDOW_WIDTH,
  WINDOW_HEIGHT: WINDOW_HEIGHT,
  borderRadius5: 5,
  borderRadius8: 8,
  borderRadius10: 10,
  borderRadius12: 12,
  borderRadius15: 15,
  borderRadius50: 50,
  height_header_android: scaleSize(56),
  height_header_ios: scaleSize(44),
  sizeIcon: scaleSize(28),
  sizeIconMin: scaleSize(22),
  size2: scaleSize(2),
  size5: scaleSize(5),
  size8: scaleSize(8),
  size10: scaleSize(10),
  size12: scaleSize(12),
  size14: scaleSize(14),
  size16: scaleSize(16),
  size18: scaleSize(18),
  size20: scaleSize(20),
  size22: scaleSize(22),
  size24: scaleSize(24),
  size26: scaleSize(26),
  size28: scaleSize(28),
  size30: scaleSize(30),
  size32: scaleSize(32),
  size36: scaleSize(36),
  size40: scaleSize(40),
  size56: scaleSize(56),
  size60: scaleSize(60),
  size64: scaleSize(64),
  size80: scaleSize(80),
};

const useCommonStyle = () => {
  const {colors} = useTheme();

  const CommonStyles: ICommonStyle = {
    shadow: {
      shadowColor: Colors.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerCenter: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    innerCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSmall: {
      fontSize: Font.FONT_SIZE_12,
    },
    textReg: {
      fontSize: Font.FONT_SIZE_14,
    },
    textMid: {
      fontSize: Font.FONT_SIZE_16,
    },
    textLarge: {
      fontSize: Font.FONT_SIZE_20,
    },
    textOwnSmall: {
      fontSize: Font.FONT_SIZE_12,
      color: Colors.WHITE,
    },
    textOwnReg: {
      fontSize: Font.FONT_SIZE_14,
      color: Colors.WHITE,
    },
    textOwnMid: {
      fontSize: Font.FONT_SIZE_16,
      color: Colors.WHITE,
    },
    textOwnLarge: {
      fontSize: Font.FONT_SIZE_20,
      color: Colors.WHITE,
    },
    headerStyle: {
      height: checkPlatform<number>(
        Size.height_header_android,
        Size.height_header_ios,
      ),
      paddingHorizontal: Size.size16,
    },
    safeArea: {
      // backgroundColor: colors.background,
    },
    errorStyle: {
      backgroundColor: Colors.ERROR,
    },
    successStyle: {
      backgroundColor: Colors.SUCCESS,
    },
  };
  return {CommonStyles};
};

export {useCommonStyle, Font, Size, scaleFont, scaleSize};
