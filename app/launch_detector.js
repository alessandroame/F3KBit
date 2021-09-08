import { OrientationSensor } from "orientation";
export class LaunchDetector{
    constructor (onLaunchTriggered) {
        let me=this;
        me.accumulator=[];
        me.accumulatorSum=0;
        me.size=10;
        me.index=-1;
        me.onLaunchTriggered=onLaunchTriggered;
        me.orientation = new OrientationSensor({ frequency: 10 });
        me.orientation.addEventListener("reading", ()=> {
            me.onOrientationChanged(me.orientation.quaternion);
        });
        me.calibrationMode=false;
        this.lastValue=null;
        this.isStarted=false;
    }
        
    start(threshold){
        this.threshold=threshold??2;
        this.accumulator=[];
        this.accumulatorSum=0;
        this.accumulatorSumMax=0;
        this.index=-1;
        this.isStarted=true;
        this.orientation.start();
    }

    stop(){
        this.isStarted=false;
        this.orientation.stop();
        this.calibrationMode=false;
    }

    toggle(){
        if (this.isStarted) this.stop();
        else this.start();
    }

    calibrate(onCalibrating,onCalibrated){
        let me=this;
        this.start();
        this.calibrationMode=true;
        this.onCalibrating=onCalibrating;
        this.onCalibrated=onCalibrated;
        setTimeout(() => {
            me.threshold=me.accumulatorSumMax;
            me.onCalibrated(me.accumulatorSumMax);
        }, 5000);
    }
    setChart(chart){
        this.chart=chart;
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
        
        if (this.chart!=null) this.chart.update(this.accumulator);
        
        /*let sum=0;
        this.accumulator.forEach(element => {
            sum+=element;
        });*/
        
        //console.log(this.accumulatorSum);
        if (this.calibrationMode){
            this.accumulatorSumMax=Math.max(this.accumulatorSumMax,Math.abs(this.accumulatorSum));
            this.onCalibrating(this.accumulatorSum);
            //console.log(this.accumulatorSum);
        }else{
            if (Math.abs(this.accumulatorSum)>this.threshold) {
                console.log("before on trigger threshold:"+ this.threshold);
                this.onLaunchTriggered();
            }
        }
    }

    accumulate(value){
        //console.warn("value: "+value,JSON.stringify(this.accumulator));

        if (!value) value=0;
        this.index++;
        if (this.index>=this.size) {
            this.accumulatorSum-=this.accumulator[0];
            this.index=this.size-1;
            this.accumulator=this.accumulator.slice(1,this.size);
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