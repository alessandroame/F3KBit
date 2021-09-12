import document from "document";
import * as calibration from "./calibration";
import * as settings from "../lib/settingStorage";
import * as view from "../lib/viewUtils";
import * as settingsView from "./settings";

export function init(){
  console.log("landingCalibration start");
  return document.location.replace("landingCalibration.view");
}
export function update(){
    console.log("landingCalibration update");
    document.getElementById("btn-calibrate").addEventListener("click",()=>{
      calibration.init()
      .then(()=>{
        calibration.update({axis:1, onCalibrated: onCalibrated });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err}`);
      });
    });
}

function onCalibrated(thr){
  console.log("landingCalibration onCalibrated: "+thr);
  settings.set("landingThreshold",thr);
  view.replace(settingsView,"settings");
}