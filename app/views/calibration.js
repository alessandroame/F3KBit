
import * as document from "document";
import { ChartView } from "../widget/chart";
import { TouchSliderView } from "../widget/touch_slider";
import { Trigger } from "../lib/trigger";
import { vibration } from "haptics";
import * as settingsView from "./settings";
import * as view from "../lib/viewUtils";

let chart;
let touchSlider;
let trigger;

export function init(){
  console.log("calibration start");
  return document.location.replace("calibration.view");
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
  trigger=new Trigger({axis:options.axis});
  trigger.onUpdate=render;
  trigger.onCalibrated=()=>{
    document.getElementById("btn-calibration-done").text="Done";
    document.getElementById("btn-calibration-done").onclick=()=>{
      console.log("launchCalibration onCalibrated: "+trigger.threshold);
      if (options.onCalibrated)options.onCalibrated(trigger.threshold);
      view.replace(settingsView,"settings");
    };
    vibration.start("confirmation-max");
  };
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
