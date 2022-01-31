import React, {useEffect, useRef} from 'react';
import "./App.css"
import Lost from "./images/lost.png"
import Gift from "./images/gift.png"
export default function Spinner({spinnerSize, prizeSet, prize, processFn, full}) {
    const sectors = [...prizeSet]
    let countOdds = 0
    prizeSet.forEach(item=>{
        countOdds+=item.odds
    })
      
    
    if(countOdds<100){
      sectors.push( { color: "#f32e2e" ,
      label :  "oops!",
      image : Lost,
      odds : 19
    })
    }

    useEffect(()=>{
       
                         // default size for font
  
        
          if(countOdds<100){
            const rand = (m, M) => Math.random() * (M - m) + m;
            const tot = sectors.length;
            const EL_spin = document.querySelector("#spin");
            const ctx = document.querySelector("#wheel").getContext('2d');
            const dia = ctx.canvas.width;
            const rad = dia / 2;
            const PI = Math.PI;
            const TAU = 2 * PI;
            const arc = TAU / sectors.length;


            if(spinnerSize>500){
             EL_spin.style.fontSize = "4rem"
            }

            const contentBlocker = document.querySelector(".content-blocker")
            contentBlocker.style.top =ctx.canvas.height/2+"px"
            console.dir(contentBlocker, "contentBLocker")


            const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
            let angVel = 0; // Angular velocity
            let ang = 0; // Angle in radians

            function getFont() {
              var fontBase = 1000,                   // selected default width for canvas
              fontSize = 35;  
              var ratio = fontSize / fontBase;   // calc ratio
              var size = ctx.canvas.width * ratio;  
              // get font size based on current width
              // "100px sans-serif" 
              return (size||15) + 'px sans-serif'; // set font
          }
            const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;
            
            function drawSector(sector, i) {
              const ang = arc * i;
              ctx.save();
              
              ctx.beginPath();
              ctx.fillStyle = sector.color;
              ctx.moveTo(rad, rad);
              ctx.arc(rad, rad, rad, ang, ang + arc);
              ctx.lineTo(rad, rad);
              ctx.fill();

              // COLOR


              // TEXT
              ctx.translate(rad, rad);
              ctx.rotate(ang + arc / 2);
              ctx.textAlign = "right";
              ctx.fillStyle = "#34495e";
              // ctx.font = "bold 175% sans-serif";
              ctx.font = getFont()
              ctx.fillText(sector.label, rad - 10, 10);
              // 
              ctx.restore();
            };
           
            
            function rotate() {
              const sector = sectors[getIndex()];
              if(!angVel && EL_spin.textContent !== "SPIN"){
                  if(prize){
                      processFn({label: prize, image: Gift})
                  }else{
                    if(sector.image){
                      processFn(sector)
                    }else{
                      processFn({...sector,image:Gift})

                    }
                  }
              }
              ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
              EL_spin.textContent = !angVel ? "SPIN" : sector.label;
              EL_spin.style.background = sector.color;
            }
            
            function frame() {
              if (!angVel) return;
              angVel *= friction; // Decrement velocity by friction
              if (angVel < 0.002) angVel = 0; // Bring to stop
              ang += angVel; // Update angle
              ang %= TAU; // Normalize angle
              rotate();
            }
            
            function engine() {
              frame();
              requestAnimationFrame(engine)
            }
            
            // INIT
            sectors.forEach(drawSector);
            rotate();
           // Initial rotation
            engine(); // Start engine
              EL_spin.addEventListener("click", () => {
                if (!angVel && full) angVel = rand(0.25, 0.35);
              });
          }

          
    },[])
    function sizeCalculator(){

      return spinnerSize<300 ? 300
      : spinnerSize?spinnerSize:window.innerWidth/3
    }
  if(countOdds>100){
    return <div className="error-container">
        <div className="error">Odds must be less than 100</div>
    </div>
  }else{
    return (
       
        <div className="main-container">
            
            <div id="wheelOfFortune">
            <canvas id="wheel" width={sizeCalculator()} height={sizeCalculator()}></canvas>
            {
            <div id="spin">SPIN</div>
            }
        </div>
            {
                !full && <div className="content-blocker"></div>
            }
        </div>
      )
  }
}
