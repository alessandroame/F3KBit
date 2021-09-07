import * as scientific from "scientific";
export class AngleObserver{
    constructor (onUpdate) {
        this.accumulator=[];
        this.size=20;
        this.index=0;
        this.onUpdate=onUpdate;
    }
        
    onOrientationChanged(value){
        if (this.index>this.size) {
            this.accumulator=this.accumulator.slice(1,this.index);
            this.index=this.size;
        }
        else{
            this.index++;
        }
        this.accumulator[this.index]=value.toFixed(0)*1;
        //console.log(JSON.stringify(this.accumulator));
        this.update();
    }

    update(){
        var diff=0;
        var lastValue=this.accumulator[0];
        for (let i=1;i<this.accumulator.length;i++)
        {
            diff+=this.accumulator[i]-lastValue;
            lastValue=this.accumulator[i];
        }
        this.onUpdate(diff);
        //diff=diff/this.index;
        //console.warn("diff: "+diff);
    }

}