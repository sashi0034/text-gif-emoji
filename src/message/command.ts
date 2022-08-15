import { ArgsQueue } from "./argsQueue";

export interface ICommand{
    readonly commandName: string;
    execute(args: ArgsQueue): Promise<void>
}

