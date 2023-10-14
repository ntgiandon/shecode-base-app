// import {useTheme} from '@react-navigation/native';
// import React, {useMemo} from 'react';
// import {StyleSheet, Image, TextStyle} from 'react-native';
// import {useCommonStyle} from '~styles';

// interface Props {
//   style?: TextStyle;
//   content?: string;
//   color?: string;
//   numberOfLines?: number;
//   textAllCap?: boolean;
//   fontstyles?: FontStyle;
//   ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
//   children?: React.ReactNode;
// }

// const MyText: React.FC<Props> = (props: Props) => {
//   const {
//     style,
//     content,
//     color,
//     numberOfLines,
//     fontstyles,
//     ellipsizeMode,
//     children,
//     textAllCap,
//   } = props;

//   const {CommonStyles} = useCommonStyle();
//   const {colors} = useTheme();

//   return (
//     <Image
//       style={styles.tinyLogo}
//       source={{
//         uri: 'https://reactnative.dev/img/tiny_logo.png',
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   mimg_container: {
//     fontStyle: 'normal',
//     fontWeight: '400',
//   },
// });

// export {MyText};
