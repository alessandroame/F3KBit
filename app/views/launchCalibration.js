import * as document from "document";
import * as calibration from "./calibration"
import * as settings from "../lib/settingStorage";
import * as settingsView from "./settings";
import * as view from "../lib/viewUtils";

export function init(){
    console.log("launchCalibration start ");
  return document.location.replace("launchCalibration.view");
}
export function update(){
    console.log("launchCalibration update");
    
    document.getElementById("btn-calibrate").onclick=()=>{
      calibration.init()
      .then(()=>{
        calibration.update({axis:3, onCalibrated: onCalibrated });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    };
}

function onCalibrated(thr){
  console.log("launchCalibration onCalibrated: "+thr);
  settings.set("launchThreshold",thr);
  view.replace(settingsView,"settings");
}
