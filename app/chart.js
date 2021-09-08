import document from "document";
export class Chart{
    constructor(id){
        this.chart=document.getElementById(id);
    }

    update(data){
        for (let i=0;i<10;i++)
        {
            if (!data[i]) continue;
            this.chart.getElementById("v"+i).y2=100*data[i];
        }

    }
}