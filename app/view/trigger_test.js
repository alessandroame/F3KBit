import * as document from "document";
import { ChartView } from "../widget/chart";
import { ProgressView } from "../widget/progress";
import { TouchSliderView } from "../widget/touch_slider";
import { Trigger } from "../lib/trigger";
import { vibration } from "haptics";


export function init(){
    console.log("session-view start");
    return document.location.assign('trigger_test.view');
    chart=new ChartView("chart");
    progress=new ProgressView("progress");
    touchSlider=new TouchSliderView("touch_slider");
    trigger;
}



export class TriggerTestView{

    constructor(sensor,axis){
        let me=this;
        console.log("TriggerTestView CTOR enter "+(typeof sensor)+ " axis:"+axis);
        me.trigger=new Trigger(sensor,axis);
     
        me.trigger.onUpdate=(trigger,value,delta)=>{
            let angle=value*180;
            let sum=trigger.filter.sum;
            //console.log("acc "+accumulated+" thr "+me.trigger.threshold);
            me.progress.update(angle,sum/me.trigger.threshold*360);
            document.getElementById("delta").textContent=delta.toFixed(1);
            document.getElementById("accumulated").textContent=sum.toFixed(1);
            document.getElementById("threshold").textContent=this.trigger.threshold.toFixed(1);
            me.chart.update(trigger.filter.values);
        };

        me.trigger.onTrigger=(t)=>{
            t.stop()
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
            if (me.trigger.isStarted) me.trigger.push(v); 
        };
        me.init();
        console.log("TriggerTestView CTOR exit");
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