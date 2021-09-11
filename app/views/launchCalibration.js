import * as document from "document";
import * as calibration from "./calibration"
import { OrientationSensor } from "orientation";
import * as settings from "../lib/settingStorage";
let backswipeCallback;
let callback;
export function init(options){
    console.log("launchCalibration start ");
    callback=options.callback;
  return document.location.assign("launchCalibration.view");
}
export function update(){
    console.log("launchCalibration update");
    backswipeCallback=document.onbeforeunload;
    
    document.getElementById("btn-calibrate").onclick=()=>{
      calibration.init()
      .then(()=>{
        calibration.update({sensor:OrientationSensor, axis:3, onCalibrated: onCalibrated });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    };
}

function onCalibrated(thr){
  console.log("launchCalibration onCalibrated: "+thr);
  settings.set("launchThreshold",thr);
  document.history.back(); 
  if (callback) callback(thr);
}
