import { ChartVM } from "./chart_vm";
import { LaunchProgressVM } from "./launch_progress_vm";
import * as document from "document";
import { LaunchTrigger } from "./launch_trigger";
import { vibration } from "haptics";


export class LaunchTriggerVM{
    chart=new ChartVM("chart");
    progress=new LaunchProgressVM("launch_progress");
    trigger=new LaunchTrigger();
    constructor(){
        let me=this;
        console.log("LaunchTriggerVM CTOR enter");
        me.trigger.onValueChanged=(v)=>{me.chart.update(v);};

        me.trigger.onUpdate=(angle,delta,accumulated)=>{
            //console.log("acc "+accumulated+" thr "+me.trigger.threshold);
            me.progress.update(angle*180,accumulated/me.trigger.threshold*360);
            document.getElementById("title").textContent=angle.toFixed(2)+" | "+delta.toFixed(1)+" | "+accumulated.toFixed(1);
        };

        me.trigger.onLaunchTriggered=()=>{
            vibration.start("confirmation-max");
            vibration.start("confirmation-max");
            vibration.start("confirmation-max");
        };
        me.init();
        console.log("LaunchTriggerVM CTOR exit");
    }

    startSimulatorSensor(){
        let me=this;
        me.simulatedValue=0;
        if (me.simInterval) clearInterval(me.simInterval);
        let timerid=me.simInterval=setInterval(() => {
            me.simulatedValue-=0.2;
            if (me.simulatedValue>0.9999999999) me.simulatedValue=-0.9999999999; 
            if (me.simulatedValue<-0.9999999999) me.simulatedValue=0.9999999999; 
            me.trigger.accumulate(me.simulatedValue);

        }, 100);
        setTimeout(() => {
            clearInterval(timerid);
        }, 5000);
    }

    init(){
        let me=this;
        let startBtn=document.getElementById("startButton");
        let calibrateBtn=document.getElementById("calibrateButton");
        startBtn.onclick= (evt) => {
            console.log("start clicked");
            me.trigger.start();
            //me.startSimulatorSensor();

        };
        calibrateBtn.onclick=(evt) => {
            console.log("calibrate clicked");
            me.trigger.startCalibration();
            //me.startSimulatorSensor();
        };

    }


}