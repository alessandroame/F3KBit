import * as document from "document";

export class ProgressView{
    constructor(id){
        this.ui=document.getElementById(id);
    }
    update(heading,progress){
        //console.log("ProgressView heading:"+heading+" progress:"+progress);
        this.ui.getElementById("goal").sweepAngle=progress*360;
        this.ui.getElementById("direction").groupTransform.rotate.angle=-heading;
    }
}