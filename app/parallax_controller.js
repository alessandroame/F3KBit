import { PitchController } from "./pitch_controller"

export class ParallaxController{
  
  constructor(maxDelta,maxOutput){
    let me=this;
    this.maxDelta=maxDelta;
    this.maxOutput=maxOutput/2;
    this.offset=0;
    var pitchController=new PitchController();
    pitchController.onPitchChanged=function(pitch){
      me.onInputChanged(pitch/Math.PI);
    }
    console.log("ParallaxController initialized maxDelta:"+this.maxDelta+" maxOutput:"+this.maxOutput);
  }
   
  onParallaxChanged=function(value,pitch,pitchCenter){
    console.log("onParallaxChanged:"+value);
  }
   
  onInputChanged(value){
    if (!this.center) this.center=value; 
  
    if (value<0 && this.center>0){
      this.center=-1+this.offset;
    }else if (value>0 && this.center<0){
      this.center=1+this.offset;
    }
    
    this.offset=this.center-value;
    let d=this.offset<0?1:-1;
    if (Math.abs(this.offset)>this.maxDelta){
      console.log("!!!!!!!!!!!!");
      this.center=value-this.maxDelta*d;
    }
    
    var k=this.maxOutput/this.maxDelta;
    let res=(this.center-value)*k;
    this.onParallaxChanged(res,value,this.center);
    console.log("i:"+value+" c:"+this.center+" o:"+res+" off:"+this.offset);
  }
 
}