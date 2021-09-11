
import * as document from "document";

export function initMenuItem(view){
    const [buttonID, viewJSLoader] = view;
    try{
        console.log("preparing "+buttonID);
        var item=document.getElementById(buttonID);
        item.addEventListener("click", () => {
        viewJSLoader().then(({ init, update }) => {
            init().then(update).catch((err) => {
            console.error(`Error loading view: ${err.message}`);
            });
        }).catch((err) => {
            console.error(`Failed to load view JS: ${buttonID} - ${err.message}`);
        });
        });
    }catch (error){
        console.error(`error on initMenuItem: ${buttonID} - ${error}`);
    }
}
