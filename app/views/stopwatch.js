import document from "document";
import * as launchTrigger from "./launchTrigger"
import { display } from "display";


export function init(){
  console.log("stopwatch start");
  return document.location.assign("stopwatch.view");
}
export function update(){
  console.log("stopwatch update");
  display.poke();
  document.getElementById("btn-start").addEventListener("click",()=>{
    launchTrigger.init()
    .then(()=>{
      launchTrigger.update();
    })
    .catch((err) => {
      console.error(`Failed to load trigger - ${err}`);
    });
  });
}
