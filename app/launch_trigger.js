import { OrientationSensor } from "orientation";
import { Filter } from "./filter";

export class LaunchTrigger{
    onLaunchTriggered=null;
    calibrationEnable=false;
    onCalibrated=null;
    onDataAvailable=null;
    onValueChanged=null;
    threshold=1;
    filter=new Filter(20);
    maxDiff=0.8;
    lastDiff=0;

    constructor(timeoutInSeconds,frequency){
        console.log("LaunchTrigger CTOR enter");
        let me=this;
        me.timeoutInSeconds=timeoutInSeconds??30;

        me.orientation = new OrientationSensor({ frequency: frequency??10 });
        me.orientation.addEventListener("reading", ()=> {
            //sconsole.log("reading");
            me.onOrientationChanged(me.orientation.quaternion);
        });
        console.log("LaunchTrigger CTOR exit");
        this.reset();
    }
    reset(){
        this.filter=new Filter(20);
        this.lastValue=null;
        this.lastDiff=0;
        this.isStarted=false;
    }

    start(){
        console.log("LaunchTrigger START enter");
        this.reset();
        this.orientation.start();
        this.isStarted=true;
        this.timeoutId=setTimeout(() => {
            this.stop();
        }, this.calibrationEnable?5000:this.timeoutInSeconds*1000);
        console.log("LaunchTrigger START exit");
    }

    stop(){
        console.log("LaunchTrigger STOP enter");
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.isStarted=false;
        this.orientation.stop();
        if (this.calibrationEnable && this.onCalibrated) {
            this.onCalibrated(this.threshold);
        }else if (this.onLaunchTriggered){
            this.onLaunchTriggered();
        }
        this.calibrationEnable=false;
        console.log("LaunchTrigger STOP exit");
    }

    startCalibration(){
        this.calibrationEnable=true;
        this.threshold=0;
        this.start();
    }

    onOrientationChanged(q){
        let qr = q[0];
        let qi = q[1];
        let qj = q[2];
        let qk = q[3];
        
        // Yaw:
        let t3 = 2*(qr*qk + qi*qj);
        let t4 = 1 - 2*(qj*qj + qk*qk);
        let angle = Math.atan2(t3, t4)/Math.PI;

        console.log(angle);
        this.accumulate(angle);
        //console.log(angle);
    }

    accumulate(value){
        if (this.lastValue==null) this.lastValue=value;
        let d=this.diff(value,this.lastValue)
        this.filter.push(d);
        if (this.onValueChanged) this.onValueChanged(this.filter.values);
        if (this.calibrationEnable){
            this.threshold=Math.max(this.threshold,this.filter.sum);
            this.onDataAvailable(value,d,this.threshold);
            //console.log(this.accumulatorSum);
        }else{
            this.onDataAvailable(value,d,this.filter.sum);
            
            if (this.filter.sum>this.threshold) {
                console.log("before on trigger threshold:"+ this.threshold);
                this.stop();
                console.log("before on trigger threshold:"+ this.threshold);
            }
        }
        this.lastValue=value;
        //console.log(value+" "+this.index+" "+ this.accumulator[this.index]);
        //console.log("value: "+value,JSON.stringify(this.accumulator));
    }

    diff(newValue,oldValue){
        var res=Math.abs(newValue-oldValue);
        if (res>this.maxDiff) res=this.lastDiff;
        //console.warn(oldValue+ " "+newValue);
        this.lastDiff=res;
        return res;
    }
    
}