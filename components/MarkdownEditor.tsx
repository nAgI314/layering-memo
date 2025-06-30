import React, { useRef, useState } from 'react';

import { Pressable, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const MarkdownEditor = ({ value, onChangeText }: Props) => {
  const [showPreview, setShowPreview] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={{ flex: 1 }}>
      {!showPreview ? (
        <TextInput
          ref={textInputRef}
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            textAlignVertical: 'top',
          }}
          multiline
          value={value}
          onChangeText={onChangeText}
          onBlur={() => setShowPreview(true)}
          placeholder="入力してください"
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Markdown>{value || '*プレビューする内容がありません。*'}</Markdown>
          </View>
          <Pressable
            onPress={() => {
              setShowPreview(false);
              setTimeout(() => {
                textInputRef.current?.focus();
              }, 0);
            }}
            style={{ marginLeft: 8 }} 
          >
            <Icon name="edit" size={23} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MarkdownEditor;
