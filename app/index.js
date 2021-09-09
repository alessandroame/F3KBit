import * as document from "document";
import { display } from "display";
import { vibration } from "haptics";
import {me} from "appbit";
import { MenuVM } from "./menu_vm";
import { LaunchTriggerVM } from "./launch_trigger_vm";

me.appTimeoutEnabled = false;

navigate("menu.view",()=>{
  let menu=new MenuVM();
  menu.onItemClicked=(i)=>{
    console.log(`menu.onItemClicked ${i}`);
    switch (i) {
      case 0:
        openLaunchTrigger();
        break;
      default:
        console.warn(`menu.onItemClicked unhandled item #${i}`);
    }
  }
});

function openLaunchTrigger(){
  console.log("openLaunchTrigger enter");
  navigate("launch_trigger.view",()=>{
    var lt=new LaunchTriggerVM();
  });
  console.log("openLaunchTrigger exit");
}

function navigate(view,onViewCreated){
  document.location.replace(view).then(()=>{
    console.log("view: "+view+" loaded enter");
    onViewCreated();
    console.log("view: "+view+" loaded exit");
  }).catch(err => { console.error("navigate "+view+" throws: "+err) });
}


function modal(view,onViewCreated){
  document.location.assign(view).then(()=>{
    console.log("modal "+view+" loaded enter");
    onViewCreated();
    console.log("modal "+view+" loaded exit");
  }).catch(err => { console.error("modal "+view+" throws: "+err) });
}