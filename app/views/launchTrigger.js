import * as document from "document";
import * as trigger from "../lib/trigger"
import * as settings from "../lib/settingStorage";
let trigger;
export function init(options){
    console.log("launchTrigger start ");
  return document.location.assign("launchTrigger.view");
}
export function update(){
    console.log("launchTrigger update");
    trigger=new trigger.Trigger({axisToObserve:3,threshold:settings.get("launchThreshold",1)});

    document.getElementById("btn-calibrate").onclick=()=>{
      calibration.init()
      .then(()=>{
        calibration.update({axis:3, OnTrigger: onTrigger,onTimeout: onTimeout });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    };
}

function onTrigger(){
  console.log("launchTrigger onTriggered");
  console.error("launchTrigger TODO Startstopwatch");
}

function onTimeout(){
  console.log("launchTrigger onTimeout");
  console.error("launchTrigger TODO onTimeout");
}

