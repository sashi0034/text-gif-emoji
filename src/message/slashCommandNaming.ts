import { App } from "@slack/bolt";

export default
class SlashCommandNaming{
    public constructor(
        private readonly botName: string
    ){}

    public getName(actionName: string){
        return "/" + this.botName + "-" + actionName;
    }
}