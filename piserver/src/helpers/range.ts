export class NumberRange{
    constructor(public min: number, public max: number){
        
    }

    containsNumber(x: number){
        var self = this;
        return x >= self.min && x <= self.max;
    }

    static upTo(x: number){
        return new NumberRange(0, x);
    }

    static downTo(x: number){
        return new NumberRange(x, Infinity);
    }
}