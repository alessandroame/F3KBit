import { ChartVM } from "./chart_vm";
import { LaunchProgressVM } from "./launch_progress_vm";
import * as document from "document";
import { LaunchTrigger } from "./launch_trigger";
import { TouchSliderVM } from "./touch_slider_vm";
import { vibration } from "haptics";


export class LaunchTriggerVM{
    chart=new ChartVM("chart");
    progress=new LaunchProgressVM("launch_progress");
    trigger=new LaunchTrigger();
    touchSlider=new TouchSliderVM("touch_slider");

    constructor(){
        let me=this;
        console.log("LaunchTriggerVM CTOR enter");
        me.trigger.onValueChanged=(v)=>{me.chart.update(v);};

        me.trigger.onUpdate=(angle,delta,accumulated)=>{
            //console.log("acc "+accumulated+" thr "+me.trigger.threshold);
            me.progress.update(angle*180,accumulated/me.trigger.threshold*360);
            document.getElementById("delta").textContent=delta.toFixed(1);
            document.getElementById("accumulated").textContent=accumulated.toFixed(1);
            document.getElementById("threshold").textContent=this.trigger.threshold.toFixed(1);
        };

        me.trigger.onLaunchTriggered=()=>{
            document.getElementById("title").textContent="Launch triggered!";
            vibration.start("confirmation-max");
        };

        me.trigger.onCalibrated=()=>{
            document.getElementById("title").textContent="Calibrated: "+me.trigger.threshold;
            vibration.start("confirmation-max");
        }
        /*me.trigger.onCalibrating=()=>{
            document.getElementById("title").textContent="Calibrating: "+me.trigger.threshold;
        }*/


        me.touchSlider.onUpdate=(v)=>{ 
            if (me.trigger.isStarted) me.trigger.accumulate(v); 
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
            document.getElementById("title").textContent="Detecting";
        };
        calibrateBtn.onclick=(evt) => {
            console.log("calibrate clicked");
            me.trigger.startCalibration();
            document.getElementById("title").textContent="Calibrating";
        };

    }


}