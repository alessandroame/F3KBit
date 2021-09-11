
import document from "document";

export function init(){
    console.log("stopwatch start");
  return document.location.assign("stopwatch.view");
}
export function update(){
    console.log("stopwatch update");
}