export class Vector2d{
    constructor(public x: number, public y: number){

    }

    add(vector: Vector2d): Vector2d{
        return new Vector2d(this.x + vector.x, this.y + vector.y);
    }

    dot(vector: Vector2d): Vector2d{
        return new Vector2d(this.x * vector.x, this.y + vector.y);
    }

    getModulus(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    multiplyBy(n: number){
        return new Vector2d(this.x * n, this.y *n);
    }

    getUnitVector(): Vector2d{
        var modulus = this.getModulus();

        return new Vector2d(this.x / modulus, this.y / modulus);
    }

    getPerpendicularVector(): Vector2d{
        if(this.x == 0 && this.y == 0){
            throw Error("Cannot find a vector perpendicular to (0,0,0)");
        }
        var unitVector = this.getUnitVector();
        return new Vector2d(-unitVector.y, unitVector.x);
    }

    rotate(radians: number){
        return new Vector2d(
            this.x * Math.cos(radians) - this.y * Math.sin(radians), 
            this.x * Math.sin(radians) + this.y * Math.cos(radians));
    }

    reverse(){
        return new Vector2d(-this.x, -this.y);
    }
}

