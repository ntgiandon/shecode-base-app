import React from 'react';
import {Modal, StyleSheet, Pressable, View} from 'react-native';
import {Colors} from '~styles/colors';
import {MyButton, MyText} from '~components';
import {Size, useCommonStyle} from '~styles';

interface IErrorModalProps {
  showTitle?: boolean;
  title?: string;
  message?: string;
  modalVisible: boolean;
  onClose: () => void;
}
const ErrorModal = (props: IErrorModalProps) => {
  const {modalVisible, onClose, message, title, showTitle = true} = props;
  const {CommonStyles} = useCommonStyle();

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={CommonStyles.containerCenter}>
        <View
          style={[
            CommonStyles.shadow,
            CommonStyles.innerCenter,
            styles.errModal_container,
          ]}>
          {showTitle && (
            <View style={{}}>
              <MyText
                textAllCap
                fontstyles="large|bold"
                color={Colors.PRIMARY}
                style={styles.errModal_text}
                content={title ?? 'ERROR'}
              />
            </View>
          )}
          <View style={styles.errModal_titleContainer}>
            <MyText style={styles.errModal_text} content={message} />
          </View>
          <MyButton
            fontstyles="regular|normal"
            backgroundColor={Colors.ERROR}
            styleTitle={{color: Colors.WHITE}}
            onpress={onClose}
            title="Close"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errModal_container: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: Size.borderRadius10,
    paddingVertical: Size.size20,
  },
  errModal_titleContainer: {
    marginVertical: Size.size20,
  },
  errModal_text: {
    textAlign: 'center',
  },
});

export {ErrorModal};
