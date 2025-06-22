import { MemoPage } from '@/components/MemoPage';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {

  return (
    <View style={{ padding: 30 }}>
      <Stack.Screen options={{ title: 'メモ' }} />
      <Text>メモ</Text>
      {/* <MemoStructure/> */}
      <MemoPage/>
      
    </View>
  );
}