
import * as document from "document";
import * as calibration from "./calibration"
import { OrientationSensor } from "orientation";

export function init(){
    console.log("launchCalibration start");
  return document.location.assign("launchCalibration.view");
}
export function update(){
    console.log("launchCalibration update");
    document.getElementById("start-button").addEventListener("click",()=>{
      calibration.init()
      .then(()=>{
        calibration.update({sensor:OrientationSensor, axis:3 });
      })
      .catch((err) => {
        console.error(`Failed to load calibration - ${err.message}`);
      });
    });
}