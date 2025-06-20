import { MemoPage } from '@/components/Memo';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {

  return (
    <View style={{ padding: 30 }}>
      <Stack.Screen options={{ title: 'ホーム' }} />
      <Text>ホーム</Text>
      {/* <MemoStructure/> */}
      <MemoPage/>
      
    </View>
  );
}