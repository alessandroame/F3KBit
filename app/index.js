import { initMenuItem } from "./lib/viewUtils";
import * as document from "document";

let ImOnTopOfNavigationStack=document.history.length<2;
if(ImOnTopOfNavigationStack){
  console.log("Main menu started");
  const buttonCallbacks = [
    ["stopwatch-view/start",   () => import("./views/stopwatch")],
    //["stopwatch-view/start",   () => import("./views/launchCalibration")],
    ["single-task-view/start",  () => import("./views/singleTask")],
    ["settings-view/start",   () => import("./views/settings")]
  ];
  buttonCallbacks.forEach(initMenuItem);
}else{
  //console.error("Main menu skipped "+document.history.length);
}
