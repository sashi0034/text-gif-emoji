
import { Canvas, createCanvas, registerFont } from "canvas";
import fs from "fs";


export class ImageTester{
    public test() {
        registerFont("./rsc/Mplus2-Regular.ttf", {family: "Mplus2-Regular"});

        const text = 'hello world! こんにちは世界!'

        const fontSize = 64;

        const canvas = createCanvas(fontSize * text.length, fontSize);

        const context = canvas.getContext('2d');
        
        context.font = fontSize + `px "Mplus2-Regular"`;

        context.lineWidth = 4;
        context.strokeStyle = "#fff"
        context.strokeText(text, 0, fontSize - fontSize/8);
        
        context.fillStyle = "#222";
        context.fillText(text, 0, fontSize - fontSize/8);
        
        const width = context.measureText(text).width;
        console.log("width: " + width);

        const buffer = canvas.toBuffer("image/png")
        this.assureExistDirectory("./output")
        fs.writeFileSync("./output/test.png", buffer);
    }

    private assureExistDirectory(path: string)
    {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
}


