
import fs from "fs";
import { TextToImage } from "./textToImage";
import sharp from "sharp"
import {FrameSplitter} from "./frameSplitter"
import Gm from "gm"


export class ImageTester{
    public test() {
        const textImage = new TextToImage();
        const result = textImage.draw("こんにちは世界", "#fff", "#222");
        console.log(result.drewWidth)

        const numFrame = 64
        const pathList = new FrameSplitter(numFrame, textImage.outputDirectory + "/frame").splitImageToFrames(textImage, result)

        const gm = Gm(textImage.baseSize, textImage.baseSize)

        this.combinePngIntoGif(pathList, gm, textImage);
    }

    private combinePngIntoGif(pathList: string[], gm: Gm.State, textImage: TextToImage) {
        for (const path of pathList) {
            gm.in(path).dispose("Background");
        }
        gm.delay(15)
            .resize(textImage.baseSize, textImage.baseSize)
            .write(textImage.outputDirectory + "/output.gif", function (err) {
                if (err)
                    throw err;
                console.log("animated.gif created");
            });
    }
}


