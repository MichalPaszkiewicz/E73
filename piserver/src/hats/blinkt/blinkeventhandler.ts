import { IAmARobotEventHandler } from "../../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";
import { BlinktClearedEvent, BLINKT_CLEARED_EVENT_NAME } from "./events/blinktclearedevent";
import { BLINKT_ALL_PIXELS_SET_EVENT_NAME, BlinktAllPixelsSetEvent } from "./events/blinktallpixelssetevent";
import { BlinktPixelSetEvent, BLINKT_PIXEL_SET_EVENT_NAME } from "./events/blinktpixelsetevent";
import { BLINKT_BRIGHTNESS_SET_EVENT_NAME, BlinktBrightnessSetEvent } from "./events/blinktbrightnesssetevent";
import { TURNED_OFF_EVENT_NAME, TurnedOffEvent } from "../../framework/events/turnedoffevent";
var Blinkt = require("node-blinkt");

export class BlinktEventHandler implements IAmARobotEventHandler {
    handles = [
        TURNED_OFF_EVENT_NAME,
        BLINKT_CLEARED_EVENT_NAME,
        BLINKT_ALL_PIXELS_SET_EVENT_NAME,
        BLINKT_PIXEL_SET_EVENT_NAME,
        BLINKT_BRIGHTNESS_SET_EVENT_NAME
    ];
    private _leds: any;

    constructor(datPin?: number, clkPin?: number){
        this._leds = new Blinkt();
        this._leds.setup(datPin, clkPin);
    }

    handle(robotEvent: 
            TurnedOffEvent |
            BlinktClearedEvent | 
            BlinktAllPixelsSetEvent |
            BlinktPixelSetEvent |
            BlinktBrightnessSetEvent) {
        var self = this;
        switch(robotEvent.name){
            case TURNED_OFF_EVENT_NAME:
            case BLINKT_CLEARED_EVENT_NAME:
                self._leds.clearAll();
                break;
            case BLINKT_ALL_PIXELS_SET_EVENT_NAME:
                var allPixelsSetEvent = <BlinktAllPixelsSetEvent>robotEvent;
                self._leds.setAllPixels(
                    allPixelsSetEvent.red,
                    allPixelsSetEvent.green,
                    allPixelsSetEvent.blue,
                    allPixelsSetEvent.brightness);
                break;
            case BLINKT_PIXEL_SET_EVENT_NAME:
                var pixelSetEvent = <BlinktPixelSetEvent>robotEvent;
                self._leds.setPixel(
                    pixelSetEvent.pixelNum,
                    pixelSetEvent.red,
                    pixelSetEvent.green,
                    pixelSetEvent.blue,
                    pixelSetEvent.brightness
                );
                break;
            case BLINKT_BRIGHTNESS_SET_EVENT_NAME:
                var brightnessSetEvent = <BlinktBrightnessSetEvent>robotEvent;
                self._leds.setBrightness(
                    brightnessSetEvent.pixelNum,
                    brightnessSetEvent.brightness
                );
                break;
            default:
                break;
        }
        self._leds.sendUpdate();
    }
}