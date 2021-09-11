import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings=load()??{};
console.warn("Settings: "+JSON.stringify(settings));
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
    return settings[key]??defaultValue;
}

export function set(key,value){
    settings[key]=value;
    saveSettings();
}
