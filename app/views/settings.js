
import * as document from "document";
import { initMenuItem } from "../lib/viewUtils";
import { Settings } from "../lib/settingStorage";

export function init(options){
    console.log("settings start");
    if (options && options.replace){
        //console.error("REPLACE Instead of ASSIGN");
        return document.location.replace("settings.view");
    }else return document.location.assign("settings.view");
}

export function update(){
    console.log("settings update");
  
    const buttonCallbacks = [
        ["launch-Calibration-view/start", () => import("./launchCalibration")],
        ["landing-Calibration-view/start",  () => import("./landingCalibration"), {}]
      ];
      
    buttonCallbacks.forEach(initMenuItem);
    document.getElementById("launch-Calibration-view/text").textContent="Launch thr:"+Settings.get("launchThreshold",0).toFixed(2);
    document.getElementById("landing-Calibration-view/text").textContent="Landing thr:"+Settings.get("landingThreshold",0).toFixed(2);
}


