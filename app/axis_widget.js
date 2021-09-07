import document from "document";
export class AxisWidget{
    
    constructor (id,min,max){
        this.bar=document.getElementById(id).getElementById("bar")
        this.scale=Math.abs(min-max);
        this.offset=(min+max)/2;
        console.error("----------"+id);
    }
    onValueChanged(value){
        // x:100=value:|min-max|
        // x= 100*value/this.scale
        let scaled=100*(value-this.offset)/this.scale;
        console.log(value+" "+scaled);
        this.bar.style.fill=(scaled>0)?"green":"red";
        this.bar.width=Math.abs(Math.abs(scaled));        
    }
}