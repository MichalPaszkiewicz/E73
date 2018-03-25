class TouchCopy{
    constructor(public identifier: number, public offsetX: number, public offsetY: number){}
}

function copyTouch(touch: Touch, targetElement: HTMLElement) {
    var target = targetElement.getBoundingClientRect();
    return new TouchCopy(touch.identifier, touch.pageX - target.left, touch.pageY - target.top);
}

export class TouchService{

    private _element: HTMLElement;
    private _ongoingTouches: TouchCopy[] = [];
    private _onTouchDownEvents: ((e: TouchCopy) => void)[] = [];

    constructor(element: HTMLElement){
        this._element = element;
        this._element.addEventListener("touchstart", (e) => this._handleStart(e), false);
        this._element.addEventListener("touchend", (e) => this._handleEnd(e), false);
        this._element.addEventListener("touchcancel", (e) => this._handleCancel(e), false);
        this._element.addEventListener("touchmove", (e) => this._handleMove(e), false);
    }

    private _getTouchIndex(identifier: number): number{
        return this._ongoingTouches.indexOf(this._ongoingTouches.filter(ot => ot.identifier == identifier)[0]);
    }

    private _handleStart(e: TouchEvent){
        e.preventDefault();
        var touches = e.changedTouches;
                
        for (var i = 0; i < touches.length; i++) {
            var touchCopy = copyTouch(touches[i], this._element);
            this._onTouchDownEvents.forEach(tde => tde(touchCopy))
            this._ongoingTouches.push(touchCopy);
        }
    }

    private _handleEnd(e: TouchEvent){
        e.preventDefault();
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            var index = this._getTouchIndex(touches[i].identifier);
            this._ongoingTouches.splice(index, 1);
        }
    }

    private _handleCancel(e: TouchEvent){
        e.preventDefault();
        var touches = e.changedTouches;
        
        for (var i = 0; i < touches.length; i++) {
            var index = this._getTouchIndex(touches[i].identifier);
            this._ongoingTouches.splice(index, 1);
        }
    }

    private _handleMove(e: TouchEvent){
        e.preventDefault();
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            var touchCopy = copyTouch(touches[i], this._element);
            var index = this._getTouchIndex(touches[i].identifier);
            this._onTouchDownEvents.forEach(tde => tde(touchCopy));
            this._ongoingTouches.splice(index, 1, touchCopy);
        }
    }

    registerOnTouchDownEvent(callback: (e: TouchCopy) => void){
        this._onTouchDownEvents.push(callback);
    }
}