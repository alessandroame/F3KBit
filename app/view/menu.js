// import * as document from "document";

// export class MenuView{
//     onItemClicked=null;

//     buttonCallbacks = [
//       ["launch/start",   () => import("./views/trigger_test") ],
//       /*["landing/start",  () => import("./views/session")],
//       ["tasks/start",   () => import("./views/cycle")],*/
//     ];
//     constructor (){
//         console.log("MenuView CTOR enter");

//         this.list = document.getElementById("myList");
//         this.items = this.list.getElementsByClassName("tile-list-item");
//         console.log("-----------"+this.items.length);
        

//         buttonCallbacks.forEach((view) => {
//             const [buttonID, viewJSLoader] = view;
          
//             document.getElementById(buttonID).addEventListener("click", () => {
//                 viewJSLoader().then(({ init, update }) => {
//                   init().then(update).catch((err) => {
//                     console.error(`Error loading view: ${err.message}`);
//                   });
//                 }).catch((err) => {
//                   console.error(`Failed to load view JS: ${buttonID} - ${err.message}`);
//                 });
//             });
//          });
//         // this.items.forEach((element, index) => {
//         //   console.log("MenuView item "+index+ " INIT enter");
//         //   let touch = element.getElementById("touch");
//         //   touch.addEventListener("click", (evt) => {
//         //     console.log(`MenuView touched: ${index}`);
//         //     if (this.onItemClicked) this.onItemClicked(index);
//         //   });
//         //   console.log("MenuView item "+index+ " INIT exit");
//         // });

//         console.log("MenuView CTOR exit");
//     }
// }