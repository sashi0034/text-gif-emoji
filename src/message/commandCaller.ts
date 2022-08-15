import SlackActionWrapper from "../slackActionWrapper";
import { ArgsQueue } from "./argsQueue";
import { ArgumentException } from "./argumentException";
import { PushCmd } from "./commit/pushCmd";
import { ScrollCmd } from "./commit/scrollCmd";
import log4js from "log4js";


export class CommandCaller{
    private readonly scrollCmd;
    private readonly pushCmd;

    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){
        this.scrollCmd = new ScrollCmd(this.slackAction);
        this.pushCmd = new PushCmd(this.slackAction);
    }

    public readMessage(message: string){
        if (message===undefined) return;
        
        const args = new ArgsQueue(message);

        if (args.canPopArg()===false) return;
        const head = args.popArg();

        try{
            if (head===this.scrollCmd.commandName) this.scrollCmd.execute(args);
            if (head===this.pushCmd.commandName) this.pushCmd.setFileUrlToSend(this.scrollCmd.urlOfLastSentGif).execute(args);    
        }catch (e: unknown){
            if (e instanceof ArgumentException) {
                this.slackAction.postMessage(e.message);
            }else {
                this.slackAction.postMessage("予期せぬエラーが発生しました。");
            }
            log4js.getLogger().error(e);
        }
    }
}




