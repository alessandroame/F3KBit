import * as document from "document";

export function initMenuItem(view){
    const [buttonID, viewJSLoader] = view;
    try{
        console.log("preparing view item "+buttonID);
        var item=document.getElementById(buttonID);
        item.onclick=() => {
        viewJSLoader().then(({ init, update }) => {
            init().then(update).catch((err) => {
                console.error(`Error loading view: ${buttonID} - ${err}`);
            });
        }).catch((err) => {
            console.error(`Failed to load view JS: ${buttonID} - ${err}`);
        });
        };
    }catch (error){
        console.error(`error on initMenuItem: ${buttonID} - ${error}`);
    }
}
