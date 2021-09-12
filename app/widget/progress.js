import * as document from "document";

export class ProgressView{
    constructor(id){
        this.ui=document.getElementById(id);
        this.ui.getElementById("direction").style.display="none";//only for debug
    }
    update(heading,progress){
        //console.log("ProgressView heading:"+heading+" progress:"+progress);
        this.ui.getElementById("goal").sweepAngle=progress*360;
        //this.ui.getElementById("direction").groupTransform.rotate.angle=-heading;//only for debug
    }
}