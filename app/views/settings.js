
import * as document from "document";
import { initMenuItem } from "../lib/menu";
import * as settings from "../lib/settingStorage";

export function init(){
    console.log("settings start");
    return document.location.assign("settings.view");
}

export function update(){
    console.log("settings update");
    const buttonCallbacks = [
        ["launch-Calibration-view/start",   () => import("./launchCalibration")],
        ["landing-Calibration-view/start",  () => import("./landingCalibration")],
      ];
      
    buttonCallbacks.forEach(initMenuItem);

    document.getElementById("launch-Calibration-view/text").textContent="Launch thr:"+settings.get("launchThreshold",0).toFixed(2);
    document.getElementById("landing-Calibration-view/text").textContent="Landing thr:"+settings.get("landingThreshold",0).toFixed(2);
}
