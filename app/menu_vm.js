import * as document from "document";

export class MenuVM{
    onItemClicked=null;

    constructor (){
        console.log("Menu CTOR");

        this.list = document.getElementById("myList");
        this.items = this.list.getElementsByClassName("list-item");
        console.log("-----------"+this.items.length);
        
        this.items.forEach((element, index) => {
            console.log("item "+index+ " initializing");
          let touch = element.getElementById("touch");
          touch.addEventListener("click", (evt) => {
            console.log(`touched: ${index}`);
            if (this.onItemClicked) this.onItemClicked(index);
          });
        });

    }
}