import { HorizontalAnimationTextCreator } from "../../content/horizontalAnimationTextCreator";
import SlackActionWrapper from "../../slackActionWrapper";
import { ArgsQueue } from "../argsQueue";
import { ArgumentException } from "../argumentException";
import {ICommand} from "../command"

class ScrollCmdOption{
    public constructor(
        public readonly fg: string,
        public readonly stroke: string
    ){}
}


export class ScrollCmd implements ICommand{
    public readonly commandName: string = "scroll";
    private urlOfLastSentGifFile: string = "";

    public get urlOfLastSentGif(){
        return this.urlOfLastSentGifFile;
    }

    public constructor(
        private readonly slackAction: SlackActionWrapper
    ){}

    public async execute(args: ArgsQueue) {
        if (args.canPopArg() === false)throw new ArgumentException("ファイル名を入力してください。");
        const drawingText = args.popArg();

        const option = this.extractOption(args);

        const outputPath = await new HorizontalAnimationTextCreator().create(drawingText, option.fg, option.stroke)
        
        const result = await this.slackAction.uploadFile(drawingText, outputPath);
        
        this.urlOfLastSentGifFile = result.file?.url_private as string;
    }

    private extractOption(args: ArgsQueue) {
        let fg = "#222";
        let stroke = "#fff";

        while (args.canPopArg() === true) {
            const arg = args.popArg();
            if (this.isOption(arg) === false)
                throw new ArgumentException("無効な引数です。");
            switch (arg) {
                case "-fg":
                    fg = args.popArg();
                    break;
                case "-stroke":
                    stroke = args.popArg();
                    break;
            }
        }
        const option = new ScrollCmdOption(fg, stroke);
        return option;
    }

    private isOption(arg: string){
        return arg.length>0 && arg[0]=="-";
    }
}




