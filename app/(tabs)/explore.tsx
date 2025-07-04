import { MemoStructure } from '@/components/MemoStructure';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={{ padding: 30 }}>
      <Stack.Screen options={{ title: 'グラフ' }} />
      <MemoStructure />
    </View>
  );
}
