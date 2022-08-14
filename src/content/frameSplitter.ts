import { DrewResult, TextToImage } from "./textToImage";
import sharp from "sharp"
import { assureExistDirectory } from "../util/utilFunction";

export class FrameSplitter{
    public constructor(
        public readonly numFrame: number,
        public readonly frameDirectory: string
    ){
        assureExistDirectory(frameDirectory);
    }

    public splitImageToFrames(textImage: TextToImage, result: DrewResult){
        const baseSize = textImage.baseSize;
        const numFrame = this.numFrame;
        const stepWidth = (result.drewWidth + baseSize) / (numFrame - 1);

        const outputPathList = []
        for (let frameIndex=0; frameIndex<numFrame; ++frameIndex){
            const path = this.frameDirectory +"/" + frameIndex +".png"
            outputPathList.push(path)

            sharp(textImage.outputPath)
            .extract({
                top: 0,
                left: this.calcLeftOfFrame(frameIndex, stepWidth, baseSize, result.capacityWidth),
                width: baseSize,
                height: baseSize
            })
            .toFile(path);
        }
        return outputPathList
    }

    private calcLeftOfFrame(frameIndex: number, stepWidth: number, baseSize: number, capacityWidth: number): number {
        let left = Math.floor(frameIndex * stepWidth - baseSize) 
        if (left<0) return left = 0;
        if (left > capacityWidth - baseSize-1) return left = capacityWidth - baseSize-1;
        return left;
    }
}