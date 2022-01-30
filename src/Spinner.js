import React, {useEffect, useRef} from 'react';
import "./App.css"
import Lost from "./images/lost.png"
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
            
            const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
            let angVel = 0; // Angular velocity
            let ang = 0; // Angle in radians
            
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
              ctx.font = "bold 25px sans-serif";
              ctx.fillText(sector.label, rad - 10, 10);
              // 
              ctx.restore();
            };
           
            
            function rotate() {
              const sector = sectors[getIndex()];
              if(!angVel && EL_spin.textContent !== "SPIN"){
                  if(prize){
                      processFn({label: prize})
                  }else{
                    processFn(sector)
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
            if(full){
              EL_spin.addEventListener("click", () => {
                if (!angVel) angVel = rand(0.25, 0.35);
              });
            }
          }

          
    },[])
  if(countOdds>100){
    return <div className="error-container">
        <div className="error">Odds must be less than 100</div>
    </div>
  }else{
    return (
       
        <div className="main-container">
            
            <div id="wheelOfFortune">
            <canvas id="wheel" width={spinnerSize} height={spinnerSize}></canvas>
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
