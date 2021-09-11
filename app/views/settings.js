
import * as document from "document";
import { initMenuItem } from "../lib/menu";
import * as settings from "../lib/settingStorage";

//let backswipeCallback;
export function init(){
    console.log("settings start");

    return document.location.assign("settings.view");
}

let launch;
let landing;
export function update(){
    console.log("settings update");
  
    const buttonCallbacks = [
        ["launch-Calibration-view/start", () => import("./launchCalibration"), {a:1 ,callback:updateSettings}],
        ["landing-Calibration-view/start",  () => import("./landingCalibration"), {}]
      ];
      
    buttonCallbacks.forEach(initMenuItem);
    launch=document.getElementById("launch-Calibration-view/text");
    landing=document.getElementById("landing-Calibration-view/text");
    updateSettings();
}

function updateSettings(a){
console.error(a);
    launch.textContent="Launch thr:"+settings.get("launchThreshold",0).toFixed(2);
    landing.textContent="Landing thr:"+settings.get("landingThreshold",0).toFixed(2);
}


