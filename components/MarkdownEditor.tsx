import React, { useRef, useState } from 'react';

import { Pressable, ScrollView, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/AntDesign';

const MarkdownEditor = () => {
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  
  const switchToEditor = () => {

  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16 }}>プレビュー表示</Text>
        <Switch
          value={showPreview}
          onValueChange={() => setShowPreview(prev => !prev)}
          style={{ marginLeft: 8 }}
        />
      </View> */}

      {!showPreview ? (
        <TextInput
          ref={textInputRef}
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
          onBlur={() => setShowPreview(true)}
          placeholder="入力してください"
        />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Pressable onPress={() => {
            setShowPreview(false);
            setTimeout(() => {
                textInputRef.current?.focus();
            }, 0);}
          }>
            <Icon name="edit" size={20}/>
          </Pressable>
          <Markdown>{text || '*プレビューする内容がありません。*'}</Markdown>
        </ScrollView>
      )}
    </View>
  );
};

export default MarkdownEditor;
