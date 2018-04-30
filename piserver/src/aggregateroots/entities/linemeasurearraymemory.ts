import { LineMeasureArray } from "./linemeasurearray";
import { Vector2d } from "../../helpers/vector";
import { Maths } from "../../helpers/maths";

export class LineMeasureArrayMemory{

    private _lineMeasureArrays: LineMeasureArray[] = [];
    private _realArrayState: LineMeasureArray;

    constructor(public arraySize: number, public memoryDepth: number){
        if(memoryDepth < 2){
            throw new Error("Line Measure Array Memory Depth must be 2 or more");
        }
        for(var i = 0; i < memoryDepth; i++){
            this._lineMeasureArrays.push(new LineMeasureArray(arraySize));
        }
        this._realArrayState = new LineMeasureArray(arraySize);
    }

    private getPreviousArray(){
        return this._lineMeasureArrays[this.memoryDepth - 2];
    }

    private getLatestArray(){
        return this._lineMeasureArrays[this.memoryDepth - 1];
    }

    isOnLine(){
        var currentVals = this.getLatestArray().getValues();
        return currentVals.some(v => v == true);        
    }

    getLineMemoryAge(){
        var lineMemoryAge = 0;

        var j = 0;
        for(var i = this._lineMeasureArrays.length - 2; i > -1; i--){
            j--;
            if(this._lineMeasureArrays[i].getValues().some(v => v == true)){
                lineMemoryAge = j;
            }
        }
        return lineMemoryAge;
    }

    getLinePosition(): Vector2d{
        var self = this;
        return new Vector2d(
            Maths.MovingAverage(self._lineMeasureArrays.map(lm => lm.getLinePosition())),
            self.isOnLine() ? 0 : self.getLineMemoryAge());
    }

    getLineCentre(): Vector2d{
        return new Vector2d(
            Maths.MovingAverage(this._lineMeasureArrays.map(lm => lm.getLineCentre())),
            this.isOnLine() ? 0 : this.getLineMemoryAge()
        );
    }

    getValues(){
        return this.getLatestArray().getValues();
    }

    setValue(index: number, value: boolean){
        this._realArrayState.setValue(index, value);
        var latestArrayVals = this.getLatestArray().getValues();
        var tempLineArray = this._realArrayState.clone();
        tempLineArray.setValue(index, value);

        var groupings = tempLineArray.getGroupings();

        if(!groupings || groupings.length == 0){
            this._lineMeasureArrays.shift();
            this._lineMeasureArrays.push(tempLineArray);
            return;
        }

        var winningGrouping = null;
        var winningGroupingNum = 0;

        for(var i = 0; i < groupings.length; i++){
            var groupScore = 0;
            for(var j = 0; j < groupings[i].length; j++){
                if(latestArrayVals[groupings[i][j]]){
                    groupScore++;
                }
            }
            if(groupScore > winningGroupingNum){
                winningGrouping = i;
                winningGroupingNum = groupScore;
            }
        }

        if(winningGrouping == null){
            this._lineMeasureArrays.shift();
            this._lineMeasureArrays.push(tempLineArray);
            return;
        }        

        var newLineArray = new LineMeasureArray(this.arraySize);

        for(var i = 0; i < groupings[winningGrouping].length; i++){
            newLineArray.setValue(groupings[winningGrouping][i], true);
        }

        this._lineMeasureArrays.shift();
        this._lineMeasureArrays.push(newLineArray);
    }
}