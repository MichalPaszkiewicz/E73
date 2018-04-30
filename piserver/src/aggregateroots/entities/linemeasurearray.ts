import { LineMeasure } from "../valueobjects/linemeasure";
import { Maths } from "../../helpers/maths";

export class LineMeasureArray{
    private _lineMeasures: LineMeasure[] = [];

    constructor(public size: number){
        for(var i = 0; i < size; i++){
            this._lineMeasures.push(new LineMeasure(false));
        }
    }

    setValue(index: number, value: boolean){
        this._lineMeasures[index].value = value;
    }

    clone(){
        var newLineMeasureArray = new LineMeasureArray(this.size);
        for(var i = 0; i < this._lineMeasures.length; i++){
            newLineMeasureArray.setValue(i, this._lineMeasures[i].value);
        }
        return newLineMeasureArray;
    }

    getLineCentre(){
        var ons = [];

        for(var i = 0; i < this._lineMeasures.length; i++){
            if(this._lineMeasures[i].value == true){
                ons.push(2 * (i - (this._lineMeasures.length - 1) / 2) / (this._lineMeasures.length - 1));
            }
        }

        var average = Maths.Average(ons);
        return isNaN(average) ? 0 : average;
    }

    getLinePosition(){
        var markerPoints = [];

        for(var i = 0; i < this._lineMeasures.length - 1; i++){
            if(this._lineMeasures[i].value == true && this._lineMeasures[i+1].value == false
            || this._lineMeasures[i].value == false && this._lineMeasures[i+1].value == true){
                markerPoints.push(true);
            }
            else{
                markerPoints.push(false);
            }
        }

        var toNums = [];
        for(var i = 0; i < markerPoints.length; i++){
            if(markerPoints[i] == true){
                toNums.push(2 * (i - (markerPoints.length - 1) / 2) / (markerPoints.length -1));
            }
        }

        var average = Maths.Average(toNums);
        return isNaN(average) ? 0 : average;
    }

    getValues(): boolean[]{
        return this._lineMeasures.map(lm => lm.value);
    }

    getGroupings(): number[][]{
        var groups: number[][] = [];
        var groupNum = 0;
        for(var i = 0; i < this._lineMeasures.length; i++){
            if(this._lineMeasures[i].value == true){
                if(groups[groupNum] == undefined){
                    groups.push([]);
                }
                groups[groupNum].push(i);
            }
            else{
                if(groups[groupNum] && groups.length > 0 && groups[groupNum].length > 0){
                    groupNum++;
                }
            }
        }

        return groups;
    }
}