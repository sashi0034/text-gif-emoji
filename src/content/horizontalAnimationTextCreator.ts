
import fs from "fs";
import { TextToImage } from "./textToImage";
import sharp from "sharp"
import {FrameSplitter} from "./frameSplitter"
import Gm from "gm"
import log4js from "log4js";
import { sleep } from "../util/utilFunction";


export class HorizontalAnimationTextCreator{
    public async create(text: string, foreground: string, stroke: string) {
        const textImage = new TextToImage();
        log4js.getLogger().info("draw text: " + text); 

        // 描画
        const result = textImage.draw(text, foreground, stroke);
        log4js.getLogger().info("drew width: "+result.drewWidth + " fg: " + foreground + " stroke: " + stroke)

        // 分割
        const numFrame = 50
        const pathList = await new FrameSplitter(numFrame, textImage.outputDirectory + "/frame").splitImageToFrames(textImage, result)

        const gm = Gm(textImage.baseSize, textImage.baseSize)

        // 結合
        return await this.combinePngIntoGif(pathList, gm, textImage);
    }
    

    private async combinePngIntoGif(pathList: string[], gm: Gm.State, textImage: TextToImage): Promise<string> {
        const outputPath = textImage.outputDirectory + "/output.gif";
        for (const path of pathList) {
            gm.in(path).dispose("Background");
        }

        gm
        .delay(15)
        .resize(textImage.baseSize, textImage.baseSize)

        return new Promise((resolve, reject) => {
            gm.write(outputPath, function (err) {
                if (err) reject(err)
                    
                log4js.getLogger().info("animated gif created: " + outputPath);
                resolve(outputPath);
            });
        })
    }
}


