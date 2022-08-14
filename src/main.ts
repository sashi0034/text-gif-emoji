
import {processBotRoutine} from "./processBotRoutine";
import log4js from 'log4js'
import { HorizontalAnimationTextCreator } from "./content/horizontalAnimationTextCreator";

function main(){
    log4js.getLogger().level = "all"
    
    process.on('uncaughtException', function(err) {
        log4js.getLogger().error(err)
    });

    new HorizontalAnimationTextCreator().create("こんにちは、世界さん", "#fff", "#222");
    //processBotRoutine()
}


main();
