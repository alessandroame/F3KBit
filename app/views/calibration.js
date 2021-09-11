
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
  chart=new ChartView("chart");
  progress=new ProgressView("progress");
  
  touchSlider=new TouchSliderView("touch_slider");
  touchSlider.onUpdate=(v)=>{ 
    if (trigger.isStarted) trigger.push(v); 
  };
  trigger=new Trigger(options.sensor,options.axis);
  trigger.onUpdate=render;
  trigger.onCalibrated=()=>{
    document.getElementById("status").textContent="Calibrated: "+trigger.threshold;
    vibration.start("confirmation-max");
  }
  trigger.startCalibration();
}

function render(trigger,value,delta){
  let angle=value*180;
  let sum=trigger.filter.sum;
  //console.log("acc "+accumulated+" thr "+trigger.threshold);
  progress.update(angle,sum/trigger.threshold*360);
  document.getElementById("delta").textContent=delta.toFixed(1);
  document.getElementById("accumulated").textContent=sum.toFixed(1);
  document.getElementById("threshold").textContent=trigger.threshold.toFixed(1);
  chart.update(trigger.filter.values);
}