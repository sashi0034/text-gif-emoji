
import { createCanvas, registerFont } from "canvas";
import fs from "fs";
import { assureExistDirectory } from "../util/utilFunction";

export type DrewResult = {
    drewWidth: number,
    capacityWidth: number
}


export class TextToImage{

    private readonly lineWidth = 4;
    public readonly baseSize = 64;
    private readonly fontPath = "./rsc/Mplus2-Regular.ttf"
    private readonly fontName = "Mplus2-Regular"
    public readonly outputDirectory = "./output";
    public readonly outputFileName = "text.png";
    public get outputPath() {
        return this.outputDirectory + "/" + this.outputFileName;
    }

    // public constructor(
    //     private readonly text: string,
    //     private readonly strokingColor: string,
    //     private readonly fillingColor: string 
    // ){}

    public draw(
        text: string,
        strokingColor: string,
        fillingColor: string  
    ): DrewResult{
        registerFont(this.fontPath, {family: this.fontName});

        const fontSize = this.baseSize;

        const capacityWidth = fontSize * (text.length + 2);
        const canvas = createCanvas(capacityWidth, fontSize);

        const context = canvas.getContext('2d');
        
        context.font = fontSize + `px "` + this.fontName + `'"`;

        // context.fillStyle = "#000"
        // context.fillRect(0, 0, capacityWidth, fontSize);

        const leftMargin = this.baseSize;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = strokingColor
        context.strokeText(text, leftMargin, fontSize - fontSize/8);
        
        context.fillStyle = fillingColor;
        context.fillText(text, leftMargin, fontSize - fontSize/8);
        
        const width = context.measureText(text).width + leftMargin;

        const buffer = canvas.toBuffer("image/png")
        assureExistDirectory(this.outputDirectory)
        fs.writeFileSync(this.outputPath, buffer);

        return {
            drewWidth: width,
            capacityWidth: capacityWidth
        }
    }


}









