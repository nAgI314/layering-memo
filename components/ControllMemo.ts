import { MemoLayer } from "./MemoPage";

export const searchMemo = (memo:MemoLayer,idRoot:number[]) : MemoLayer => {

  const searchNext = (currentMemo:MemoLayer, idIndex:number):MemoLayer => {
    //idIndexはidRootの前から何番目を探しているか
    let isCorrect = false;  
    // console.log(idRoot.length);
    if(idRoot.length === 1){
      return memo;
    } else {
      if (idRoot.length -1  === idIndex) {
        isCorrect =true;
      }

      // const nextMemo = memo.contents.map((e)=>{
      //   if(typeof e === "string"){

      //   } else if(e.id === idRoot[idIndex]){
      //     return e;
      //   }
      // })[0];
      console.log(currentMemo.contents);//なんか、一番最初がemptyになってる。
      const nextMemo = currentMemo.contents.find((e): e is MemoLayer =>
        typeof e !== "string" && e.id === idRoot[idIndex]
      )
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
    // const baseRoot = structuredClone(_addLayer).idRoot;
    // const baseRoot = structuredClone(_addLayer.idRoot);
    const baseRoot = {..._addLayer}.idRoot;    
    // console.log(baseRoot);
    baseRoot.pop(); 
    // console.log(baseRoot);
    const toAddLayer = searchMemo(structuredClone(mainMemo), baseRoot);
    // console.log(toAddLayer);
    // toAddLayer.contents.push(structuredClone(_addLayer));
    toAddLayer.contents[_addLayer.id] = structuredClone(_addLayer);
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