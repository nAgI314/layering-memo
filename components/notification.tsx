import React from 'react';
import { View, Button, Alert } from 'react-native';
import notifee from '@notifee/react-native';

export function Screen() {
  async function onDisplayNotification() {
    console.log(" tuuti ");
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: '通知テスト',
      body: 'メモ：買い物',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
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