
import fs from "fs";
import { TextToImage } from "./textToImage";
import sharp from "sharp"
import {FrameSplitter} from "./frameSplitter"
import Gm from "gm"


export class HorizontalAnimationTextCreator{
    public async create(text: string, foreground: string, stroke: string) {
        const textImage = new TextToImage();
        const result = textImage.draw(text, foreground, stroke);
        console.log(result.drewWidth)

        const numFrame = 64
        const pathList = await new FrameSplitter(numFrame, textImage.outputDirectory + "/frame").splitImageToFrames(textImage, result)

        const gm = Gm(textImage.baseSize, textImage.baseSize)

        return this.combinePngIntoGif(pathList, gm, textImage);
    }

    private combinePngIntoGif(pathList: string[], gm: Gm.State, textImage: TextToImage) {
        const outputPath = textImage.outputDirectory + "/output.gif";
        for (const path of pathList) {
            gm.in(path).dispose("Background");
        }
        gm.delay(15)
            .resize(textImage.baseSize, textImage.baseSize)
            .write(outputPath, function (err) {
                if (err)
                    throw err;
                console.log("animated.gif created");
            });
        return outputPath;
    }
}


