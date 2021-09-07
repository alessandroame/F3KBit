import document from "document";
export class AxisWidget{
    constructor (id,min,max){
        this.id=id;
        this.scale=Math.abs(min-max);
        this.offset=(min+max)/2;
    }
    onValueChanged(value){
        // x:100=value:|min-max|
        // x= 100*value/this.scale
        document.getElementById(id).height=this.scale-this.offset;        
    }
}