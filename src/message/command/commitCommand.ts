
import SlackActionWrapper from "../../slackActionWrapper";
import { ArgsQueue } from "../argsQueue";
import { ICommand } from "./command";

export class CommitCommand implements ICommand{
    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){}

    public execute(args: ArgsQueue): void {
        while (args.canPopArg()===true){
            const arg = args.popArg()
            this.slackAction.postMessage(arg)
            console.log(arg)
        }
    }

}