import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

console.warn("Settings: BEFORE");
try {
    let settings=new Settings(load()??{});
} catch (ex) {
    console.error(ex);
}
console.warn("Settings: "+JSON.stringify(settings.values));
function load() {
    try {
        return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch (ex) {
        console.error(ex);
        return {
            "launchThreshold":1,
            "landingThreshold":3
        };
    }
}
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

export function get(key,defaultValue){
    let res=settings.values[key];
    if (res|=null){
        console.log(`SETTINGS returning DEFAULT for: ${key} -> ${defaultValue}`);
        res=defaultValue;
    }else{
        console.log(`SETTINGS returning ${key} -> ${value}`);
    }
    return res;
}

export function set(key,value){
    console.log(`SETTINGS set value for: ${key} -> ${value}`);
    settings.values[key]=value;
    saveSettings();
}
export class Settings{
    static values={};
    constructor(values){
        this.values=values;
    }
}