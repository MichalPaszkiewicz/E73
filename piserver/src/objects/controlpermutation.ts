export class ControlPermutation {

    constructor(
        public forwardOn: boolean, 
        public backwardOn: boolean, 
        public leftOn: boolean, 
        public rightOn: boolean, 
        public leftMotorState: number, 
        public rightMotorState: number) {

    }

    isEqual(forwardOn: boolean, backwardOn: boolean, leftOn: boolean, rightOn: boolean) {
        return this.forwardOn == forwardOn &&
            this.backwardOn == backwardOn &&
            this.leftOn == leftOn &&
            this.rightOn == rightOn;
    }

    toString() {
        var self = this;
        return (`     ${self.forwardOn ? 1 : 0}
  ${self.leftOn ? 1 : 0}     ${self.rightOn ? 1 : 0}
     ${self.backwardOn ? 1 : 0}`);
    }
}