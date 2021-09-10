import document from "document";
export class ChartVM{

    constructor(id){
        console.log("ChartVM CTOR enter");
        this.chart=document.getElementById(id);
        this.items = this.chart.getElementsByClassName("bar");
        this.items.forEach((element, index) => {
            element.height=0;
        });
        console.log("ChartVM CTOR exit");
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