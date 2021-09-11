import * as document from "document";
export class ChartView{

    constructor(id){
        console.log("ChartView CTOR enter id["+id+"]");
        this.chart=document.getElementById(id);
        console.log("calibration update "+this.chart);
        this.items = this.chart.getElementsByClassName("bar");
        this.items.forEach((element, index) => {
            element.height=0;
        });
        console.log("ChartView CTOR exit");
    }

    update(data){
        //console.log(typeof this,this,this.chart);
        //console.log(data);
        let xScale=data.length/this.items.length;
        for (let i=0;i<this.items.length;i++)
        {
            let dSum=0;
            for (var n=0;n<xScale;n++){
                let d=data[i*xScale+n];
                if (!d) continue;
                dSum+=d;
            }
            //console.log(dSum+"  "+xScale);

            var h=400*dSum;
            this.items[i].y=-h;
            this.items[i].height=h;
        }
    }
}