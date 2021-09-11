import { initMenuItem } from "./lib/menu";

console.log("F3KBit started");

const buttonCallbacks = [
//  ["stopwatch-view/start",   () => import("./views/stopwatch")],
  ["stopwatch-view/start",   () => import("./views/launchCalibration")],
  ["single-task-view/start",  () => import("./views/singleTask")],
  ["settings-view/start",   () => import("./views/settings")]
];
buttonCallbacks.forEach(initMenuItem);
