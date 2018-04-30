export class Maths{

    static Average(numbers: number[]){
        var total = 0;
        numbers.forEach(n => total += n);
        return total / numbers.length;
    }

    static MovingAverage(numbers: number[]){
        var total = 0;
        numbers.forEach(n => total += n);
        return total / numbers.length;
    }

}