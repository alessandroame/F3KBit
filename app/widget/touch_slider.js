import * as document from "document";

export class TouchSliderView{
    onUpdate=null;
    constructor(id){
        let me=this;
        console.log("TouchSliderView CTOR enter");
        let control=document.getElementById(id);
        control.getElementById("touch").onmousemove = (evt)=>{me.update(evt);};
        console.log("TouchSliderView CTOR exit");
    }

    update(evt){
        let v=((evt.screenX/336)*5)%2-1;
        if (this.onUpdate) this.onUpdate(v);
    }
}