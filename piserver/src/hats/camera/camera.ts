import { IAmASensor } from "../../framework/interfaces/iamasensor";
import { IAmASensation } from "../../framework/interfaces/iamasensation";
import { PictureTakenSensation } from "./sensations/picturetakensensation";
var PiCamera = require("pi-camera");

export class Camera implements IAmASensor{
    private _onSensationFunc: (sensation: IAmASensation) => void;
    private _camera;
    private _photoLocation = `${ __dirname }/test.jpg`;

    constructor(public snapInterval: number){
        var self = this;
        self._camera = new PiCamera({
            mode: "photo",
            output: self._photoLocation,
            width: 320,
            height: 240,
            nopreview: true
        });
    }

    snap(){
        var self = this;
        self._camera.snap()
            .then((result) => {
                self._onSensationFunc(new PictureTakenSensation(self._photoLocation));        
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            });
    }

    registerOnSensed(callback: (sensation: IAmASensation) => void) {
        var self = this;
        self._onSensationFunc = callback;
        setInterval(() => {
            self.snap();
        }, self.snapInterval);
    }    
    
    clear(): void {
        //nothing to clear.
    }
}