import * as document from "document";
import * as launchTrigger from "./launchTrigger"
import { vibration } from "haptics";
import { display } from "display";

import { ProgressView } from "../widget/progress";
import { ChartView } from "../widget/chart";
import { TouchSliderView } from "../widget/touch_slider";
import {Trigger} from "../lib/trigger"
import { Settings } from "../lib/settingStorage";
let touchSlider;
let trigger;
let startTime;
let intervalId;
export function init(options){
  console.log("landingTrigger start options:"+JSON.stringify(options));
  return document.location.replace("landingTrigger.view");
}
export function update(options){
  console.log("landingTrigger update options:"+JSON.stringify(options));
  startTime=Date.now();
  display.poke();

  touchSlider=new TouchSliderView("touch_slider");

  trigger=new Trigger({axis:1,timeoutInSeconds:600,threshold:Settings.get("landingThreshold",1)});
  //trigger.onUpdate=(trigger)=>{ console.warn(trigger.sum);};
  trigger.onTrigger=onTrigger;
  trigger.onTimeout=onTimeout;

  touchSlider.onUpdate=(v)=>{ 
    if (trigger.isStarted) trigger.push(v); 
  };

  document.getElementById("btn-wait-landing").onclick=()=>{ 
    onTrigger();
  };

  trigger.start();

  intervalId=setInterval(() => {
    render();
  }, 50);

  document.onbeforeunload=(evt)=>{
    trigger.stop();
    clearInterval(intervalId);
  };
}

function render(showMS){
  const millis = Date.now() - startTime;
  const secs = Math.floor(millis / 1000);
  const mins = Math.floor(secs / 60);
  let text=[`0${mins}`.slice(-2), `0${secs}`.slice(-2)].join(':');
  if (showMS){
    text+="."+((millis/100) % 100);
  }
  document.getElementById("fly-time").textContent=text;
}

function onTrigger(){
  console.log("landingTrigger onTrigger");
  render(true);
  display.poke();
  vibration.start("alert");

  document.getElementById("btn-wait-landing").text="Done";
  
  document.getElementById("btn-wait-landing").onclick=()=>{ 
    openLaunchTrigger();
  };
  clearInterval(intervalId);
}

function onTimeout(){
  console.log("landingTrigger onTimeout");
  console.error("landingTrigger TODO onTimeout");
}

function openLaunchTrigger(){
  launchTrigger.init()
      .then(()=>{
        launchTrigger.update();
      })
      .catch((err) => {
        console.error(`Failed to load trigger - ${err}`);
      });
}