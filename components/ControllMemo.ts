import { MemoLayer } from "./MemoPage";

export const searchMemo= (memo:MemoLayer,idRoot:number[]) : MemoLayer => {

  const searchNext = (idIndex:number):MemoLayer => {
    //idIndexはidRootの前から何番目を探しているか
    let isCorrect = false;  
    if(idRoot.length === 1){
      return memo;
    } else {
      if (idRoot.length -1  === idIndex) {
        isCorrect =true;
      }

      const nextMemo = memo.contents.map((e)=>{
        if(typeof e === "string"){

        } else if(e.id === idRoot[idIndex]){
          return e;
        }
      })[0];
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
        return searchNext(idIndex + 1);
      }
    
    } 
  }
  

  // searchId([memo]);
  return searchNext(0);
}

export const addToMainMemo = (mainMemo:MemoLayer, addMemo:MemoLayer):MemoLayer => {
  
  
  const makeAddLayer = (_addLayer: MemoLayer): MemoLayer => {
    const baseRoot = addMemo.idRoot;
    baseRoot.pop(); 
    const toAddLayer = searchMemo(mainMemo, baseRoot);
    // console.log(toAddLayer);
    toAddLayer.contents.push(addMemo);
    console.log(toAddLayer);

    return _addLayer;
  };
  return makeAddLayer(addMemo);
}