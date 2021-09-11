
import * as document from "document";
import { ChartView } from "../widget/chart";
import { ProgressView } from "../widget/progress";
import { TouchSliderView } from "../widget/touch_slider";
import { Trigger } from "../lib/trigger";
import { vibration } from "haptics";

let chart;
let progress;
let touchSlider;
let trigger;

export function init(){
  console.log("calibration start");
  return document.location.assign("calibration.view");
}
export function update(options){
  console.log("calibration update "+JSON.stringify(options) );
 
  document.getElementById("btn-calibration-done").text="Reading...";
  document.getElementById("btn-calibration-done").onclick=()=>{
  };

  chart=new ChartView("chart");
  
  touchSlider=new TouchSliderView("touch_slider");
  touchSlider.onUpdate=(v)=>{ 
    if (trigger.isStarted) trigger.push(v); 
  };
  trigger=new Trigger(options.sensor,options.axis);
  trigger.onUpdate=render;
  trigger.onCalibrated=()=>{
    document.getElementById("btn-calibration-done").text="Done";
    document.getElementById("btn-calibration-done").onclick=()=>{
      options.onCalibrated(trigger.threshold);
      document.onunload();
    };
    vibration.start("confirmation-max");
  }
  trigger.startCalibration();
}

function render(trigger,value,delta){
  let angle=value*180;
  let sum=trigger.filter.sum;
  //console.log("value:"+value+ "delta:"+delta+" thr:"+trigger.threshold);
  document.getElementById("accumulated").textContent=sum.toFixed(1);
  document.getElementById("threshold").textContent=trigger.threshold.toFixed(1);
  chart.update(trigger.filter.values);
}

document.addEventListener("beforeunload", (evt) => {
  console.log("Calibration beforeunload");
  // prevent the actual unload event\
  evt.preventDefault();
  // reset the position of the second view
  document.getElementId("background").animate("enable");
  // or, reset the X coordinate
  // document.getElementId("background").x = 0;
});