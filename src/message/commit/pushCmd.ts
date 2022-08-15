import SlackActionWrapper from "../../slackActionWrapper";
import { ArgsQueue } from "../argsQueue";
import { ArgumentException } from "../argumentException";
import { ICommand } from "../command";


export class PushCmd implements ICommand{
    public readonly commandName: string = "push";
    private fileUrlToSend: string = "";

    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){}

    public setFileUrlToSend(fileUrl: string){
        this.fileUrlToSend = fileUrl;
        return this;
    }

    public async execute(args: ArgsQueue): Promise<void> {
        if (args.canPopArg() === false) throw new ArgumentException("絵文字名を入力してください。");
        const emojiName = args.popArg();

        if (this.fileUrlToSend===undefined || this.fileUrlToSend===""){
            throw new ArgumentException("送信する画像ファイルがありません。")
        }

        await this.slackAction.addNewEmoji(emojiName, this.fileUrlToSend);
    }
}




