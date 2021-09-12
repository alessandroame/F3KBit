import * as document from "document";
import * as calibration from "./calibration"
import { Settings } from "../lib/settingStorage";

export function init(){
    console.log("launchCalibration start ");
  return document.location.replace("launchCalibration.view");
}
export function update(){
    console.log("launchCalibration update");
    
    document.getElementById("btn-calibrate").onclick=()=>{
      calibration.init()
      .then(()=>{
        calibration.update({
          axis:3,
          onCalibrated:(v)=>{Settings.set("launchThreshold",v);} });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    };
}

