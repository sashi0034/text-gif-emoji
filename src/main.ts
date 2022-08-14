
import {processBotRoutine} from "./processBotRoutine";
import log4js from 'log4js'
import { ImageTester } from "./content/imageTester";

function main(){
    log4js.getLogger().level = "all"
    
    process.on('uncaughtException', function(err) {
        log4js.getLogger().error(err)
    });

    new ImageTester().test();
    //processBotRoutine()
}


main();
