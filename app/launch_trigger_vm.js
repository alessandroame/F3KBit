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
        me.trigger.onDataAvailable=(v,d,sum)=>{
            document.getElementById("title").textContent=v.toFixed(2)+" | "+d.toFixed(1)+" | "+sum.toFixed(1);
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
            if (me.simulatedValue>Math.PI) me.simulatedValue=-Math.PI; 
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