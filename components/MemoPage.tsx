import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { addToMainMemo } from './ControllMemo';

export interface MemoLayer { 
  name : string,
  contents : (MemoLayer | string )[],
  level : number,
  id : number,
  parentId : number,
}

export const MemoPage = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      name: "main",
      contents : [],
      level : 0,
      id : 0,
      parentId : 0
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
    // const newContents = [...memo.contents];
    const focused_newContents = [...focused_memo.contents];
    // newContents[index] = text;
    focused_newContents[index] = text;
    console.log(focused_newContents);
    // onUpdate({ ...memo, contents: newContents });
    setFocusedMemo({ ...focused_memo, contents: focused_newContents});
    // set_Memo(focused_memo);
  };

  const addMemo = () => {
    // console.log("eee");
    const newMemo = { ...memo, contents: [...memo.contents, ""] };
    onUpdate(newMemo);
    setFocusedMemo({ ...focused_memo, contents: [...focused_memo.contents, ""] });
  };

  const addLayer = (memoName:string,index:number) => {
    // console.log(focused_memo)
    const newLayer: MemoLayer = {
      contents: [],
      level: focused_memo.level + 1,
      name: memoName,
      id: index, 
      parentId:0
    };
    console.log(memo);
    // const thisLayer:MemoLayer = {..focused_memo, contents:[newLayer]}
    //下の二行くらいうまくいっていない、focused_memoの変更はできているが、おおもとのmemoの変更が難しそうである。
    //おそらく、引数として受け取ったLayerを一個上のLayerのcontentsに登録する関数を作って、再帰的に呼び出せばいけそう。
    // onUpdate(addToMainMemo(memo,newLayer));
    // const newContents = [...focused_memo.contents];
    // newContents.splice(index + 1, 0, newLayer);
    // onUpdate({ ...focused_memo, contents: newContents });
    setFocusedMemo(newLayer);
  };

  const moveLayer = (_memo:MemoLayer) => {
    setFocusedMemo(_memo);
  };

  const backLayer = () => {
    setFocusedMemo(memo);
  };


  return (
    <View style={styles.layer}>
      {!(focused_memo.level === 0) && (
        <Pressable onPress={() => backLayer()}>
          <View>
            <AntDesign name="back" size={40}/>
          </View>
        </Pressable>
      )}
      <Text>{focused_memo.name}</Text>
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
              <Pressable onPress={() => addLayer(item, index)}>
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
              <Pressable onPress={() => moveLayer(item)}>
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