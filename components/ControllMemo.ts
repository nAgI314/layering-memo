import { MemoLayer } from "./MemoPage";

export const searchMemo= (memo:MemoLayer, level:number, id:number) : MemoLayer => {

  //見つけたLevelの層で、ほしいidのメモを抽出する関数がいる
  

  const searchLevel = (_memoArray:MemoLayer[], _level:number):(MemoLayer|string)[] => {
    //探したいlevelのメモだけ抽出
    if(_level === 1){
      return _memoArray;
    } else {
      let isCorrectLevel = false;
      const nextLevelMemo:MemoLayer[] = [];
      _memoArray.map((e) => {
        e.contents.map((_e) => {
        if (typeof _e === "string"){
          //そのレベルがない?
        } else {
          if(_e.level === _level){
            isCorrectLevel = true; 
          }
          nextLevelMemo.push(_e);
        }
        })
      })
      if (isCorrectLevel){
        return nextLevelMemo;
      } else {
        return searchLevel(nextLevelMemo,_level);
      }
    }
  }
  return memo;
}

export const addToMainMemo = (mainMemo:MemoLayer, addMemo:MemoLayer):MemoLayer => {
  const makeAddLayer = (_addLayer: MemoLayer): MemoLayer => {
    

    return _addLayer;
  };
  return makeAddLayer(addMemo);
}