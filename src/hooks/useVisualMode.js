import { useState } from "react";


export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);


  const [history, setHistory] = useState([initial]);
  
  
  const  transition = (addMode, replace = false)  => {
    
    if(!replace) {
      //const newHistory = history.slice(0, history.length - 1);
      // setHistory([...newHistory]);
      setHistory(prevHistory => [...prevHistory, addMode])
      //setHistory([...history, addMode]);
      // setMode(addMode);
      
    } else {

      setHistory(history => [...history.slice(0, history.length -1), addMode])
      // setMode(addMode)
    }

  }
 
  

  const back = () => {
   
    if (history.length < 2) {
      return
    }

    // if (history.length > 1){
     
      // const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory => [...newHistory.slice(0, history.length - 1)])
      // setHistory([...newHistory]);
      // setMode(history[history.length -1]);
    // } 
    // else {
    //   setMode(mode)
    // }

  }
  return { mode: history[history.length - 1 ], transition, back };
}


