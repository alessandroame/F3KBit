import { initMenuItem } from "./lib/menu";

console.log("F3KBit started");

const buttonCallbacks = [
  ["stopwatch-view/start",   () => import("./views/stopwatch")],
  ["single-task-view/start",  () => import("./views/singleTask")],
  ["settings-view/start",   () => import("./views/settings")]
];
buttonCallbacks.forEach(initMenuItem);
