import document from "document";
import { OrientationSensor } from "orientation";
import { AxisWidget } from "./axis_widget";
import { display } from "display";
import { AngleObserver } from "./angle_observer";

display.autoOff = false;

let inputs=[
    document.getElementById("i0"),
    document.getElementById("i1"),
    document.getElementById("i2"),
    document.getElementById("i3")
];
  
let outputs=[
    document.getElementById("o0"),
    document.getElementById("o1"),
    document.getElementById("o2"),
    document.getElementById("o3")
];

let angles=[0,0,0,0];

let controller = document.getElementById("controller");
controller.onmousemove = function(evt) {
  let v=(evt.screenY-150)/150;
  if (v<0) v=-1-v;
  else v=1-v;

  var angle=v*360-180;
  ao.onOrientationChanged(angle);
}

let az=new AxisWidget("axisZ",-180,180);
var ao=new AngleObserver((v)=>{
  //console.log(v);
  az.onValueChanged(v);
});
//TODO

let orientation = new OrientationSensor({ frequency: 10 });
orientation.onreading = function() {
    onOrientationChanged(orientation.quaternion);
  };
orientation.start();

function onOrientationChanged(q){
  let qr = q[0];
  let qi = q[1];
  let qj = q[2];
  let qk = q[3];
  
  angles[0]=qr;
  // Roll:
  let t0 = 2 * (qr*qi + qj*qk);
  let t1 = 1 - 2*(qi*qi + qj*qj);
  angles[1] = Math.atan2(t0, t1);

  // Pitch:
  let t2 = 2 * (qr*qj - qk*qi);
  t2 = t2 > 1 ? 1 : t2;
  t2 = t2 < -1 ? -1 : t2;
  angles[2] = Math.asin(t2);

  // Yaw:
  let t3 = 2*(qr*qk + qi*qj);
  let t4 = 1 - 2*(qj*qj + qk*qk);
  angles[3] = Math.atan2(t3, t4);
  
  for (var i=0;i<4;i++){
    inputs[i].text=q[i].toFixed(2);
    outputs[i].text=toDegrees(angles[i]);
  }
  ao.onOrientationChanged(angles[4]);
  az.onValueChanged(angles[4]);
}


function toDegrees(value){
  let res=value*180/Math.PI;
  return res.toFixed(0);
}



