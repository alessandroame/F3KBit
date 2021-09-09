import * as document from "document";

export class LaunchProgressVM{
    constructor(id){
        this.ui=document.getElementById(id);
    }
    update(heading,progress){
        //console.log("heading "+heading);
        //console.log("progress "+progress);
        this.ui.getElementById("progress").sweepAngle=progress;
        this.ui.getElementById("direction").groupTransform.rotate.angle=heading;
    }
}