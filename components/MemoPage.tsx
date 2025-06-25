import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export interface MemoLayer { 
  name : string,
  contents : (MemoLayer | string )[],
  level : number,
  id : number
}

export const MemoPage = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      name: "main",
      contents : [],
      level : 0,
      id : 0
    }
  );
  const [focusedMemo, setFocusedMemo] = useState<MemoLayer>(memo);
  return(
   <MemoLayerComponent memo={memo} onUpdate={setMemo} focused_memo={focusedMemo} setFocusedMemo={setFocusedMemo}/>
  )
}

const MemoLayerComponent = ({ memo, onUpdate ,focused_memo, setFocusedMemo}: { memo: MemoLayer, onUpdate: (updated: MemoLayer) => void, focused_memo:MemoLayer, setFocusedMemo: (layer: MemoLayer) => void;}) => {

  const handleTextChange = (index: number, text: string) => {
    // console.log("ok");
    const newContents = [...memo.contents];
    const focused_newContents = [...focused_memo.contents];
    newContents[index] = text;
    focused_newContents[index] = text;
    console.log(newContents);
    onUpdate({ ...memo, contents: newContents });
    setFocusedMemo({ ...focused_memo, contents: focused_newContents});
    // set_Memo(focused_memo);
  };

  const addMemo = () => {
    // console.log("eee");
    const newMemo = { ...memo, contents: [...memo.contents, ""] };
    onUpdate(newMemo);
    setFocusedMemo({ ...focused_memo, contents: [...focused_memo.contents, ""] });
  };

  const addLayer = (index: number) => {
  const item = memo.contents[index];
  const name = typeof item === 'string' ? item : item.name;

  console.log(focused_memo)
  const newLayer: MemoLayer = {
    contents: [],
    level: memo.level + 1,
    name: name,
    id: 0, //
  };

  const newContents = [...memo.contents];
  newContents.splice(index + 1, 0, newLayer);
  onUpdate({ ...memo, contents: newContents });
  setFocusedMemo(newLayer);
};


  const backLayer = () => {
    setFocusedMemo(memo);
  }

  return (
    <View style={[styles.layer, { marginLeft: focused_memo.level * 20 }]}>
      {focused_memo.level === 1 && (
        <Pressable onPress={() => backLayer()}>
          <View>
            <AntDesign name="back" size={40}/>
          </View>
        </Pressable>
      )}
      {focused_memo.contents.map((item, index) => (
        <View key={index} style={styles.row}>
          {typeof item === 'string' ?
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
          : 
            <>
              <TextInput
                value={item.name}
                onChangeText={(text: string) => handleTextChange(index, text)}
                style={styles.input}
                placeholder="メモを入力"
              />
              <Pressable onPress={() => addLayer(index)}>
                <AntDesign name="arrowright" size={30}/>
              </Pressable>
            </>
          }
        </View>
      ))}
      <Pressable onPress={addMemo} style={styles.addButton}>
        <Text style={styles.addButtonText}>メモを追加</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  arrow: {
    borderWidth: 2,
  },
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