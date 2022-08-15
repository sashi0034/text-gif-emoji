import SlackActionWrapper from "../slackActionWrapper";
import { ArgsQueue } from "./argsQueue";
import { ScrollCmd } from "./commit/scrollCmd";


export class CommandCaller{
    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){}

    public readMessage(message: string){
        if (message===undefined) return;
        
        const args = new ArgsQueue(message);

        if (args.canPopArg()===false) return;
        const head = args.popArg();

        const scroll = new ScrollCmd(this.slackAction);
        if (head==scroll.commandName) new ScrollCmd(this.slackAction).execute(args);
    }
}




