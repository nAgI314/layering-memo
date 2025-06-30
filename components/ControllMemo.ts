import cloneDeep from 'lodash/cloneDeep';
import { MemoLayer } from "./MemoPage";

export const searchMemo = (memo:MemoLayer,idRoot:number[]) : MemoLayer => {

  const searchNext = (currentMemo:MemoLayer, idIndex:number):MemoLayer => {
    //idIndexはidRootの前から何番目を探しているか
    let isCorrect = false;  
    // console.log(idRoot.length);
    if(idRoot.length === 1){
      return memo;
    } else {
      if (idRoot.length -2 === idIndex) {
        isCorrect =true;
      }

      // const nextMemo = memo.contents.map((e)=>{
      //   if(typeof e === "string"){

      //   } else if(e.id === idRoot[idIndex]){
      //     return e;
      //   }
      // })[0];
      console.log(currentMemo.contents);
      
      // const nextMemo = currentMemo.contents.find((e): e is MemoLayer =>
      //   typeof e !== "string" && e.id === idRoot[idIndex]
      // )
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
          idRoot : [-1]
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
  

  // searchId([memo]);
  return searchNext(memo, 0);
}

export const addToMainMemo = (mainMemo:MemoLayer, addMemo:MemoLayer):MemoLayer => {
  
  const makeAddLayer = (_addLayer: MemoLayer): MemoLayer => {
    const baseRoot = cloneDeep(_addLayer).idRoot;
    // const baseRoot = cloneDeep(_addLayer.idRoot);
    // const baseRoot = {..._addLayer}.idRoot;    
    console.log(baseRoot);
    baseRoot.pop(); 
    // console.log(baseRoot);
    const toAddLayer = searchMemo(cloneDeep(mainMemo), baseRoot);
    // console.log(toAddLayer);
    // toAddLayer.contents.push(cloneDeep(_addLayer));
    if (toAddLayer.contents.length <= _addLayer.id) {
      while (toAddLayer.contents.length <= _addLayer.id) {
        toAddLayer.contents.push("");
      }
    }
    toAddLayer.contents[_addLayer.id] = cloneDeep(_addLayer);
    // console.log(toAddLayer);
    
    //mainのメモまで来たかどうかを確認
    // if(Object.is(toAddLayer.idRoot,[0])){
    if(toAddLayer.idRoot.length == 1){
      return toAddLayer;
    } else {
      return makeAddLayer(toAddLayer);
    }
  };
  
  return makeAddLayer(addMemo);
}