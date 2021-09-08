import document from "document";
export class Chart{
    constructor(id){
        this.chart=document.getElementById(id);
    }

    update(data){
        let scale=data.length/10;
        for (let i=0;i<10;i++)
        {
            let dSum=0;
            for (var n=0;n<scale;n++){
                let d=data[i*scale+n];
                if (!d) continue;
                dSum+=d;
            }
            //console.log("__________",data.length+" "+scale,dSum,i);
            if (!dSum||!scale) continue;
            this.chart.getElementById("v"+i).y2=100*dSum/scale;
        }

    }
}