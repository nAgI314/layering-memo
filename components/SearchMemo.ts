import { MemoLayer } from "./MemoPage";

export const searchMemo= (memo:MemoLayer, level:number, id:number) : MemoLayer => {
  
  
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