import { useState } from "react";

interface MemoLayer { 
  contents : (MemoLayer | string )[],
  level : number,
}
// type j = j[] | string[]; 


export const Memo = () => {
  const [memo,setMemo] = useState<MemoLayer>(
    {
      contents : [],
      level : 0,
    }
  );

  return(
  <>
  
  </>
  )
}

const MemoLayer = () => {

  return(
  <>
  
  </>
  )
}