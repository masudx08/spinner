import React, {useEffect, useRef} from 'react';
import "./App.css"
import Spinner from './Spinner';
export default function App() {
  const prizeSet = [
    { color: "#F2E635",
      label :  "1",
      image : "",
      odds : 18
    },
    { color: "#FEA443",
      label :  "2",
      image : "",
      odds : 12
    },
    { color: "#FF8C64",
      label :  "3",
      image : "",
      odds : 12
    },
    { color: "#F2E635",
      label :  "4",
      image : "",
      odds : 10
    },
    { color: "#FEA443",
      label :  "5",
      image : "",
      odds : 1
    },
    { color: "#FF8C64",
      label :  "6",
      image : "",
      odds : 1
    },
    { color: "#F2E635",
      label :  "7",
      image : "",
      odds : 12
    },
    { color: "#FEA443",
      label :  "8",
      image : "",
      odds : 8
    },
    { color: "#FF8C64",
      label :  "9",
      image : "",
      odds : 5
    },
    { color: "#7D6B7D",
      label :  "10",
      image : "",
      odds : 5
    }
  ]
  useEffect(()=>{
    
  },[])
  function processFunction(win){
    window.alert(win)
  }
  return <div className="container">
   <Spinner spinnerSize={500} full={true} prizeSet={prizeSet} prize={false} processFn={processFunction}></Spinner>
  </div>
}
