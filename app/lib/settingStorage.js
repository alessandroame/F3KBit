import * as fs from "fs";

export class Settings{
    static SETTINGS_TYPE = "cbor";
    static SETTINGS_FILE = "settings.cbor";
    
    static values=null;
    static get(key,defaultValue){
        console.log(`SETTINGS Get k:${key} def:${defaultValue} ${JSON.stringify(Settings.values)}`);
        Settings.IfFirsCallInitialize();

        let res=Settings.values[key];
        if (res===undefined ){
            console.log(`SETTINGS returning DEFAULT for: ${key} -> ${defaultValue} ${JSON.stringify(Settings.values)}`);
            res=defaultValue;
        }else{
            console.log(`SETTINGS [${key}] return ${res}`);
        }
        return res;
    }

    static set(key,value){
        console.log(`SETTINGS set value for: ${key} -> ${value}`);
        Settings.IfFirsCallInitialize();
        Settings.values[key]=value;
        Settings.save();
    }

    static IfFirsCallInitialize(){
        if (Settings.values==null)Settings.values=Settings.load();
    }

    static load() {
        try {
            var obj= fs.readFileSync(Settings.SETTINGS_FILE, Settings.SETTINGS_TYPE);
            console.log(`SETTINGS loaded: ${JSON.stringify(obj)}`);
            return obj;
        } catch (ex) {
            console.error(ex);
            return { //put here default settings //TODO use as default in getter 
                "launchThreshold":1,
                "landingThreshold":3
            };
        }
    }
    
    static save() {
        console.log(`SETTINGS save: ${JSON.stringify(Settings.values)}`);
        fs.writeFileSync(Settings.SETTINGS_FILE, Settings.values,Settings.SETTINGS_TYPE);
    }

}