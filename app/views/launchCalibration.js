import * as document from "document";
import * as calibration from "./calibration"
import { OrientationSensor } from "orientation";
import * as settings from "../lib/settingStorage";

export function init(){
    console.log("launchCalibration start");
  return document.location.assign("launchCalibration.view");
}
export function update(){
    console.log("launchCalibration update");
    document.getElementById("btn-calibrate").addEventListener("click",()=>{
      calibration.init()
      .then(()=>{
        calibration.update({sensor:OrientationSensor, axis:3, onCalibrated: onCalibrated });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    });
}

function onCalibrated(thr){
  console.log("launchCalibration onCalibrated: "+thr);
  settings.set("launchThreshold",thr);
  setTimeout(() => {
    console.log("landingCalibration unload");
    document.history.back(); 
  }, 1);
}