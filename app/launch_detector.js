import { OrientationSensor } from "orientation";
export class LaunchDetector{
    constructor (onLaunchTriggered,timeout) {
        let me=this;
        me.accumulator=[];
        me.size=10;
        me.index=0;
        me.onLaunchTriggered=onLaunchTriggered;
        me.orientation = new OrientationSensor({ frequency: 4 });
        me.orientation.addEventListener("reading", ()=> {
            me.onOrientationChanged(me.orientation.quaternion);
        });
        me.calibrationMode=false;
        this.lastValue=null;
    }
        
    start(){
        this.orientation.start();
    }

    stop(){
        this.orientation.stop();
        this.calibrationMode=false;
    }

    calibrate(onCalibrated){
        this.start();
        this.calibrationMode=true;
        this.onCalibrated=onCalibrated;
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
        
        if (this.accumulator.length<this.size) return;
        
        if (this.chart!=null) this.chart.update(this.accumulator);
        
        let sum=0;
        this.accumulator.forEach(element => {
            sum+=element;
        });
        console.log(sum);

        if (Math.abs(sum)>2.5) this.onLaunchTriggered();
    }

    accumulate(value){
        if (!value) value=0;
        this.index++;
        if (this.index>=this.size) {
            this.index=this.size-1;
            this.accumulator=this.accumulator.slice(1,this.index);
        }
        if (this.lastValue==null)this.lastValue=value;
        this.accumulator[this.index]=this.diff(value,this.lastValue);
        this.lastValue=value;
        //console.log(value+" "+this.index+" "+ this.accumulator[this.index]);
        //console.log(value,JSON.stringify(this.accumulator));
    }
    
    diff(v1,v2){
        let res=Math.abs(v1-v2);
        if (res>1)
        {
            res=Math.abs(v1+v2);
            //console.log("++++++++",v1,v2,res);
        }// else
            //console.log("--------",v1,v2,res);
        return res;
    }

}