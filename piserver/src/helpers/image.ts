var getPixels = require("get-pixels");
import * as ndarray from "ndarray";
import { Colour, LooseColourArray, LooseColour } from "./colour";
import { ArrayHelper } from "./array";


export class PixelBox{
    constructor(public width: number, public height: number, public pixels: Colour[][]){

    }
}

export class Image{
    static getPixels(path: string, callback: (p: PixelBox) => void){
        getPixels(path, (err, pixels: ndarray) => {
            if(err){
                console.log(err ? JSON.stringify(err) : "Bad image path");
                return;
            }

            var pixelArray = [];

            for(var i = 0; i < pixels.shape[0]; i++){
                var row = [];
                for(var j = 0; j < pixels.shape[1]; j++){
                    row.push(new Colour(pixels.get(i, j, 0), pixels.get(i, j, 1), pixels.get(i, j, 2)));
                }
                pixelArray.push(row);
            }

            var pb = new PixelBox(pixels.shape[2], pixels.shape[1], pixelArray);

            callback(pb);
        });
    }

    static getColumnMedianColours(pixels: PixelBox, colours: LooseColourArray, ignoreNulls = false): LooseColour[]{
        var columns = [];

        for(var col = 0; col < pixels.width; col++){
            var columnPixels = [];
            for(var row = 0; row < pixels.height; row++){
                columnPixels.push(pixels.pixels[col][row]);
            }
            columns.push(ArrayHelper.getMedian(columnPixels, (i) => colours.findColour(i), ignoreNulls));
        }

        return columns;
    }

    static allColoursTheSame(looseColours: LooseColour[]){
        return looseColours.length > 0
            && looseColours.every(lc => lc == looseColours[0]);
    }
}