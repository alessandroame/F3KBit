import { initMenuItem } from "./lib/viewUtils";
import * as document from "document";
import { me } from "appbit";

me.appTimeoutEnabled = false; // Disable timeout

let ImOnTopOfNavigationStack=document.history.length<2;
if(ImOnTopOfNavigationStack){
  console.error("Main menu started");
  const buttonCallbacks = [
    ["stopwatch-view/start",   () => import("./views/stopwatch")],
    //["stopwatch-view/start",   () => import("./views/launchCalibration")],
    ["single-task-view/start",  () => import("./views/singleTask")],
    ["settings-view/start",   () => import("./views/settings")]
  ];
  buttonCallbacks.forEach(initMenuItem);
}

document.onload=()=>{
  document.error("document.onload");
}
document.onreload=()=>{
  document.error("document.onREload");
}