import document from "document";
import * as calibration from "./calibration";
import { Settings } from "../lib/settingStorage";

export function init(){
  console.log("landingCalibration start");
  return document.location.replace("landingCalibration.view");
}
export function update(){
    console.log("landingCalibration update");
    document.getElementById("btn-calibrate").addEventListener("click",()=>{
      calibration.init()
      .then(()=>{
        calibration.update({
          axis:1,
          onCalibrated:(v)=>{Settings.set("landingThreshold",v);} });
        })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    });
}
