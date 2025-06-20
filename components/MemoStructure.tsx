import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface MemoLayer { 
  contents : (MemoLayer | string )[],
  level : number,
}
// type j = j[] | string[]; 


export const MemoStructure = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      contents : [],
      level : 0,
    }
  );



  return(
  
   <MemoLayerComponent memo={memo} onUpdate={setMemo} />

  )
}

const MemoLayerComponent = ({ memo, onUpdate }: { memo: MemoLayer, onUpdate: (updated: MemoLayer) => void }) => {
  const handleTextChange = (index: number, text: string) => {
    const newContents = [...memo.contents];
    newContents[index] = text;
    onUpdate({ ...memo, contents: newContents });
  };

  const addMemo = () => {
    onUpdate({ ...memo, contents: [...memo.contents, ""] });
  };

  const addLayer = (index: number) => {
    const newLayer: MemoLayer = {
      contents: [],
      level: memo.level + 1,
    };
    const newContents = [...memo.contents];
    newContents.splice(index + 1, 0, newLayer);
    onUpdate({ ...memo, contents: newContents });
  };

  return (
    <View style={[styles.layer, { marginLeft: memo.level * 20 }]}>
      {memo.contents.map((item, index) => (
        <View key={index} style={styles.row}>
          {typeof item === 'string' ? (
            <>
              <TextInput
                value={item}
                onChangeText={(text: string) => handleTextChange(index, text)}
                style={styles.input}
                placeholder="メモを入力"
              />
              <Pressable onPress={() => addLayer(index)}>
                <Image
                  source={require('../assets/images/shovel-black-small.png')}
                  style={styles.image}
                />
              </Pressable>
            </>
          ) : (
            <MemoLayerComponent
              memo={item}
              onUpdate={(updatedChild) => {
                const newContents = [...memo.contents];
                newContents[index] = updatedChild;
                onUpdate({ ...memo, contents: newContents });
              }}
            />
          )}
        </View>
      ))}
      <Pressable onPress={addMemo} style={styles.addButton}>
        <Text style={styles.addButtonText}>メモを追加</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  layer: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    // color:"#fff"
  },
  image: {
    width: 30,
    height: 30,
  },
  addButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
  },
});