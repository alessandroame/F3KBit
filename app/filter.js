export class Filter{
    constructor(size){
        this.size=size;
        this.reset();
    }

    reset(){
        this.values=[];
        this.sum=0;
        this.avg=0;
        for (var i=0;i<this.size;i++)this.values[i]=0;
    }

    push(value){
        console.log(value);
        this.sum-=this.values[0];
        this.values=this.values.slice(1,this.size);
        this.values[this.size-1]=value;
        this.sum+=value;
        this.avg=this.sum/this.size;
    }

}