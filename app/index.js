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
function onLaunchTriggered(){
  launchDetector.stop();
  vibration.start("nudge-max");
  console.log("launch triggered");
}


let controller = document.getElementById("controller");
controller.onmousemove = function(evt) {
  let v=(evt.screenY-150)/150;
  if (v>0)
    v=1-v;
  else
    v=-1-v;
  launchDetector.accumulate(v);
}