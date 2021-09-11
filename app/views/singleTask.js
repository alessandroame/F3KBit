
import document from "document";

export function init(){
    console.log("singletask start");
    return document.location.assign("singleTask.view");
}
export function update(){
    console.log("singletask update");
}