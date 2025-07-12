// import * as Notifications from 'expo-notifications';
// import React from 'react';
// import { Button, Platform, StyleSheet, View } from 'react-native';

// // 通知ハンドラーの設定（通知を受信したときの動作）
// // 新しいプロパティ shouldShowBanner と shouldShowList を追加
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// async function scheduleLocalNotification() {
//   // Androidの場合、通知チャネルの設定は必須
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   // 通知をスケジュール
//   await Notifications.scheduleNotificationAsync({
//   content: {
//     title: 'ローカル通知のテスト',
//     body: 'これはローカルで送信された通知です！',
//     data: { someData: 'goes here' },
//   },
//   trigger: {
//     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // このように修正
//     seconds: 5,
//   },
// });
// }

// export default function NotificationConponent() {
//   return (
//     <View style={styles.container}>
//       <Button
//         title="5秒後にローカル通知を送信"
//         onPress={scheduleLocalNotification}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });