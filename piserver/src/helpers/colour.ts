import { NumberRange } from "./range";

export class Colour{
    constructor(public red: number, public green: number, public blue: number){

    }
}

export class LooseColour{
    constructor(
        public red: NumberRange,
        public green: NumberRange,
        public blue: NumberRange){
        
    }

    containsColour(colour: Colour){
        var self = this;
        return self.red.containsNumber(colour.red)
            && self.green.containsNumber(colour.green)
            && self.blue.containsNumber(colour.blue);
    }
}

export class LooseColourArray{
    constructor(public looseColours: LooseColour[]){

    }

    findColour(colour: Colour): LooseColour{
        var self = this;
        for(var i = 0; i < self.looseColours.length; i++){
            if(self.looseColours[i].containsColour(colour)){
                return self.looseColours[i];
            }
        }
        return null;
    }
}