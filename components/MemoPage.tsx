import AntDesign from 'react-native-vector-icons/AntDesign';
import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { addToMainMemo } from './ControllMemo';
import MarkdownEditor from './MarkdownEditor';
import { MemoMenuComponent } from './MemoMenu';
import {notice} from './notification';

import { memoPageStyles } from './styleSheet/memoPageStyle';
import { markdownTitleStyles } from './styleSheet/MarkdownStyle';
export interface MemoLayer { 
  name : string,
  contents : (MemoLayer | string )[],
  id : number,
  idRoot : number[],
  isNotice : boolean,
}

export const MemoPage = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      name: "main",
      contents : [],
      id : 0,
      idRoot : [0],
      isNotice : false,
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
    const focused_newContents = [...focused_memo.contents];
    focused_newContents[index] = text;
    const newLayer = { ...focused_memo, contents: focused_newContents }
    _setFocusedMemo(newLayer);
    if(focused_memo.idRoot.length === 1){
      _setMemo(newLayer);
    } else {
      const newMemo = addToMainMemo(memo, cloneDeep(newLayer));
      _setMemo(newMemo);
    } 

    if(focused_memo.isNotice == true){
      notice({title:"通知テスト",body:"内容は内容です"})
    }

  };

  const addMemo = () => {
    const cloneFocus = cloneDeep(focused_memo);
    const newIdRoot = cloneDeep(cloneFocus).idRoot;
    newIdRoot.push(cloneDeep(cloneFocus).contents.length);
    const newLayerArray = cloneFocus.contents;
    const newString = "";
    newLayerArray.push(newString);
    const newFocusedMemo = {
      ...cloneFocus,
      contents: newLayerArray,
    }
    _setFocusedMemo(newFocusedMemo);
    if(cloneFocus.idRoot.length === 1){
      _setMemo({ ...memo, contents: [...memo.contents, ""] });
      console.log({ ...memo, contents: [...memo.contents, ""] });
    } else {
      const newMemo = addToMainMemo(memo, cloneDeep(newFocusedMemo));
      _setMemo(newMemo);
    }
  };

  const addLayer = (memoName:string,index:number) => {
    const root = [...cloneDeep(focused_memo).idRoot, index];
    const newLayer: MemoLayer = {
      contents: [],
      name: memoName,
      id: index, 
      idRoot: root,
      isNotice: false,
    };
    _setFocusedMemo(newLayer);
    const newMemo = addToMainMemo(memo, cloneDeep(newLayer));
    _setMemo(newMemo);
  };

  const moveLayer = (_memo:MemoLayer) => {
    _setFocusedMemo(_memo);
  };

  const backLayer = () => {
    _setFocusedMemo(memo);
  };

  const deleteMemo = (memoNum:number) => {
    const cloneFocusContents = cloneDeep(focused_memo).contents;
    cloneFocusContents.splice(memoNum,1);

    const updatedLayer: MemoLayer = {
      ...focused_memo,
      contents: cloneFocusContents,
    };

    _setFocusedMemo(updatedLayer);
    const newMemo = addToMainMemo(memo, updatedLayer);
    _setMemo(newMemo);
  };

  const setStatusBar = (memoNum:number) => {
    //後でやりたい
  } ;
  const setReminder = (memoNum:number) => {
    //後でやりたい
  } ;

  return (
    <View>
      <View style={memoPageStyles.header}>
        <View style={memoPageStyles.buttonGroup}>
          <Pressable onPress={() => backLayer()}>
            <View>
              <AntDesign name="home" size={35}/>
            </View>
          </Pressable>
          <Pressable onPress={() => backLayer()}>
            <View>
              <AntDesign name="back" size={35}/>
            </View>
          </Pressable>
        </View>
        {/* <View style={memoPageStyles.memoTitle} > */}
        <View>
          <Markdown style={markdownTitleStyles}>{focused_memo.name}</Markdown>
        </View>
        <View style={memoPageStyles.buttonGroup}>
          <Pressable onPress={() => setIsPreview((prev)=>!prev)}>
            {!isPreview ?
              <View>
                <AntDesign name='check' size={35}/>
              </View>
            :
              <View>
                <AntDesign name="edit" size={35}/>
              </View>
            }
          </Pressable>
          <Pressable>
            <View>
              <AntDesign name="bars" size={35}/>
            </View>
          </Pressable>
        </View>
      </View>
      <ScrollView style={memoPageStyles.layer}>
      {focused_memo.contents.map((item, index) => (
        <View key={index} style={memoPageStyles.row}>          
          { typeof item === 'string' ?
            <View style={memoPageStyles.eachRow}>
              <MarkdownEditor
                isPreview={isPreview}
                onChangeIsPre={setIsPreview}
                value={item}
                onChangeText={(text: string) => handleTextChange(index, text)}
              />
              {!isPreview &&
              <View style={memoPageStyles.buttonGroup}>
                <MemoMenuComponent deleteMemo={deleteMemo} _index={index}/>
                
                <Pressable onPress={() => addLayer(item, index)}>
                  <Image
                    source={require('../assets/images/shovel-black-small.png')}
                    style={memoPageStyles.image}
                  />
                </Pressable>
              </View>
              }
            </View>
          : 
            <View style={memoPageStyles.eachRow}>
              <MarkdownEditor
                isPreview={isPreview}
                onChangeIsPre={setIsPreview}
                value={item.name}  
                onChangeText={(text: string) => handleTextChange(index, text)}
              />
              {!isPreview ?
              <View style={memoPageStyles.buttonGroup}>
                <MemoMenuComponent deleteMemo={deleteMemo} _index={index}/>
                <Pressable onPress={() => moveLayer(item)}>
                  <AntDesign name="arrowright" size={30}/>
                </Pressable>
              </View>
              :
              <Pressable onPress={() => moveLayer(item)}>
                <AntDesign name="arrowright" size={30}/>
              </Pressable>
              }
            </View>
          }
        </View>
      ))}
      {!isPreview && 
        <Pressable onPress={addMemo} style={memoPageStyles.addButton}>
          <Text style={memoPageStyles.addButtonText}>メモを追加</Text>
        </Pressable>
      }  
      </ScrollView>
    </View>
  );
};


