import { display } from "display";
import { OrientationSensor } from "orientation";

export class PitchController{
  
  orientation = new OrientationSensor({ frequency: 25 });
  
  constructor(){
    let me=this;
    me.orientation.onreading = function() {
      me.onOrientationChanged(me.orientation.quaternion);
    };
    me.start();
    display.onchange = function() {
      if (display.on) {
        me.start();
      }else{
        me.orientation.stop();
      }
    }
    console.log("PitchController initialized");
  }
  
  start(){
    var me=this;
    setTimeout(function(){me.orientation.start();},800);
  }

  onPitchChanged=function(value){
    console.log("onPitchChanged:"+value);
  }
  
  onOrientationChanged(q){
    let qr = q[0];
    let qi = q[1];
    let qj = q[2];
    let qk = q[3];

    let t0 = 2 * (qr*qi + qj*qk);
    let t1 = 1 - 2*(qi*qi + qj*qj);
    this.onPitchChanged(Math.atan2(t0, t1));
  }
}
