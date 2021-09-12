import * as document from "document";
export class ChartView{

    constructor(id){
        console.log("ChartView CTOR enter id["+id+"]");
        this.chart=document.getElementById(id);
        this.items = this.chart.getElementsByClassName("bar");
        this.items.forEach((element, index) => {
            element.height=0;
        });
        console.log("ChartView CTOR exit");
    }

    update(data){
        //console.log(data);
        let xScale=data.length/this.items.length;
        for (let i=0;i<this.items.length;i++)
        {
            let dSum=0;
            for (var n=0;n<xScale;n++){
                let index=Math.floor(i*xScale+n);
                let d=data[index];
                //console.log("d: "+d+" i:"+i+" n:"+n +" xScale:"+xScale+ " index:"+(index));
                dSum+=d;
            }
            var h=400*dSum;
            //console.log("h: "+h+" sum:"+dSum);
            this.items[i].y=-h;
            this.items[i].height=h;
        }
    }
}