import document from "document";
import { OrientationSensor } from "orientation";
import * as calibration from "./calibration";
import * as settings from "../lib/settingStorage";

export function init(){
    console.log("landingCalibration start");
  return document.location.assign("landingCalibration.view");
}
export function update(){
    console.log("landingCalibration update");
    document.getElementById("btn-calibrate").addEventListener("click",()=>{
      calibration.init()
      .then(()=>{
        calibration.update({sensor:OrientationSensor, axis:1, onCalibrated: onCalibrated });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    });
}

function onCalibrated(thr){
  console.log("landingCalibration onCalibrated: "+thr);
  settings.set("landingThreshold",thr);
  document.history.back(); 
}