import SlackActionWrapper from "../slackActionWrapper";
import { ArgsQueue } from "./argsQueue";
import { CommitCommand } from "./command/commitCommand";


export class CommandCaller{
    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){}

    public readMessage(message: string){
        if (message===undefined) return;
        
        const args = new ArgsQueue(message);

        if (args.canPopArg()===false) return;
        const head = args.popArg();

        if (head=="commit") new CommitCommand(this.slackAction).execute(args);
    }
}




