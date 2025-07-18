import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';

type NoticeProps = {
  title: string;
  body: string;
};

export const Notice = ({title,body}:NoticeProps) => {
  async function onDisplayNotification() {
    console.log(" tuuti ");
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'memoChannelID',
      name: 'memoChannel',
    });

    // Display a notification
    await notifee.displayNotification({
      id: "memo",
      title: title,
      body: body,
      android: {
        ongoing: true, //ユーザーが消せない設定(android14でできなくなったらしい)
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // smallIcon: 'ic_launcher_round',
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        
      },
    });
  }

  return (
    <View>
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    </View>
  );
}