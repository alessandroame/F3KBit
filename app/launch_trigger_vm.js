import { ChartVM } from "./chart_vm";
import * as document from "document";
import { LaunchTrigger } from "./launch_trigger";
import { vibration } from "haptics";


export class LaunchTriggerVM{
    chart=new ChartVM("chart");
    trigger=new LaunchTrigger();
    constructor(){
        let me=this;
        console.log("LaunchTriggerVM CTOR enter");
        me.trigger.onValueChanged=(v)=>{me.chart.update(v);};
        me.trigger.onCalibrating=(v)=>{
            document.getElementById("title").textContent="max: "+v.toFixed(1);
        };
        me.trigger.onLaunchTriggered=()=>{
            vibration.start("confirmation-max");
        };
        me.init();
        console.log("LaunchTriggerVM CTOR exit");
    }

    init(){
        let me=this;
        let startBtn=document.getElementById("startButton");
        let calibrateBtn=document.getElementById("calibrateButton");
        startBtn.onclick= (evt) => {
            console.log("start clicked");
            me.trigger.start();
        };
        calibrateBtn.onclick=(evt) => {
            console.log("calibrate clicked");
            me.trigger.startCalibration();
        };

    }


}