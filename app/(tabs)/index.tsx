import { MemoPage } from '@/components/MemoPage';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {

  return (
    <View >
      <Stack.Screen options={{ title: 'メモ' }} />
      {/* <MemoStructure/> */}
      <MemoPage/>
      
    </View>
  );
}