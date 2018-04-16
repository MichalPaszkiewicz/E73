import { IAmARobotEventHandler } from "../../framework/interfaces/iamaroboteventhandler";
import { IAmARobotEvent } from "../../framework/interfaces/iamarobotevent";
import { BlinktClearedEvent, BLINKT_CLEARED_EVENT_NAME } from "./events/blinktclearedevent";
import { BLINKT_ALL_PIXELS_SET_EVENT_NAME, BlinktAllPixelsSetEvent } from "./events/blinktallpixelssetevent";
import { BlinktPixelSetEvent, BLINKT_PIXEL_SET_EVENT_NAME } from "./events/blinktpixelsetevent";
import { BLINKT_BRIGHTNESS_SET_EVENT_NAME, BlinktBrightnessSetEvent } from "./events/blinktbrightnesssetevent";

class FakeBlinktLed{
    constructor(
        public red: number,
        public green: number, 
        public blue: number,
        public brightness:number
    ){

    }
}

export class FakeBlinktEventHandler implements IAmARobotEventHandler {
    handles = [
        BLINKT_CLEARED_EVENT_NAME,
        BLINKT_ALL_PIXELS_SET_EVENT_NAME,
        BLINKT_PIXEL_SET_EVENT_NAME,
        BLINKT_BRIGHTNESS_SET_EVENT_NAME
    ];
    leds: FakeBlinktLed[] = [
        new FakeBlinktLed(0,0,0,0),
        new FakeBlinktLed(0,0,0,0),
        new FakeBlinktLed(0,0,0,0),           
        new FakeBlinktLed(0,0,0,0),           
        new FakeBlinktLed(0,0,0,0),           
        new FakeBlinktLed(0,0,0,0),           
        new FakeBlinktLed(0,0,0,0),           
        new FakeBlinktLed(0,0,0,0)                   
    ];
    private _datPin: number;
    private _clkPin: number;

    constructor(datPin?: number, clkPin?: number){
        this._datPin = datPin;
        this._clkPin = clkPin;
    }

    handle(robotEvent: 
            BlinktClearedEvent | 
            BlinktAllPixelsSetEvent |
            BlinktPixelSetEvent |
            BlinktBrightnessSetEvent) {
        var self = this;
        switch(robotEvent.name){
            case BLINKT_CLEARED_EVENT_NAME:
                self.leds.forEach(l => {
                    l.red = 0;
                    l.green = 0;
                    l.blue = 0;
                    l.brightness = 0;
                })
                break;
            case BLINKT_ALL_PIXELS_SET_EVENT_NAME:
                var allPixelsSetEvent = <BlinktAllPixelsSetEvent>robotEvent;
                self.leds.forEach(l => {
                    l.red = allPixelsSetEvent.red;
                    l.green = allPixelsSetEvent.green;
                    l.blue = allPixelsSetEvent.blue;
                    l.brightness = allPixelsSetEvent.brightness;
                })
                break;
            case BLINKT_PIXEL_SET_EVENT_NAME:
                var pixelSetEvent = <BlinktPixelSetEvent>robotEvent;
                self.leds[pixelSetEvent.pixelNum].red= pixelSetEvent.red;
                self.leds[pixelSetEvent.pixelNum].green = pixelSetEvent.green;
                self.leds[pixelSetEvent.pixelNum].blue = pixelSetEvent.blue;
                self.leds[pixelSetEvent.pixelNum].brightness = pixelSetEvent.brightness;
                break;
            case BLINKT_BRIGHTNESS_SET_EVENT_NAME:
                var brightnessSetEvent = <BlinktBrightnessSetEvent>robotEvent;
                self.leds[brightnessSetEvent.pixelNum].brightness = brightnessSetEvent.brightness;
                break;
            default:
                break;
        }
    }
}