
import * as document from "document";
import * as settings from "../lib/settingStorage";
import { initMenuItem } from "../lib/menu";

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

    document.getElementById("launch-Calibration-view/text").textContent="Launch thr:"+settings.get("launchThreshold","ND");
}
