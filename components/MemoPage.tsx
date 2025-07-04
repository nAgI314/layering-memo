import AntDesign from '@expo/vector-icons/AntDesign';
import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  console.log(memo);
  const [focusedMemo, setFocusedMemo] = useState<MemoLayer>(memo);
  return(
   <MemoLayerComponent memo={memo} _setMemo={setMemo} focused_memo={focusedMemo} _setFocusedMemo={setFocusedMemo}/>
  )
}

const MemoLayerComponent = ({ memo, _setMemo ,focused_memo, _setFocusedMemo}: { memo: MemoLayer, _setMemo: (updated: MemoLayer) => void, focused_memo:MemoLayer, _setFocusedMemo: (layer: MemoLayer) => void;}) => {
  const [isPreview,setIsPreview] = useState<boolean>(true);

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
    console.log(newLayer);
    if(focused_memo.idRoot.length === 1){
      _setMemo(newLayer);
    } else {
      const newMemo = addToMainMemo(memo, cloneDeep(newLayer));
      _setMemo(newMemo);
    }
  };

  const addMemo = () => {
    // console.log(searchMemo(memo,[0,0,1]));
    const cloneFocus = cloneDeep(focused_memo);
    // console.log(cloneFocus);
    const newIdRoot = cloneDeep(cloneFocus).idRoot;
    newIdRoot.push(cloneDeep(cloneFocus).contents.length);
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
      console.log(newFocusedMemo);
      const newMemo = addToMainMemo(memo, cloneDeep(newFocusedMemo));
      _setMemo(newMemo);
    }
  };

  const addLayer = (memoName:string,index:number) => {

    // console.log(focused_memo)
    // const root = {...focused_memo}.idRoot;
    const root = [...cloneDeep(focused_memo).idRoot, index];
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
    const newMemo = addToMainMemo(memo, cloneDeep(newLayer));
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
    <View>
      


        <View style={styles.header}>
          <Pressable onPress={() => backLayer()}>
            <View>
              <AntDesign name="back" size={25}/>
            </View>
          </Pressable>
          <View>
            <Text style={styles.title}>
              メモ
            </Text>
          </View>
          <Pressable onPress={() => setIsPreview((prev)=>!prev)}>
            <View>
              <AntDesign name="edit" size={25}/>
            </View>
          </Pressable>
        </View>
      <ScrollView style={styles.layer}>
      <Markdown>{focused_memo.name}</Markdown>
      {focused_memo.contents.map((item, index) => (
        <View key={index} style={styles.row}>          
          {typeof item === 'string' ?
            <View style={styles.eachRow}>
              <MarkdownEditor
                isPreview={isPreview}
                onChangeIsPre={setIsPreview}
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
                isPreview={isPreview}
                onChangeIsPre={setIsPreview}
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
      {!isPreview && 
        <Pressable onPress={addMemo} style={styles.addButton}>
          <Text style={styles.addButtonText}>メモを追加</Text>
        </Pressable>
      }  
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e1e1e1',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize:20,
  },
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