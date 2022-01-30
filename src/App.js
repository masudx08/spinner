import React, {useEffect, useRef} from 'react';
import "./App.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Spinner from './Spinner';
import Laptop from "./images/laptop.png"
import Tv from "./images/tv.png"
import Refrigerator from "./images/refrigerator.png"
import Tab from "./images/tab.png"
import Iphone from "./images/iphone.png"
import Computer from "./images/computer.png"
import Keyboard from "./images/keyboard.png"
import Monitor from "./images/monitor.png"
export default function App() {
 const colorSet = ["#FFF587", "#FF8C64", "#F29544", "#F2E18D"]

  const prizeSet = [
    { color: "#FFF587",
      label :  "Laptop1",
      image : Laptop,
      odds : 1
    },
    { color: "#F29544",
      label :  "Tv2",
      image : Tv,
      odds : 1
    },
    { color: "#FF8C64",
      label :  "Freeze3",
      image : Refrigerator,
      odds : 1
    },
    { color: "#FFF587",
      label :  "Tab5",
      image : Tab,
      odds : 2
    },
    { color: "#F29544",
      label :  "Iphone6",
      image : Iphone,
      odds : 1
    },
    { color: "#FF8C64",
      label :  "Computer7",
      image : Computer,
      odds : 19
    },
    { color: "#FFF587",
      label :  "Keyboard8",
      image : Keyboard,
      odds : 19
    },
    { color: "#F29544",
      label :  "Monitor9",
      image : Monitor,
      odds : 19
    }
  ]

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [win, setWin] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  useEffect(()=>{
    
  },[])
  function processFunction(p){
    setWin(p)
    handleOpen()
  }
  return <div className="container">
    <div>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          win &&
          <Box sx={style}>
          <img style={{width:"100%", height: "auto"}} src={win.image} alt="" />
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center"}}>
            {
              win.label !== "oops!"
              ? <>You Won: {win.label}</>
             : <> OOPS! You Lost</>
            }
          </Typography>
          
        </Box>
        }
      </Modal>
    </div>
   <Spinner spinnerSize={500} full={true} prizeSet={prizeSet}  processFn={processFunction}></Spinner>
  </div>
}
