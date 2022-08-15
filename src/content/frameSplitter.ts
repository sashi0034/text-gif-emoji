import { DrewResult, TextToImage } from "./textToImage";
import sharp, { OutputInfo } from "sharp"
import { assureExistDirectory } from "../util/utilFunction";

export class FrameSplitter{
    public constructor(
        public readonly numFrame: number,
        public readonly frameDirectory: string
    ){
        assureExistDirectory(frameDirectory);
    }

    public async splitImageToFrames(textImage: TextToImage, result: DrewResult){
        const baseSize = textImage.baseSize;
        const numFrame = this.numFrame;
        const stepWidth = (result.drewWidth + baseSize) / (numFrame - 1);

        // キャッシュを消さないと、ファイルを変更してもキャッシュから読みこまれるため変更されない
        sharp.cache({ files : 0 });

        const outputPathList: string[] = []
        let taskList: Promise<OutputInfo>[] = []
        for (let frameIndex=0; frameIndex<numFrame; ++frameIndex){
            const path = this.frameDirectory +"/" + frameIndex +".png"
            outputPathList.push(path)

            
            const task = sharp(textImage.outputPath)
            .extract({
                top: 0,
                left: this.calcLeftOfFrame(frameIndex, stepWidth, baseSize, result.capacityWidth),
                width: baseSize,
                height: baseSize
            })
            .toFile(path);
            taskList.push(task)
        }

        await Promise.all(taskList)
        
        return outputPathList
    }

    private calcLeftOfFrame(frameIndex: number, stepWidth: number, baseSize: number, capacityWidth: number): number {
        let left = Math.floor(frameIndex * stepWidth - baseSize) 
        if (left<0) return left = 0;
        if (left > capacityWidth - baseSize-1) return left = capacityWidth - baseSize-1;
        return left;
    }
}