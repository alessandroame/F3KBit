import * as document from "document";
import { vibration } from "haptics";
import { display } from "display";

import { ProgressView } from "../widget/progress";
import { ChartView } from "../widget/chart";
import { TouchSliderView } from "../widget/touch_slider";
import {Trigger} from "../lib/trigger"
import { Settings } from "../lib/settingStorage";
import *  as landingTrigger from "./landingTrigger"
let chart;
let progress;
let touchSlider;
let trigger;
export function init(options){
  console.log("launchTrigger start options:"+JSON.stringify(options));

  return document.location.replace("launchTrigger.view");
}
export function update(options){
  console.log("launchTrigger update options:"+JSON.stringify(options));
  display.poke();

  touchSlider=new TouchSliderView("touch_slider");
  progress=new ProgressView("progress");
  chart=new ChartView("chart");

  trigger=new Trigger({axis:3,threshold:Settings.get("launchThreshold",1)});
  trigger.onUpdate=render;
  trigger.onTrigger=onTrigger;
  trigger.onTimeout=onTimeout;

  touchSlider.onUpdate=(v)=>{ 
    if (trigger.isStarted) trigger.push(v); 
  };

  document.getElementById("btn-wait-launch").onclick=()=>{ 
    openLandingTrigger();
  };

  trigger.start();

}

function render(trigger,value){
  let sum=trigger.filter.sum;
  chart.update(trigger.filter.values);
  progress.update(value,sum/trigger.threshold);
}

function onTrigger(){
  console.log("launchTrigger onTrigger");
  trigger.stop();
  vibration.start("confirmation-max");
  openLandingTrigger();
}

function onTimeout(){
  console.log("launchTrigger onTimeout");
  console.error("launchTrigger TODO onTimeout");
}

function openLandingTrigger(){
  var err=new Error();
  console.error(err.stack);
  landingTrigger.init()
    .then(()=>{
      try {
        landingTrigger.update();
      }catch(err){
        console.error(err);
      }
    })
    .catch((err) => {
      console.error(`Failed to load landingTrigger - ${err}`);
    });
}