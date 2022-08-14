import { ArgsQueue } from "../argsQueue";

export interface ICommand{
    execute(args: ArgsQueue): void
}

