import { OrientationSensor } from "orientation";
import { Filter } from "./filter";

export class LaunchTrigger{
    onLaunchTriggered=null;
    calibrationEnable=false;
    onCalibrated=null;
    onUpdate=null;
    onValueChanged=null;
    threshold=1;
    filter=new Filter(20);
    maxDiff=0.8;
    lastDiff=0;

    constructor(timeoutInSeconds,frequency){
        console.log("LaunchTrigger CTOR enter");
        let me=this;
        me.timeoutInSeconds=timeoutInSeconds??30;

        me.orientation = new OrientationSensor({ frequency: frequency??20 });
        me.orientation.addEventListener("reading", ()=> {
            //sconsole.log("reading");
            me.onOrientationChanged(me.orientation.quaternion);
        });
        console.log("LaunchTrigger CTOR exit");
        this.reset();
    }
    reset(){
        this.filter=new Filter(20);
        this.lastAngle=null;
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
            console.log("new threshold is "+this.threshold)
            this.onCalibrated(this.threshold);
        }else if (this.onLaunchTriggered){
            this.onLaunchTriggered();
        }
        this.calibrationEnable=false;
        console.log("LaunchTrigger STOP exit");
    }

    startCalibration(){
        this.calibrationEnable=true;
        this.threshold=0.000000001;
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
        let angle = Math.atan2(t3, t4)/Math.PI; //range -1 to 1
        this.accumulate(angle);
        //console.log(angle);
    }

    accumulate(angle){
        //console.log(angle);
        if (this.lastAngle==null) this.lastAngle=angle;

        let delta=this.diff(angle,this.lastAngle);
        this.filter.push(delta);
        if (this.onValueChanged) this.onValueChanged(this.filter.values);
        if (this.calibrationEnable){
            this.threshold=Math.max(this.threshold,this.filter.sum);
            if (this.onUpdate) this.onUpdate(angle,delta,this.threshold);
        }else{
            
            if (this.filter.sum>this.threshold) {
                console.log("before on trigger threshold:"+ this.threshold);
                this.stop();
                console.log("before on trigger threshold:"+ this.threshold);
            }
            if (this.onUpdate) this.onUpdate(angle,delta,this.filter.sum);
        }
        this.lastAngle=angle;
        //console.log(angle+" "+delta+" "+ this.filter.sum);
    }

    diff(newValue,oldValue){
        var res=Math.abs(newValue-oldValue);
        //console.log(res);
        if (res>1) {
            res=2-res;
          //  console.warn("complementar "+ res);
        }
        this.lastDiff=res;
        return res;
    }
    
}