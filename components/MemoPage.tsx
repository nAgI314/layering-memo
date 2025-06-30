import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { addToMainMemo } from './ControllMemo';
import MarkdownEditor from './MarkdownEditor';

export interface MemoLayer { 
  name : string,
  contents : (MemoLayer | string )[],
  id : number,
  idRoot : number[],
}

export const MemoPage = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      name: "main",
      contents : [],
      id : 0,
      idRoot : [0]
    }
  );
  const [focusedMemo, setFocusedMemo] = useState<MemoLayer>(memo);
  return(
   <MemoLayerComponent memo={memo} _setMemo={setMemo} focused_memo={focusedMemo} _setFocusedMemo={setFocusedMemo}/>
  )
}

const MemoLayerComponent = ({ memo, _setMemo ,focused_memo, _setFocusedMemo}: { memo: MemoLayer, _setMemo: (updated: MemoLayer) => void, focused_memo:MemoLayer, _setFocusedMemo: (layer: MemoLayer) => void;}) => {

  const handleTextChange = (index: number, text: string) => {
    console.log(text);
    // const newContents = [...memo.contents];
    const focused_newContents = [...focused_memo.contents];
    // newContents[index] = text;
    focused_newContents[index] = text;
    // console.log(focused_newContents);
    // _setMemo({ ...memo, contents: newContents });
  //  _setFocusedMemo({ ...focused_memo, contents: focused_newContents});
    // set_Memo(focused_memo);
    const newLayer = { ...focused_memo, contents: focused_newContents }
    _setFocusedMemo(newLayer);
    const newMemo = addToMainMemo(memo, structuredClone(newLayer));
  };

  const addMemo = () => {
    // console.log(searchMemo(memo,[0,0,1]));
    const cloneFocus = structuredClone(focused_memo);
    // console.log(cloneFocus);
    const newIdRoot = structuredClone(cloneFocus).idRoot;
    newIdRoot.push(structuredClone(cloneFocus).contents.length);
    const newLayerArray = cloneFocus.contents;
    const newLayer = {
      name: "",
      contents: [""],
      id: cloneFocus.contents.length,
      idRoot: newIdRoot,
    };
    newLayerArray.push(newLayer);
    const newFocusedMemo = {
      ...cloneFocus,
      contents: newLayerArray,
    }
    // const newMemo = { ...memo, contents: [...memo.contents, ""] };
    // _setMemo(newMemo);
    // const newLayer = { ...focused_memo, contents: [...focused_memo.contents, ""] }
    _setFocusedMemo(newFocusedMemo);
    if(cloneFocus.idRoot.length === 1){
      _setMemo({ ...memo, contents: [...memo.contents, ""] });
      console.log({ ...memo, contents: [...memo.contents, ""] });
    } else {
      console.log(newLayer);
      const newMemo = addToMainMemo(memo, structuredClone(newLayer));
      _setMemo(newMemo);
    }
    
    
  };

  const addLayer = (memoName:string,index:number) => {

    // console.log(focused_memo)
    // const root = {...focused_memo}.idRoot;
    const root = [...structuredClone(focused_memo).idRoot, index];
    // const root = focused_memo.idRoot;
    // console.log(index);
    // root.push(index);
    // console.log(root);
    const newLayer: MemoLayer = {
      contents: [],
      name: memoName,
      id: index, 
      idRoot: root
    };
    // console.log(newLayer)
    _setFocusedMemo(newLayer);
    const newMemo = addToMainMemo(memo, structuredClone(newLayer));
    // console.log(newMemo);
    _setMemo(newMemo);
    // console.log(addToMainMemo(memo, newLayer));
  };

  const moveLayer = (_memo:MemoLayer) => {
    _setFocusedMemo(_memo);
  };

  const backLayer = () => {
    _setFocusedMemo(memo);
  };


  return (
    <View style={styles.layer}>
      {/* <MarkdownEditor firstText=""/> */}
      {!(focused_memo.idRoot.length === 1) && (
        <Pressable onPress={() => backLayer()}>
          <View>
            <AntDesign name="back" size={35}/>
          </View>
        </Pressable>
      )}
      <Markdown>{focused_memo.name}</Markdown>
      {focused_memo.contents.map((item, index) => (
        <View key={index} style={styles.row}>          
          {typeof item === 'string' ?
            <View style={styles.eachRow}>
              <MarkdownEditor
                value={item}
                onChangeText={(text: string) => handleTextChange(index, text)}
              />
              <Pressable onPress={() => addLayer(item, index)}>
                <Image
                  source={require('../assets/images/shovel-black-small.png')}
                  style={styles.image}
                />
              </Pressable>
            </View>
          : 
            <View style={styles.eachRow}>
              <MarkdownEditor
                value={item.name}  
                onChangeText={(text: string) => handleTextChange(index, text)}
              />
              <Pressable onPress={() => moveLayer(item)}>
                <AntDesign name="arrowright" size={30}/>
              </Pressable>
            </View>
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
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  eachRow:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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