import * as fs from "fs";

class _Settings{
    static values={};
    constructor(values){
        this.values=values;
    }
}

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";
let settings=new _Settings(load()??{});
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
    fs.writeFileSync(SETTINGS_FILE, settings.values, SETTINGS_TYPE);
}

export function get(key,defaultValue){
    let res=settings.values[key];
    if (res===undefined ){
        console.log(`SETTINGS returning DEFAULT for: ${key} -> ${defaultValue} ${JSON.stringify(settings.values)}`);
        res=defaultValue;
    }else{
        console.log(`SETTINGS [${key}] return ${res}`);
    }
    return res;
}

export function set(key,value){
    console.log(`SETTINGS set value for: ${key} -> ${value}`);
    settings.values[key]=value;
    saveSettings();
}
