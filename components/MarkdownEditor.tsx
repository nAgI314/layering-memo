import React, { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const MarkdownEditor = () => {
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16 }}>プレビュー表示</Text>
        <Switch
          value={showPreview}
          onValueChange={() => setShowPreview(prev => !prev)}
          style={{ marginLeft: 8 }}
        />
      </View>

      {!showPreview ? (
        <TextInput
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            textAlignVertical: 'top'
          }}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Markdown形式で入力してください"
        />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Markdown>{text || '*プレビューする内容がありません。*'}</Markdown>
        </ScrollView>
      )}
    </View>
  );
};

export default MarkdownEditor;
