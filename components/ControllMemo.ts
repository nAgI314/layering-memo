import cloneDeep from 'lodash/cloneDeep';
import { MemoLayer } from "./MemoPage";

export const searchMemo = (memo:MemoLayer,idRoot:number[]) : MemoLayer => {

  const searchNext = (currentMemo:MemoLayer, idIndex:number):MemoLayer => {
    //idIndexはidRootの前から何番目を探しているか
    let isCorrect = false;  
    if(idRoot.length === 1){
      return memo;
    } else {
      if (idRoot.length -2 === idIndex) {
        isCorrect =true;
      }

      const nextMemo = currentMemo.contents.find(
        (e): e is MemoLayer => typeof e === "object" && e !== null && "id" in e && e.id === idRoot[idIndex + 1]
      );
      console.log(isCorrect);
      console.log(nextMemo);
      if(!nextMemo){
        console.log("そのメモはありません");
        return {
          name:"404",
          contents : [],
          id : -1,
          idRoot : [-1],
          isNotice : false,
        }
        // throw new Error();
      }

      if (isCorrect){
        return nextMemo;
      } else {
        return searchNext(nextMemo, idIndex + 1);
      }
    
    } 
  }

  return searchNext(memo, 0);
}

export const addToMainMemo = (mainMemo:MemoLayer, addMemo:MemoLayer):MemoLayer => {
  
  const makeAddLayer = (_addLayer: MemoLayer): MemoLayer => {
    const baseRoot = cloneDeep(_addLayer).idRoot;
    baseRoot.pop(); 
    const toAddLayer = searchMemo(cloneDeep(mainMemo), baseRoot);
    if (toAddLayer.contents.length <= _addLayer.id) {
      while (toAddLayer.contents.length <= _addLayer.id) {
        toAddLayer.contents.push("");
      }
    }
    toAddLayer.contents[_addLayer.id] = cloneDeep(_addLayer);
    //mainのメモまで来たかどうかを確認
    if(toAddLayer.idRoot.length == 1){
      return toAddLayer;
    } else {
      return makeAddLayer(toAddLayer);
    }
  };
  
  return makeAddLayer(addMemo);
}