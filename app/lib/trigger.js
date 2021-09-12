import { Filter } from "./filter";
import { OrientationSensor } from "orientation";

export class Trigger{
    onTrigger=null;
    onCalibrated=null;
    onUpdate=null;
    
    axisToObserve=null; 
    filter;
    maxDiff=1;
    threshold=null;
    lastValue=null;
    filterSize=20;

    constructor(axisToObserve,timeoutInSeconds,frequency,fitlterSize,threshold){
        console.log("Trigger CTOR enter THR:"+threshold );
        let me=this;

        me.threshold=threshold??0.1;
        me.axisToObserve=axisToObserve;
        me.timeoutInSeconds=timeoutInSeconds??30;
        me.filterSize=fitlterSize??20;

        me.sensor = new OrientationSensor({ frequency: frequency??20 });
        me.sensor.addEventListener("reading", ()=> {
            me.onOrientationChanged(me.sensor.quaternion);
        });

        this.reset();
        console.log("Trigger CTOR exit");
    }

    reset(){
        this.filter=new Filter(this.filterSize);
        this.lastValue=null;
        this.isStarted=false;
    }

    start(){
        console.log("Trigger START enter THR:"+this.threshold);
        this.reset();
        this.sensor.start();
        this.isStarted=true;
        this.timeoutId=setTimeout(() => {
            this.stop();
        }, this.calibrationEnable?5000:this.timeoutInSeconds*1000);
        console.log("Trigger START exit");
    }

    stop(){
        console.log("Trigger STOP enter");
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.isStarted=false;
        this.sensor.stop();
        if (this.calibrationEnable && this.onCalibrated) {
            console.log("new threshold is "+this.threshold)
            this.onCalibrated(this.threshold);
        }else if (this.onTriggered){
            this.onTriggered();
        }
        this.calibrationEnable=false;
        console.log("Trigger STOP exit");
    }

    startCalibration(){
        this.calibrationEnable=true;
        this.threshold=0.001;
        this.start();
    }

    onOrientationChanged(q){
        let qr = q[0];
        let qi = q[1];
        let qj = q[2];
        let qk = q[3];
  
        let angle=0;
        switch (this.axisToObserve){
            case 1:
                // Roll:
                let t0 = 2 * (qr*qi + qj*qk);
                let t1 = 1 - 2*(qi*qi + qj*qj);
                angle = Math.atan2(t0, t1);
                 break;
            case 2:
                // Pitch:
                let t2 = 2 * (qr*qj - qk*qi);
                t2 = t2 > 1 ? 1 : t2;
                t2 = t2 < -1 ? -1 : t2;
                angle = Math.asin(t2);
                break;
            case 3:
                // Yaw:
                let t3 = 2*(qr*qk + qi*qj);
                let t4 = 1 - 2*(qj*qj + qk*qk);
                angle = Math.atan2(t3, t4);
                break;
            default:
                console.error("Unhandled axis:"+this.axisToObserve);
                return;
        }

        this.push(angle);
        //console.log("axis ["+this.axisToObserve+"]="+angle);
    }

    push(value){
        if(this.lastValue==null){ 
            this.lastValue=value;
            return;
        }

        let delta=this.diff(value,this.lastValue);
        this.filter.push(delta);
        
        if (this.onUpdate) this.onUpdate(this,value,delta);

        if (this.calibrationEnable){
            this.threshold=Math.max(this.threshold,this.filter.sum);
       }else{
            if (this.filter.sum>this.threshold) {
                if (this.onTrigger) this.onTrigger(this);
            }
        }
        this.lastValue=value;
    }

    diff(newValue,oldValue){
        var res=Math.abs(newValue-oldValue);
        if (res>0.9) {
            res=2-res;
        }
        return res;
    }
    
}