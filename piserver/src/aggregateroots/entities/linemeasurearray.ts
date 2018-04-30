import { LineMeasure } from "../valueobjects/linemeasure";

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

    getLinePosition(){
        var ons = [];
        for(var i = 0; i < this._lineMeasures.length; i++){
            if(this._lineMeasures[i].value == true){
                ons.push(i);
            }
        }
        var sum = 0;
        if(ons.length == 0){
            return 0;
        }
        ons.forEach(o => sum+=o);
        var average = sum / this._lineMeasures.length;

        // -1 for left to +1 for right
        var normalised = 2 * average / (ons.length) - 1;

        return normalised;
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