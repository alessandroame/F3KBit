import document from "document";
import { LaunchDetector } from "./launch_detector";
import { Chart } from "./chart";
import { display } from "display";
import { vibration } from "haptics";

display.autoOff = false;
let launchDetector=new LaunchDetector(onLaunchTriggered);
launchDetector.start();

let chart=new Chart("launch_chart");
launchDetector.setChart(chart);
document.getElementById("status").textContent="waiting for launch..";
function onLaunchTriggered(){
  launchDetector.stop();
  vibration.start("nudge-max");
  document.getElementById("status").textContent="launch triggered";
  console.log("launch triggered");
}

let leftBtn = document.getElementById("leftBtn");
leftBtn.onclick=()=>{
  launchDetector.calibrate((v)=>{
    document.getElementById("status").textContent=v.toFixed(2);
  },(v)=>{
    document.getElementById("status").textContent="Done "+v.toFixed(2);
    launchDetector.stop();
  });
}
let rigthBtn = document.getElementById("rigthBtn");
rigthBtn.onmousemove = function(evt) {
  //simulateZAxis(evt);
}
rigthBtn.onclick=()=>{
  launchDetector.toggle();
}

function simulateZAxis(evt){
  let v=(evt.screenY-150)/150;
  if (v>0)
    v=1-v;
  else
    v=-1-v;
  launchDetector.accumulate(v);
}