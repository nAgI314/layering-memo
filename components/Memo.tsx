import { useState } from "react";
import { Image, Pressable, StyleSheet } from 'react-native';

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
  <div>
  <MemoLayer/>
  </div>
  )
}

const MemoLayer = () => {
  const [memoContent,setMemoContent] = useState<string>("memo");
  const write = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const writed = e.target.value;
    setMemoContent(writed);
  } 
  const makeLayer = () => {
    alert("ボタンが押されました");
  }
  return(
  <div>
    <table border={1}>
      <tr>
        <th style={styles.th}>内容</th>
        <th style={styles.th}>掘る</th>  
      </tr>
      <tr>
        <td><textarea onChange={write}>{memoContent}</textarea></td>
        <td><Pressable onPress={() => makeLayer()}><Image style={styles.Image} source={require("../assets/images/shovel-white-small.png")} /></Pressable></td>
      </tr>
    </table>
  </div>
  )
}

const styles = StyleSheet.create({
  th:{
    color:"#ffffff",
  },
  Image: {
    width: 40,
    height: 40
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});