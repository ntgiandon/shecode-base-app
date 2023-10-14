import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import codePush from 'react-native-code-push';
import {MyText} from '~components/myText';

class CodePushManager extends Component {
  overlayWidth = Dimensions.get('window').width - 40;

  state = {
    stat: 0,
    downloadProgress: 0,
  };

  codePushStatusDidChange(status: codePush.SyncStatus) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({stat: 1});
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        this.setState({stat: 2});
        setTimeout(() => {
          codePush.restartApp();
        }, 2000);
        break;
    }
  }

  codePushDownloadDidProgress(progress: any) {
    this.setState({
      downloadProgress: Math.floor(
        (progress.receivedBytes / progress.totalBytes) * 100,
      ),
    });
  }

  render() {
    const {stat, downloadProgress} = this.state;

    return (
      <Modal
        transparent
        animationType={'slide'}
        visible={stat > 0}
        onDismiss={() => this.setState({stat: 0})}>
        <View style={styles.overlay}>
          <View style={styles.wrapper}>
            {stat === 1 ? (
              <View style={[styles.progressOuter, {width: this.overlayWidth}]}>
                <View
                  style={[styles.progress, {width: downloadProgress + '%'}]}
                />
              </View>
            ) : (
              <View style={styles.uploadedText}>
                <MyText
                  style={styles.text}
                  content="Downloaded, restarting..."
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  progressOuter: {
    height: 5,
    backgroundColor: 'lightgray',
  },
  progress: {
    height: 5,
    backgroundColor: 'purple',
  },
  uploadedText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default codePush({
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: {
    title: 'Baseapp have new update!',
    optionalIgnoreButtonLabel: 'Later',
    optionalInstallButtonLabel: 'Update',
    optionalUpdateMessage: 'Do you want to update?',
  },
})(CodePushManager);
