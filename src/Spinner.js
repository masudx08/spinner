import React, {useEffect, useRef} from 'react';
import "./App.css"
export default function Spinner({spinnerSize, prizeSet, prize, processFn, full}) {
    const sectors = [...prizeSet]
    let countOdds = 0
    prizeSet.forEach(item=>{
        countOdds+=item.odds
    })
    console.log(countOdds,'count odds');
    const oops = Math.ceil((sectors.length*(100-countOdds)/100))
    for(let i=1; i<=oops; i++){
        const position = (Math.ceil(prizeSet.length/oops)-1)
        sectors[position*i]={
            color: "red",
             label :  "oops",
             image : "",
             odds : 1
         }
    }

    useEffect(()=>{
       
        // const sectors = [
        //     {color:"#f82", label:"Stack"},
        //     {color:"#0bf", label:"10"},
        //     {color:"#fb0", label:"200"},
        //     {color:"#0fb", label:"50"},
        //     {color:"#b0f", label:"100"},
        //     {color:"#f0b", label:"5"},
        //     {color:"#bf0", label:"500"},
        //     {color:"#bf0", label:"1000"},
        //     {color:"#bf0", label:"200"},
        //   ];
          
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
              // COLOR
              ctx.beginPath();
              ctx.fillStyle = sector.color;
              ctx.moveTo(rad, rad);
              ctx.arc(rad, rad, rad, ang, ang + arc);
              ctx.lineTo(rad, rad);
              ctx.fill();
              // TEXT
              ctx.translate(rad, rad);
              ctx.rotate(ang + arc / 2);
              ctx.textAlign = "right";
              ctx.fillStyle = "#fff";
              ctx.font = "bold 30px sans-serif";
              ctx.fillText(sector.label, rad - 10, 10);
              //
              ctx.restore();
            };
           
            
            function rotate() {
              const sector = sectors[getIndex()];
              if(!angVel && EL_spin.textContent !== "SPIN"){
                  if(prize){
                      processFn(prize)
                  }else{
                    processFn(sector.label)
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
            rotate(); // Initial rotation
            engine(); // Start engine
            EL_spin.addEventListener("click", () => {
              if (!angVel) angVel = rand(0.25, 0.35);
            });
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
            <div id="spin">SPIN</div>
        </div>
            {
                !full && <div className="content-blocker"></div>
            }
        </div>
      )
  }
}
