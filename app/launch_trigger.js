import { OrientationSensor } from "orientation";

export class LaunchTrigger{
    onLaunchTriggered=null;
    calibrationEnable=false;
    onCalibrated=null;
    onValueChanged=null;
    threshold=3;
    accumulatorSize=20;
    
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
    }

    start(){
        console.log("LaunchTrigger START enter");
        this.accumulator=[];
        this.accumulatorSum=0;
        this.accumulatorSumMax=0;
        this.index=-1;
        this.isStarted=true;
        this.orientation.start();
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
            this.calibrationEnable=false;
            this.onCalibrated(this.threshold);
        }else if (this.onLaunchTriggered){
            this.onLaunchTriggered();
        }
        console.log("LaunchTrigger STOP exit");
    }

    startCalibration(){
        this.calibrationEnable=true;
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
        let angle = Math.atan2(t3, t4);
        //console.log(angle);
        this.accumulate(angle);
        
        if (this.onValueChanged) this.onValueChanged(this.accumulator);
        //console.log(this.accumulatorSum);
        if (this.calibrationEnable){
            this.accumulatorSumMax=Math.max(this.accumulatorSumMax,Math.abs(this.accumulatorSum));
            this.onCalibrating(this.accumulatorSum);
            //console.log(this.accumulatorSum);
        }else{
            if (Math.abs(this.accumulatorSum)>this.threshold) {
                console.log("before on trigger threshold:"+ this.threshold);
                this.stop();
                console.log("before on trigger threshold:"+ this.threshold);
            }
        }
    }

    accumulate(value){
        //console.warn("value: "+value,JSON.stringify(this.accumulator));

        if (!value) value=0;
        this.index++;
        if (this.index>=this.accumulatorSize) {
            this.accumulatorSum-=this.accumulator[0];
            this.index=this.accumulatorSize-1;
            this.accumulator=this.accumulator.slice(1,this.accumulatorSize);
        }
        if (this.lastValue==null)this.lastValue=value;
        
        let diff=this.diff(value,this.lastValue);
        this.accumulatorSum+=diff;

        this.accumulator[this.index]=diff;
        this.lastValue=value;

        //console.log(value+" "+this.index+" "+ this.accumulator[this.index]);
        //console.log("value: "+value,JSON.stringify(this.accumulator));
    }
    
    diff(v1,v2){
        let res=(v1-v2);
        if (Math.abs(res>=2))
        {
            //console.log("v1: "+v1+"v2: "+v2+" res: "+res);
            res=(v1+v2);
           // console.warn("v1: "+v1+"v2: "+v2+" res: "+res);
        }
        //console.error("v1: "+v1+"v2: "+v2+" res: "+res);
        return res;
    }
}