import * as document from "document";

import { ProgressView } from "../widget/progress";
import { ChartView } from "../widget/chart";
import { TouchSliderView } from "../widget/touch_slider";
import {Trigger} from "../lib/trigger"
import * as settings from "../lib/settingStorage";
let chart;
let progress;
let touchSlider;
let trigger;
export function init(options){
  console.log("launchTrigger start ");
  return document.location.assign("launchTrigger.view");
}
export function update(){
  console.log("launchTrigger update");

  touchSlider=new TouchSliderView("touch_slider");
  progress=new ProgressView("progress");
  chart=new ChartView("chart");

  console.error("THR from settings:"+settings.get("launchThreshold",1));

  trigger=new Trigger({axisToObserve:3,threshold:settings.get("launchThreshold",1)});
  trigger.onUpdate=render;
  trigger.onTrigger=onTrigger;
  trigger.onTimeout=onTimeout;

  touchSlider.onUpdate=(v)=>{ 
    if (trigger.isStarted) trigger.push(v); 
  };

  document.getElementById("btn-wait-launch").onclick=()=>{ 
    console.error("TODO");
  };

  trigger.start();

}

function render(trigger,value){
  let sum=trigger.filter.sum;
  chart.update(trigger.filter.values);
  progress.update(value,sum/trigger.threshold);
}

function onTrigger(){
  console.log("launchTrigger onTriggered");
  console.error("launchTrigger TODO Startstopwatch");
}

function onTimeout(){
  console.log("launchTrigger onTimeout");
  console.error("launchTrigger TODO onTimeout");
}

