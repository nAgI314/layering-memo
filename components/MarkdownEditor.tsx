import React, { useRef } from 'react';

import { StyleSheet, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

type Props = {
  isPreview: boolean;
  onChangeIsPre: (isPreview: boolean) => void;
  value: string;
  onChangeText: (text: string) => void;
};

const MarkdownEditor = ({isPreview, onChangeIsPre, value, onChangeText }: Props) => {
  // const [showPreview, setShowPreview] = useState(isPreview);
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={{ flex: 1 }}>
      {!isPreview ? (
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
          keyboardType="default" 
          autoCapitalize="none"
          // onBlur={() => onChangeIsPre(true)} //focusが外れたらpreviewになるが、違うメモを編集しようと、違うメモをタップすると、previewになってしまってうざい
          importantForAutofill="yes"
          placeholder="入力してください"
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ flex: 1 }}>
            {value === "" ? 
              <Markdown style={styles}>{'###### *empty*'}</Markdown>  
            :
              <Markdown>{value}</Markdown> 
            }
          </View>
          {/* <Pressable
            onPress={() => {
              onChangeIsPre(false);
              setTimeout(() => {
                textInputRef.current?.focus();
              }, 0);
            }}
            style={{ marginLeft: 8 }} 
          >
            <Icon name="edit" size={23} />
          </Pressable> */}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  heading6: {
    color:"#7f7f7f",
    fontSize:11,
  },
});
export default MarkdownEditor;
