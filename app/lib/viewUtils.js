import * as document from "document";

export function initMenuItem(view){
    const [buttonID, viewJSLoader, initArguments] = view;
    try{
        console.log("preparing view item "+buttonID);
       /* var err = new Error();
        console.warn(err.stack)*/
        var item=document.getElementById(buttonID);
        item.onclick=() => {
        viewJSLoader().then(({ init, update }) => {
            init(initArguments).then(update).catch((err) => {
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

export function replace(view,initOptions,updateOptions){
    try{
        initOptions.replace=true;
        console.log("assign view item "+view);
        view.init(initOptions).then(()=>{
            view.update(updateOptions);
        }).catch((err) => {
            console.error(`Error loading view: ${view} - ${err}`);
        });
    }catch (error){
        console.error(`error on view: ${view} - ${error}`);
    }
}

