import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import MainNavigation from '~navigations';
import {MyDarkTheme, MyLightTheme} from '~styles/theme';
import {useColorScheme} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useFirebaseToken} from '~hooks';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction, input} = detail;

  await notifee.setNotificationCategories([
    {
      id: 'message',
      actions: [
        {
          id: 'reply',
          title: 'Reply',
          input: {
            placeholderText: 'Send a message...',
            buttonText: 'Send Now',
          },
        },
      ],
    },
  ]);

  if (type === EventType.ACTION_PRESS && pressAction?.id === 'reply') {
    // do somthing
  }
});

async function onDisplayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'custom-sound',
    name:
      remoteMessage.notification?.android?.channelId ??
      'pvlinh-default-channel',
    sound: remoteMessage.notification?.android?.sound,
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      sound: remoteMessage.notification?.android?.sound,
    },
    ios: {
      attachments: [
        {
          // Remote image
          url:
            remoteMessage.notification?.image ??
            'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/335062106_1255394398384615_3233469215944460401_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IvgGWxti_qsAX9QMZPg&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBzJuptL6TYvYlsJ1C343AwCEsDtM4gkmfBAVIHeJSTJQ&oe=642DF071',
        },
      ],
    },
  });
}

const Stack = createNativeStackNavigator();
function AppContainer() {
  const scheme = useColorScheme();
  const {getToken} = useFirebaseToken();

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => {})
      .catch(console.error);
  }, []);

  useEffect(() => {
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('onMessage', remoteMessage);
      onDisplayNotification(remoteMessage);
      notifee.getBadgeCount().then(count => {
        console.log('Current badge count: ', count);
        notifee
          .setBadgeCount(count + 1)
          .then(() => console.log('Badge count set!'));
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
