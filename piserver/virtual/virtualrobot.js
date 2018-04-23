System.register("framework/interfaces/iamatrigger", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamacommand", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamasensation", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamarobotevent", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamanaggregateroot", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamadomainservice", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamatriggerhandler", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamacommandhandler", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamasensationhandler", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamaroboteventhandler", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamacontrolmodule", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/commands/offcommand", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var OFF_COMMAND_NAME, OffCommand;
    return {
        setters: [],
        execute: function () {
            exports_12("OFF_COMMAND_NAME", OFF_COMMAND_NAME = "OffCOmmand");
            OffCommand = class OffCommand {
                constructor() {
                    this.name = OFF_COMMAND_NAME;
                }
            };
            exports_12("OffCommand", OffCommand);
        }
    };
});
System.register("framework/interfaces/iamasensor", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamauserinterface", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("objects/robot", ["framework/commands/offcommand"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var offcommand_1, Robot;
    return {
        setters: [
            function (offcommand_1_1) {
                offcommand_1 = offcommand_1_1;
            }
        ],
        execute: function () {
            Robot = class Robot {
                constructor(controlModule, userInterfaces, sensors = []) {
                    this._sensors = [];
                    this._userInterfaces = [];
                    var self = this;
                    self._controlModule = controlModule;
                    userInterfaces.forEach(ui => self.addUserInterface(ui));
                    sensors.forEach(s => self.addSensor(s));
                }
                addUserInterface(userInterface) {
                    var self = this;
                    userInterface.registerOnCommanded((command) => {
                        self._controlModule.handle(command);
                    });
                    self._controlModule.registerRobotEventHandler({
                        handles: ["*"],
                        handle: (e) => userInterface.applyEvent(e)
                    });
                    self._userInterfaces.push(userInterface);
                }
                addSensor(sensor) {
                    var self = this;
                    sensor.registerOnSensed((sensation) => {
                        self._controlModule.sense(sensation);
                    });
                    self._sensors.push(sensor);
                }
                off() {
                    this._controlModule.handle(new offcommand_1.OffCommand());
                }
            };
            exports_15("Robot", Robot);
        }
    };
});
System.register("framework/enums/pinstate", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var PinState;
    return {
        setters: [],
        execute: function () {
            (function (PinState) {
                PinState["IN"] = "in";
                PinState["OUT"] = "out";
            })(PinState || (PinState = {}));
            exports_16("PinState", PinState);
            PinState.OUT == "out";
        }
    };
});
System.register("framework/enums/pinedge", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var PinEdge;
    return {
        setters: [],
        execute: function () {
            (function (PinEdge) {
                PinEdge["NONE"] = "none";
                PinEdge["RISING"] = "rising";
                PinEdge["FALLING"] = "falling";
                PinEdge["BOTH"] = "both";
            })(PinEdge || (PinEdge = {}));
            exports_17("PinEdge", PinEdge);
        }
    };
});
System.register("framework/interfaces/iamapin", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("framework/interfaces/iamapinfactory", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("services/fakepinfactory", ["framework/enums/pinedge"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var pinedge_1, FakePin, fakePinFactory;
    return {
        setters: [
            function (pinedge_1_1) {
                pinedge_1 = pinedge_1_1;
            }
        ],
        execute: function () {
            FakePin = class FakePin {
                constructor(pin, state, edge = pinedge_1.PinEdge.NONE) {
                    this.pin = pin;
                    this._value = 0;
                    this._state = state;
                    this._edge = edge;
                }
                value() {
                    return this._value;
                }
                state() {
                    return this._state;
                }
                edge() {
                    return this._edge;
                }
                writeSync(value) {
                    this._value = value;
                }
                watch(callback) {
                    this._watch = callback;
                }
                triggerWatch(err, value) {
                    this._value = value;
                    this._watch(err, value);
                }
            };
            exports_20("FakePin", FakePin);
            exports_20("fakePinFactory", fakePinFactory = (pin, state, edge) => new FakePin(pin, state, edge));
        }
    };
});
System.register("hats/linesensor/sensations/linefoundsensation", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var LINE_FOUND_SENSATION_NAME, LineFoundSensation;
    return {
        setters: [],
        execute: function () {
            exports_21("LINE_FOUND_SENSATION_NAME", LINE_FOUND_SENSATION_NAME = "LineFound");
            LineFoundSensation = class LineFoundSensation {
                constructor(lineSensorId, totalLineSensors) {
                    this.lineSensorId = lineSensorId;
                    this.totalLineSensors = totalLineSensors;
                    this.name = LINE_FOUND_SENSATION_NAME;
                }
            };
            exports_21("LineFoundSensation", LineFoundSensation);
        }
    };
});
System.register("hats/linesensor/sensations/linelostsensation", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var LINE_LOST_SENSATION_NAME, LineLostSensation;
    return {
        setters: [],
        execute: function () {
            exports_22("LINE_LOST_SENSATION_NAME", LINE_LOST_SENSATION_NAME = "LineLost");
            LineLostSensation = class LineLostSensation {
                constructor(lineSensorId, totalLineSensors) {
                    this.lineSensorId = lineSensorId;
                    this.totalLineSensors = totalLineSensors;
                    this.name = LINE_LOST_SENSATION_NAME;
                }
            };
            exports_22("LineLostSensation", LineLostSensation);
        }
    };
});
System.register("hats/linesensor/linesensor", ["framework/enums/pinstate", "framework/enums/pinedge", "hats/linesensor/sensations/linefoundsensation", "hats/linesensor/sensations/linelostsensation"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var pinstate_1, pinedge_2, linefoundsensation_1, linelostsensation_1, LineSensor;
    return {
        setters: [
            function (pinstate_1_1) {
                pinstate_1 = pinstate_1_1;
            },
            function (pinedge_2_1) {
                pinedge_2 = pinedge_2_1;
            },
            function (linefoundsensation_1_1) {
                linefoundsensation_1 = linefoundsensation_1_1;
            },
            function (linelostsensation_1_1) {
                linelostsensation_1 = linelostsensation_1_1;
            }
        ],
        execute: function () {
            LineSensor = class LineSensor {
                constructor(id, pinNumber, pinFactory) {
                    this.id = id;
                    this.pinNumber = pinNumber;
                    this._watchDefined = false;
                    this._reversed = false;
                    this._pin = pinFactory(pinNumber, pinstate_1.PinState.IN, pinedge_2.PinEdge.BOTH);
                }
                reverse() {
                    this._reversed = !this._reversed;
                }
                registerOnSensed(callback) {
                    var self = this;
                    if (self._watchDefined) {
                        throw new Error("A watch has already been defined on sensor " + self.id);
                    }
                    self._watchDefined = true;
                    self._pin.watch((err, val) => {
                        console.log(val);
                        if (self._reversed ? val == 0 : val == 1) {
                            callback(new linefoundsensation_1.LineFoundSensation(self.id, 1));
                        }
                        else {
                            callback(new linelostsensation_1.LineLostSensation(self.id, 1));
                        }
                    });
                }
            };
            exports_23("LineSensor", LineSensor);
        }
    };
});
System.register("hats/linesensor/linesensorarray", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var LineSensorArray;
    return {
        setters: [],
        execute: function () {
            LineSensorArray = class LineSensorArray {
                constructor() {
                    this._lineSensors = [];
                    this._watchDefined = false;
                }
                reverse() {
                    this._lineSensors.forEach(ls => ls.reverse());
                }
                registerLineSensor(lineSensor) {
                    var self = this;
                    lineSensor.registerOnSensed((s) => {
                        s.totalLineSensors = self._lineSensors.length;
                        self._onSensationFunc(s);
                    });
                    this._lineSensors.push(lineSensor);
                }
                registerOnSensed(callback) {
                    var self = this;
                    if (self._watchDefined) {
                        throw new Error("A watch has already been defined on this line sensor array");
                    }
                    self._watchDefined = true;
                    this._onSensationFunc = callback;
                }
            };
            exports_24("LineSensorArray", LineSensorArray);
        }
    };
});
System.register("framework/services/defaultcontrolmodule", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var DefaultControlModule;
    return {
        setters: [],
        execute: function () {
            DefaultControlModule = class DefaultControlModule {
                constructor(domainService) {
                    this.domainService = domainService;
                    this._commandHandlers = [];
                    this._sensationHandlers = [];
                    this._robotEventHandlers = [];
                }
                registerCommandHandler(commandHandler) {
                    console.log("registered ch:", commandHandler.constructor.name);
                    this._commandHandlers.push(commandHandler);
                }
                handle(command) {
                    var self = this;
                    var robotEvents = [];
                    self._commandHandlers
                        .filter(ch => ch.handles.some(st => st == "*" || st == command.name))
                        .forEach(ch => {
                        robotEvents = robotEvents.concat(ch.handle(command, self.domainService));
                    });
                    robotEvents.forEach(re => self.signal(re));
                }
                registerSensationHandler(sensationHandler) {
                    console.log("registered sh:", sensationHandler.constructor.name);
                    this._sensationHandlers.push(sensationHandler);
                }
                sense(sensation) {
                    var self = this;
                    var robotEvents = [];
                    self._sensationHandlers
                        .filter(sh => sh.handles.some(st => st == "*" || st == sensation.name))
                        .forEach(sh => robotEvents = robotEvents.concat(sh.handle(sensation, self.domainService)));
                    robotEvents.forEach(re => self.signal(re));
                }
                registerRobotEventHandler(robotEventHandler) {
                    console.log("registered eh:", robotEventHandler.constructor.name);
                    this._robotEventHandlers.push(robotEventHandler);
                }
                signal(robotEvent) {
                    var self = this;
                    self.domainService.applyToAllAggregates(robotEvent);
                    self._robotEventHandlers
                        .filter(reh => reh.handles.some(st => st == "*" || st == robotEvent.name))
                        .forEach(reh => reh.handle(robotEvent));
                }
                clear() {
                    this._commandHandlers = [];
                    this._sensationHandlers = [];
                    this._robotEventHandlers = [];
                    this.domainService.clear();
                }
            };
            exports_25("DefaultControlModule", DefaultControlModule);
        }
    };
});
System.register("framework/services/defaultdomainservice", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var DefaultDomainService;
    return {
        setters: [],
        execute: function () {
            DefaultDomainService = class DefaultDomainService {
                constructor() {
                    this._aggregateRoots = [];
                    this._sessionEvents = [];
                }
                getAggregateRoot(c, callback, id) {
                    var self = this;
                    var similarAggregateRoots = self._aggregateRoots
                        .filter((ar) => ar instanceof c)
                        .filter((ar) => ar.id === id);
                    if (similarAggregateRoots.length == 0) {
                        var newAggregateRoot = new c(id);
                        self._sessionEvents.forEach(se => newAggregateRoot.apply(se));
                        self._aggregateRoots.push(newAggregateRoot);
                        callback(newAggregateRoot);
                        return;
                    }
                    callback(similarAggregateRoots[0]);
                }
                applyToAllAggregates(event) {
                    this._sessionEvents.push(event);
                    this._aggregateRoots.forEach(ar => ar.apply(event));
                }
                clear() {
                    this._sessionEvents = [];
                    this._aggregateRoots = [];
                }
            };
            exports_26("DefaultDomainService", DefaultDomainService);
        }
    };
});
System.register("hats/motozero/interfaces/iamamotor", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("aggregateroots/controlpermutation", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var ControlPermutation;
    return {
        setters: [],
        execute: function () {
            ControlPermutation = class ControlPermutation {
                constructor(forwardOn, backwardOn, leftOn, rightOn, leftMotorState, rightMotorState) {
                    this.forwardOn = forwardOn;
                    this.backwardOn = backwardOn;
                    this.leftOn = leftOn;
                    this.rightOn = rightOn;
                    this.leftMotorState = leftMotorState;
                    this.rightMotorState = rightMotorState;
                }
                isEqual(forwardOn, backwardOn, leftOn, rightOn) {
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
            };
            exports_28("ControlPermutation", ControlPermutation);
        }
    };
});
System.register("commands/trimleftcommand", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var TRIM_LEFT_COMMAND_NAME, TrimLeftCommand;
    return {
        setters: [],
        execute: function () {
            exports_29("TRIM_LEFT_COMMAND_NAME", TRIM_LEFT_COMMAND_NAME = "TrimLeft");
            TrimLeftCommand = class TrimLeftCommand {
                constructor() {
                    this.name = TRIM_LEFT_COMMAND_NAME;
                }
            };
            exports_29("TrimLeftCommand", TrimLeftCommand);
        }
    };
});
System.register("commands/trimrightcommand", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var TRIM_RIGHT_COMMAND_NAME, TrimRightCommand;
    return {
        setters: [],
        execute: function () {
            exports_30("TRIM_RIGHT_COMMAND_NAME", TRIM_RIGHT_COMMAND_NAME = "TrimRight");
            TrimRightCommand = class TrimRightCommand {
                constructor() {
                    this.name = TRIM_RIGHT_COMMAND_NAME;
                }
            };
            exports_30("TrimRightCommand", TrimRightCommand);
        }
    };
});
System.register("commands/directionkeycommand", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var DIRECTION_KEY_COMMAND_NAME, DirectionKeyDirection, DirectionKeyCommand;
    return {
        setters: [],
        execute: function () {
            exports_31("DIRECTION_KEY_COMMAND_NAME", DIRECTION_KEY_COMMAND_NAME = "DirectionKey");
            (function (DirectionKeyDirection) {
                DirectionKeyDirection["UP"] = "up";
                DirectionKeyDirection["DOWN"] = "down";
                DirectionKeyDirection["LEFT"] = "left";
                DirectionKeyDirection["RIGHT"] = "right";
            })(DirectionKeyDirection || (DirectionKeyDirection = {}));
            exports_31("DirectionKeyDirection", DirectionKeyDirection);
            DirectionKeyCommand = class DirectionKeyCommand {
                constructor(direction, isKeyDown) {
                    this.direction = direction;
                    this.isKeyDown = isKeyDown;
                    this.name = DIRECTION_KEY_COMMAND_NAME;
                }
            };
            exports_31("DirectionKeyCommand", DirectionKeyCommand);
        }
    };
});
System.register("commands/clickcirclecommand", [], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var CLICK_CIRCLE_COMMAND_NAME, ClickCircleCommand;
    return {
        setters: [],
        execute: function () {
            exports_32("CLICK_CIRCLE_COMMAND_NAME", CLICK_CIRCLE_COMMAND_NAME = "ClickCircle");
            ClickCircleCommand = class ClickCircleCommand {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.name = CLICK_CIRCLE_COMMAND_NAME;
                }
            };
            exports_32("ClickCircleCommand", ClickCircleCommand);
        }
    };
});
System.register("hats/motozero/events/motorspeedsetevent", [], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var MOTOR_SPEED_SET_EVENT_NAME, MotorSpeedSetEvent;
    return {
        setters: [],
        execute: function () {
            exports_33("MOTOR_SPEED_SET_EVENT_NAME", MOTOR_SPEED_SET_EVENT_NAME = "MotorSpeedSet");
            MotorSpeedSetEvent = class MotorSpeedSetEvent {
                constructor(motorId, speed) {
                    this.motorId = motorId;
                    this.speed = speed;
                    this.name = MOTOR_SPEED_SET_EVENT_NAME;
                }
            };
            exports_33("MotorSpeedSetEvent", MotorSpeedSetEvent);
        }
    };
});
System.register("hats/motozero/events/motorturnedoffevent", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var MOTOR_TURNED_OFF_EVENT_NAME, MotorTurnedOffEvent;
    return {
        setters: [],
        execute: function () {
            exports_34("MOTOR_TURNED_OFF_EVENT_NAME", MOTOR_TURNED_OFF_EVENT_NAME = "MotorTurnedOff");
            MotorTurnedOffEvent = class MotorTurnedOffEvent {
                constructor(motorId) {
                    this.motorId = motorId;
                    this.name = MOTOR_TURNED_OFF_EVENT_NAME;
                }
            };
            exports_34("MotorTurnedOffEvent", MotorTurnedOffEvent);
        }
    };
});
System.register("commands/setfullstatecommand", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var SET_FULL_STATE_COMMAND_NAME, SetFullStateCommand;
    return {
        setters: [],
        execute: function () {
            exports_35("SET_FULL_STATE_COMMAND_NAME", SET_FULL_STATE_COMMAND_NAME = "SetFullState");
            SetFullStateCommand = class SetFullStateCommand {
                constructor(forwardOn, backwardOn, leftOn, rightOn, speed, speedDifference) {
                    this.forwardOn = forwardOn;
                    this.backwardOn = backwardOn;
                    this.leftOn = leftOn;
                    this.rightOn = rightOn;
                    this.speed = speed;
                    this.speedDifference = speedDifference;
                    this.name = SET_FULL_STATE_COMMAND_NAME;
                }
            };
            exports_35("SetFullStateCommand", SetFullStateCommand);
        }
    };
});
System.register("framework/events/turnedoffevent", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var TURNED_OFF_EVENT_NAME, TurnedOffEvent;
    return {
        setters: [],
        execute: function () {
            exports_36("TURNED_OFF_EVENT_NAME", TURNED_OFF_EVENT_NAME = "TurnedOffEvent");
            TurnedOffEvent = class TurnedOffEvent {
                constructor() {
                    this.name = TURNED_OFF_EVENT_NAME;
                }
            };
            exports_36("TurnedOffEvent", TurnedOffEvent);
        }
    };
});
System.register("aggregateroots/valueobjects/linemeasure", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var LineMeasure;
    return {
        setters: [],
        execute: function () {
            LineMeasure = class LineMeasure {
                constructor(value) {
                    this.value = value;
                }
            };
            exports_37("LineMeasure", LineMeasure);
        }
    };
});
System.register("aggregateroots/twowheeldrive", ["aggregateroots/controlpermutation", "commands/trimleftcommand", "commands/trimrightcommand", "commands/directionkeycommand", "hats/motozero/events/motorspeedsetevent", "hats/motozero/events/motorturnedoffevent", "commands/setfullstatecommand", "framework/events/turnedoffevent", "hats/linesensor/sensations/linefoundsensation", "hats/linesensor/sensations/linelostsensation", "aggregateroots/valueobjects/linemeasure"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var controlpermutation_1, trimleftcommand_1, trimrightcommand_1, directionkeycommand_1, motorspeedsetevent_1, motorturnedoffevent_1, setfullstatecommand_1, turnedoffevent_1, linefoundsensation_2, linelostsensation_2, linemeasure_1, TwoWheelDrive;
    return {
        setters: [
            function (controlpermutation_1_1) {
                controlpermutation_1 = controlpermutation_1_1;
            },
            function (trimleftcommand_1_1) {
                trimleftcommand_1 = trimleftcommand_1_1;
            },
            function (trimrightcommand_1_1) {
                trimrightcommand_1 = trimrightcommand_1_1;
            },
            function (directionkeycommand_1_1) {
                directionkeycommand_1 = directionkeycommand_1_1;
            },
            function (motorspeedsetevent_1_1) {
                motorspeedsetevent_1 = motorspeedsetevent_1_1;
            },
            function (motorturnedoffevent_1_1) {
                motorturnedoffevent_1 = motorturnedoffevent_1_1;
            },
            function (setfullstatecommand_1_1) {
                setfullstatecommand_1 = setfullstatecommand_1_1;
            },
            function (turnedoffevent_1_1) {
                turnedoffevent_1 = turnedoffevent_1_1;
            },
            function (linefoundsensation_2_1) {
                linefoundsensation_2 = linefoundsensation_2_1;
            },
            function (linelostsensation_2_1) {
                linelostsensation_2 = linelostsensation_2_1;
            },
            function (linemeasure_1_1) {
                linemeasure_1 = linemeasure_1_1;
            }
        ],
        execute: function () {
            TwoWheelDrive = class TwoWheelDrive {
                constructor() {
                    this.founds = 0;
                    this.losts = 0;
                    this.leftMotorId = "leftMotor";
                    this.rightMotorId = "rightMotor";
                    this._forwardOn = false;
                    this._backwardOn = false;
                    this._leftOn = false;
                    this._rightOn = false;
                    this._trimLeft = 0;
                    this._trimRight = 0;
                    this._trimIncrement = 0.05;
                    this._speed = 1;
                    this._speedDifference = 0.5;
                    this._loggers = [];
                    this._leftMotorVelocity = 0;
                    this._rightMotorVelocity = 0;
                    this.unprocessedEvents = [];
                }
                handle(command) {
                    var self = this;
                    switch (command.name) {
                        case trimleftcommand_1.TRIM_LEFT_COMMAND_NAME:
                            self.trimLeft();
                            break;
                        case trimrightcommand_1.TRIM_RIGHT_COMMAND_NAME:
                            self.trimRight();
                            break;
                        case directionkeycommand_1.DIRECTION_KEY_COMMAND_NAME:
                            var directionKey = command;
                            switch (directionKey.direction) {
                                case directionkeycommand_1.DirectionKeyDirection.UP:
                                    if (directionKey.isKeyDown) {
                                        self.forward();
                                    }
                                    else {
                                        self.forwardOff();
                                    }
                                    break;
                                case directionkeycommand_1.DirectionKeyDirection.DOWN:
                                    if (directionKey.isKeyDown) {
                                        self.backward();
                                    }
                                    else {
                                        self.backwardOff();
                                    }
                                    break;
                                case directionkeycommand_1.DirectionKeyDirection.LEFT:
                                    if (directionKey.isKeyDown) {
                                        self.left();
                                    }
                                    else {
                                        self.leftOff();
                                    }
                                    break;
                                case directionkeycommand_1.DirectionKeyDirection.RIGHT:
                                    if (directionKey.isKeyDown) {
                                        self.right();
                                    }
                                    else {
                                        self.rightOff();
                                    }
                                    break;
                            }
                            break;
                        case setfullstatecommand_1.SET_FULL_STATE_COMMAND_NAME:
                            var setFullState = command;
                            self.setFullState(setFullState.forwardOn, setFullState.backwardOn, setFullState.leftOn, setFullState.rightOn, setFullState.speed, setFullState.speedDifference);
                            break;
                        default:
                            break;
                    }
                    var robotEvents = self.unprocessedEvents;
                    self.unprocessedEvents = [];
                    return robotEvents;
                }
                sense(sensation) {
                    var self = this;
                    if (!this._lineMeasures) {
                        this._lineMeasures = [];
                        for (var i = 0; i < sensation.totalLineSensors; i++) {
                            this._lineMeasures.push(new linemeasure_1.LineMeasure(false));
                        }
                    }
                    console.log(sensation);
                    switch (sensation.name) {
                        case linefoundsensation_2.LINE_FOUND_SENSATION_NAME:
                            this._lineMeasures[sensation.lineSensorId].value = true;
                            if (sensation.lineSensorId == 0) {
                                this.adjustLeft(0.5 + this._leftMotorVelocity - this._rightMotorVelocity);
                            }
                            else {
                                this.adjustRight(Math.pow(1.1, this.founds) * 0.05 / (10 * this._leftMotorVelocity));
                            }
                            this.founds++;
                            this.losts = 0;
                            break;
                        case linelostsensation_2.LINE_LOST_SENSATION_NAME:
                            this._lineMeasures[sensation.lineSensorId].value = false;
                            if (sensation.lineSensorId == 5) {
                                this.adjustRight(0.5 + this._rightMotorVelocity - this._leftMotorVelocity);
                            }
                            {
                                this.adjustLeft(Math.pow(1.1, this.losts) * 0.05 / (10 * this._rightMotorVelocity));
                            }
                            this.losts++;
                            this.founds = 0;
                            break;
                    }
                    var robotEvents = self.unprocessedEvents;
                    self.unprocessedEvents = [];
                    return robotEvents;
                }
                apply(robotEvent) {
                    switch (robotEvent.name) {
                        case motorspeedsetevent_1.MOTOR_SPEED_SET_EVENT_NAME:
                            var speedSet = robotEvent;
                            if (speedSet.motorId == this.leftMotorId) {
                                this._leftMotorVelocity = speedSet.speed;
                            }
                            if (speedSet.motorId == this.rightMotorId) {
                                this._rightMotorVelocity = speedSet.speed;
                            }
                            break;
                        case motorturnedoffevent_1.MOTOR_TURNED_OFF_EVENT_NAME:
                            var motorTurnedOff = robotEvent;
                            if (motorTurnedOff.motorId == this.leftMotorId) {
                                this._leftMotorVelocity = 0;
                            }
                            if (motorTurnedOff.motorId == this.rightMotorId) {
                                this._rightMotorVelocity = 0;
                            }
                            break;
                        case turnedoffevent_1.TURNED_OFF_EVENT_NAME:
                            this._leftMotorVelocity = 0;
                            this._rightMotorVelocity = 0;
                            this._forwardOn = false;
                            this._backwardOn = false;
                            this._leftOn = false;
                            this._rightOn = false;
                            this._speed = 0;
                            break;
                    }
                }
                getLeftTrim() { return this._trimLeft; }
                ;
                getRightTrim() { return this._trimRight; }
                ;
                getSpeed() { return this._speed; }
                ;
                getSpeedDifference() { return this._speedDifference; }
                ;
                clearLoggers() {
                    this._loggers = [];
                }
                _updateMotor(motorId, velocity) {
                    if (velocity != 0) {
                        this.unprocessedEvents.push(new motorspeedsetevent_1.MotorSpeedSetEvent(motorId, velocity));
                    }
                    else {
                        this.unprocessedEvents.push(new motorturnedoffevent_1.MotorTurnedOffEvent(motorId));
                    }
                }
                _updateMotors() {
                    var self = this;
                    var speedDifference = this._speedDifference;
                    // get untrimmed, unspecified motor velocities
                    var controlPermutations = [
                        new controlpermutation_1.ControlPermutation(true, false, false, false, 1, 1),
                        new controlpermutation_1.ControlPermutation(true, true, false, false, 0, 0),
                        new controlpermutation_1.ControlPermutation(true, false, true, false, 1 - speedDifference, 1),
                        new controlpermutation_1.ControlPermutation(true, false, false, true, 1, 1 - speedDifference),
                        new controlpermutation_1.ControlPermutation(true, true, true, false, -1, 1),
                        new controlpermutation_1.ControlPermutation(true, true, false, true, 1, -1),
                        new controlpermutation_1.ControlPermutation(true, false, true, true, 1, 1),
                        new controlpermutation_1.ControlPermutation(true, true, true, true, 0, 0),
                        new controlpermutation_1.ControlPermutation(false, false, false, false, 0, 0),
                        new controlpermutation_1.ControlPermutation(false, true, false, false, -1, -1),
                        new controlpermutation_1.ControlPermutation(false, false, true, false, -1, 1),
                        new controlpermutation_1.ControlPermutation(false, false, false, true, 1, -1),
                        new controlpermutation_1.ControlPermutation(false, true, true, false, speedDifference - 1, -1),
                        new controlpermutation_1.ControlPermutation(false, true, false, true, -1, speedDifference - 1),
                        new controlpermutation_1.ControlPermutation(false, false, true, true, 0, 0),
                        new controlpermutation_1.ControlPermutation(false, true, true, true, -1, -1)
                    ];
                    var currentPermutation = controlPermutations.filter(cp => cp.isEqual(this._forwardOn, this._backwardOn, this._leftOn, this._rightOn))[0];
                    var leftMotorVelocity = currentPermutation.leftMotorState * self._speed * (1 - self._trimLeft);
                    var rightMotorVelocity = currentPermutation.rightMotorState * self._speed * (1 - self._trimRight);
                    self._updateMotor(self.leftMotorId, leftMotorVelocity);
                    self._updateMotor(self.rightMotorId, rightMotorVelocity);
                }
                trimLeft() {
                    var trimRight = this._trimRight;
                    var trimLeft = this._trimLeft;
                    if (this._trimRight > 0) {
                        this._trimRight = Math.max(0, this._trimRight - this._trimIncrement);
                    }
                    else {
                        this._trimLeft = Math.min(0.9, this._trimLeft + this._trimIncrement);
                    }
                    this._updateMotors();
                }
                trimRight() {
                    var trimRight = this._trimRight;
                    var trimLeft = this._trimLeft;
                    if (this._trimLeft > 0) {
                        this._trimLeft = Math.max(0, this._trimLeft - this._trimIncrement);
                    }
                    else {
                        this._trimRight = Math.min(0.9, this._trimRight + this._trimIncrement);
                    }
                    this._updateMotors();
                }
                adjustLeft(turnStrength) {
                    var self = this;
                    self.unprocessedEvents.push(new motorspeedsetevent_1.MotorSpeedSetEvent(self.leftMotorId, Math.max(-1, self._leftMotorVelocity - turnStrength)));
                    self.unprocessedEvents.push(new motorspeedsetevent_1.MotorSpeedSetEvent(self.rightMotorId, Math.min(1, self._rightMotorVelocity + turnStrength)));
                }
                adjustRight(turnStrength) {
                    var self = this;
                    self.unprocessedEvents.push(new motorspeedsetevent_1.MotorSpeedSetEvent(self.rightMotorId, Math.max(-1, self._rightMotorVelocity - turnStrength)));
                    self.unprocessedEvents.push(new motorspeedsetevent_1.MotorSpeedSetEvent(self.leftMotorId, Math.min(1, self._leftMotorVelocity + turnStrength)));
                }
                setSpeed(newSpeed) {
                    this._speed = newSpeed;
                    this._updateMotors();
                }
                forward() {
                    this._forwardOn = true;
                    this._updateMotors();
                }
                forwardOff() {
                    this._forwardOn = false;
                    this._updateMotors();
                }
                backward() {
                    this._backwardOn = true;
                    this._updateMotors();
                }
                backwardOff() {
                    this._backwardOn = false;
                    this._updateMotors();
                }
                left() {
                    this._leftOn = true;
                    this._updateMotors();
                }
                leftOff() {
                    this._leftOn = false;
                    this._updateMotors();
                }
                right() {
                    this._rightOn = true;
                    this._updateMotors();
                }
                rightOff() {
                    this._rightOn = false;
                    this._updateMotors();
                }
                setFullState(forwardOn, backwardOn, leftOn, rightOn, speed, speedDifference) {
                    this._forwardOn = forwardOn;
                    this._backwardOn = backwardOn;
                    this._leftOn = leftOn;
                    this._rightOn = rightOn;
                    this._speed = speed;
                    this._speedDifference = speedDifference;
                    this._updateMotors();
                }
            };
            exports_38("TwoWheelDrive", TwoWheelDrive);
        }
    };
});
System.register("sensationhandlers/linesensationhandler", ["hats/linesensor/sensations/linefoundsensation", "hats/linesensor/sensations/linelostsensation", "aggregateroots/twowheeldrive"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var linefoundsensation_3, linelostsensation_3, twowheeldrive_1, LineSensationHandler;
    return {
        setters: [
            function (linefoundsensation_3_1) {
                linefoundsensation_3 = linefoundsensation_3_1;
            },
            function (linelostsensation_3_1) {
                linelostsensation_3 = linelostsensation_3_1;
            },
            function (twowheeldrive_1_1) {
                twowheeldrive_1 = twowheeldrive_1_1;
            }
        ],
        execute: function () {
            LineSensationHandler = class LineSensationHandler {
                constructor() {
                    this.handles = [
                        linefoundsensation_3.LINE_FOUND_SENSATION_NAME,
                        linelostsensation_3.LINE_LOST_SENSATION_NAME
                    ];
                }
                handle(sensation, domainService) {
                    var robotEvents = [];
                    domainService.getAggregateRoot(twowheeldrive_1.TwoWheelDrive, (a) => {
                        robotEvents = a.sense(sensation);
                    });
                    return robotEvents;
                }
            };
            exports_39("LineSensationHandler", LineSensationHandler);
        }
    };
});
System.register("hats/motozero/motor", ["framework/enums/pinstate"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var pinstate_2, Motor;
    return {
        setters: [
            function (pinstate_2_1) {
                pinstate_2 = pinstate_2_1;
            }
        ],
        execute: function () {
            Motor = class Motor {
                constructor(id, enablePin, forwardPin, backwardPin, pinFactory) {
                    this.id = id;
                    this._pulseWidth = 5;
                    this._pulses = 100;
                    this._currentPulse = 0;
                    this._speed = 0;
                    this._enablePin = pinFactory(enablePin, pinstate_2.PinState.OUT);
                    this._forwardPin = pinFactory(forwardPin, pinstate_2.PinState.OUT);
                    this._backwardPin = pinFactory(backwardPin, pinstate_2.PinState.OUT);
                    this._loop();
                }
                getSpeed() { return this._speed; }
                getEnablePin() { return this._enablePin; }
                getForwardPin() { return this._forwardPin; }
                getBackwardPin() { return this._backwardPin; }
                _loop() {
                    var self = this;
                    if (Math.abs(self._speed) > self._currentPulse / self._pulses) {
                        self._enablePin.writeSync(1);
                    }
                    else {
                        self._enablePin.writeSync(0);
                    }
                    self._currentPulse++;
                    self._currentPulse = self._currentPulse % self._pulses;
                    setTimeout(() => {
                        self._loop();
                    }, self._pulseWidth);
                }
                off() {
                    this._speed = 0;
                    this._forwardPin.writeSync(0);
                    this._backwardPin.writeSync(0);
                }
                setSpeed(newSpeed) {
                    if (newSpeed > 1 || newSpeed < -1) {
                        throw new Error("The speed must be between -1 and 1");
                    }
                    if (newSpeed > 0) {
                        this._backwardPin.writeSync(0);
                        this._forwardPin.writeSync(1);
                    }
                    else if (newSpeed < 0) {
                        this._forwardPin.writeSync(0);
                        this._backwardPin.writeSync(1);
                    }
                    else {
                        this.off();
                    }
                    this._speed = newSpeed;
                }
            };
            exports_40("Motor", Motor);
        }
    };
});
System.register("hats/motozero/motoreventhandler", ["hats/motozero/events/motorturnedoffevent", "hats/motozero/events/motorspeedsetevent", "framework/events/turnedoffevent"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var motorturnedoffevent_2, motorspeedsetevent_2, turnedoffevent_2, MotorEventHandler;
    return {
        setters: [
            function (motorturnedoffevent_2_1) {
                motorturnedoffevent_2 = motorturnedoffevent_2_1;
            },
            function (motorspeedsetevent_2_1) {
                motorspeedsetevent_2 = motorspeedsetevent_2_1;
            },
            function (turnedoffevent_2_1) {
                turnedoffevent_2 = turnedoffevent_2_1;
            }
        ],
        execute: function () {
            MotorEventHandler = class MotorEventHandler {
                constructor(motors) {
                    this.motors = motors;
                    this.handles = [
                        turnedoffevent_2.TURNED_OFF_EVENT_NAME,
                        motorturnedoffevent_2.MOTOR_TURNED_OFF_EVENT_NAME,
                        motorspeedsetevent_2.MOTOR_SPEED_SET_EVENT_NAME
                    ];
                }
                handle(robotEvent) {
                    var self = this;
                    switch (robotEvent.name) {
                        case turnedoffevent_2.TURNED_OFF_EVENT_NAME:
                            self.motors.forEach(m => m.off());
                            break;
                        case motorturnedoffevent_2.MOTOR_TURNED_OFF_EVENT_NAME:
                            var turnedOff = robotEvent;
                            self.motors
                                .filter(m => m.id == turnedOff.motorId)
                                .forEach(m => m.off());
                            break;
                        case motorspeedsetevent_2.MOTOR_SPEED_SET_EVENT_NAME:
                            var speedSet = robotEvent;
                            self.motors
                                .filter(m => m.id == speedSet.motorId)
                                .forEach(m => m.setSpeed(speedSet.speed));
                            break;
                        default:
                            break;
                    }
                }
            };
            exports_41("MotorEventHandler", MotorEventHandler);
        }
    };
});
System.register("hats/motozero/interfaces/iamamotorfactory", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("hats/motozero/fakemotorfactory", ["hats/motozero/motor", "services/fakepinfactory"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var motor_1, fakepinfactory_1, fakeMotorFactory;
    return {
        setters: [
            function (motor_1_1) {
                motor_1 = motor_1_1;
            },
            function (fakepinfactory_1_1) {
                fakepinfactory_1 = fakepinfactory_1_1;
            }
        ],
        execute: function () {
            exports_43("fakeMotorFactory", fakeMotorFactory = (motorId, enablePin, forwardPin, backwardPin) => new motor_1.Motor(motorId, enablePin, forwardPin, backwardPin, fakepinfactory_1.fakePinFactory));
        }
    };
});
System.register("commandhandlers/twowheeldrivecommandhandler", ["commands/directionkeycommand", "commands/trimleftcommand", "commands/trimrightcommand", "aggregateroots/twowheeldrive", "commands/setfullstatecommand"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var directionkeycommand_2, trimleftcommand_2, trimrightcommand_2, twowheeldrive_2, setfullstatecommand_2, TwoWheelDriveCommandHandler;
    return {
        setters: [
            function (directionkeycommand_2_1) {
                directionkeycommand_2 = directionkeycommand_2_1;
            },
            function (trimleftcommand_2_1) {
                trimleftcommand_2 = trimleftcommand_2_1;
            },
            function (trimrightcommand_2_1) {
                trimrightcommand_2 = trimrightcommand_2_1;
            },
            function (twowheeldrive_2_1) {
                twowheeldrive_2 = twowheeldrive_2_1;
            },
            function (setfullstatecommand_2_1) {
                setfullstatecommand_2 = setfullstatecommand_2_1;
            }
        ],
        execute: function () {
            TwoWheelDriveCommandHandler = class TwoWheelDriveCommandHandler {
                constructor() {
                    this.handles = [
                        setfullstatecommand_2.SET_FULL_STATE_COMMAND_NAME,
                        directionkeycommand_2.DIRECTION_KEY_COMMAND_NAME,
                        trimleftcommand_2.TRIM_LEFT_COMMAND_NAME,
                        trimrightcommand_2.TRIM_RIGHT_COMMAND_NAME
                    ];
                }
                handle(command, domainService) {
                    var robotEvents = [];
                    domainService.getAggregateRoot(twowheeldrive_2.TwoWheelDrive, (ar) => {
                        robotEvents = ar.handle(command);
                    });
                    return robotEvents;
                }
            };
            exports_44("TwoWheelDriveCommandHandler", TwoWheelDriveCommandHandler);
        }
    };
});
System.register("objects/learnableevent", [], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var LearnableEvent;
    return {
        setters: [],
        execute: function () {
            LearnableEvent = class LearnableEvent {
                constructor(robotEvent, waitTime) {
                    this.robotEvent = robotEvent;
                    this.waitTime = waitTime;
                }
            };
            exports_45("LearnableEvent", LearnableEvent);
        }
    };
});
System.register("objects/learnablesequence", [], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var LearnableSequence;
    return {
        setters: [],
        execute: function () {
            LearnableSequence = class LearnableSequence {
                constructor(name, events) {
                    this.name = name;
                    this.events = events;
                }
            };
            exports_46("LearnableSequence", LearnableSequence);
        }
    };
});
System.register("commands/startlearningcommand", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var START_LEARNING_COMMAND_NAME, StartLearningCommand;
    return {
        setters: [],
        execute: function () {
            exports_47("START_LEARNING_COMMAND_NAME", START_LEARNING_COMMAND_NAME = "StartLearning");
            StartLearningCommand = class StartLearningCommand {
                constructor(sequenceName) {
                    this.sequenceName = sequenceName;
                    this.name = START_LEARNING_COMMAND_NAME;
                }
            };
            exports_47("StartLearningCommand", StartLearningCommand);
        }
    };
});
System.register("commands/endlearningcommand", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var END_LEARNING_COMMAND_NAME, EndLearningCommand;
    return {
        setters: [],
        execute: function () {
            exports_48("END_LEARNING_COMMAND_NAME", END_LEARNING_COMMAND_NAME = "EndLearning");
            EndLearningCommand = class EndLearningCommand {
                constructor() {
                    this.name = END_LEARNING_COMMAND_NAME;
                }
            };
            exports_48("EndLearningCommand", EndLearningCommand);
        }
    };
});
System.register("commands/runlearntsequencecommand", [], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var RUN_LEARNT_SEQUENCE_COMMAND_NAME, RunLearntSequenceCommand;
    return {
        setters: [],
        execute: function () {
            exports_49("RUN_LEARNT_SEQUENCE_COMMAND_NAME", RUN_LEARNT_SEQUENCE_COMMAND_NAME = "RunLearntSequence");
            RunLearntSequenceCommand = class RunLearntSequenceCommand {
                constructor(sequenceName) {
                    this.sequenceName = sequenceName;
                    this.name = RUN_LEARNT_SEQUENCE_COMMAND_NAME;
                }
            };
            exports_49("RunLearntSequenceCommand", RunLearntSequenceCommand);
        }
    };
});
System.register("services/learningservice", ["objects/learnableevent", "objects/learnablesequence", "commands/startlearningcommand", "commands/endlearningcommand", "commands/runlearntsequencecommand"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var learnableevent_1, learnablesequence_1, startlearningcommand_1, endlearningcommand_1, runlearntsequencecommand_1, LearningServiceCommandHandler, LearningServiceEventHandler, LearningService;
    return {
        setters: [
            function (learnableevent_1_1) {
                learnableevent_1 = learnableevent_1_1;
            },
            function (learnablesequence_1_1) {
                learnablesequence_1 = learnablesequence_1_1;
            },
            function (startlearningcommand_1_1) {
                startlearningcommand_1 = startlearningcommand_1_1;
            },
            function (endlearningcommand_1_1) {
                endlearningcommand_1 = endlearningcommand_1_1;
            },
            function (runlearntsequencecommand_1_1) {
                runlearntsequencecommand_1 = runlearntsequencecommand_1_1;
            }
        ],
        execute: function () {
            LearningServiceCommandHandler = class LearningServiceCommandHandler {
                constructor() {
                    this.handles = [
                        startlearningcommand_1.START_LEARNING_COMMAND_NAME,
                        endlearningcommand_1.END_LEARNING_COMMAND_NAME,
                        runlearntsequencecommand_1.RUN_LEARNT_SEQUENCE_COMMAND_NAME,
                        "*"
                    ];
                }
                registerOnHandle(callback) {
                    this._onHandle = (c) => callback(c);
                }
                handle(trigger, domainService) {
                    if (this._onHandle) {
                        this._onHandle(trigger);
                    }
                    return [];
                }
            };
            LearningServiceEventHandler = class LearningServiceEventHandler {
                constructor() {
                    this.handles = ["*"];
                }
                registerOnHandle(callback) {
                    this._onHandle = (c) => callback(c);
                }
                handle(robotEvent) {
                    if (this._onHandle) {
                        this._onHandle(robotEvent);
                    }
                }
            };
            LearningService = class LearningService {
                constructor() {
                    this._running = false;
                    this.sequences = [];
                    this._onSequenceAddedFuncs = [];
                    this._learningModeOn = false;
                    this.currentSequenceStep = 0;
                    this.currentLearningSequenceTriggerTime = 0;
                }
                handle(command) {
                    var self = this;
                    var robotEvents = [];
                    switch (command.name) {
                        case startlearningcommand_1.START_LEARNING_COMMAND_NAME:
                            var startLearning = command;
                            self.startLearning(startLearning.sequenceName);
                            break;
                        case endlearningcommand_1.END_LEARNING_COMMAND_NAME:
                            var endLearning = command;
                            self.endLearning();
                            break;
                        case runlearntsequencecommand_1.RUN_LEARNT_SEQUENCE_COMMAND_NAME:
                            var runSequence = command;
                            self.run(runSequence.sequenceName);
                            break;
                        default:
                            self.stopRunning();
                            break;
                    }
                    return robotEvents;
                }
                attachToControlModule(controlModule) {
                    var self = this;
                    self.applyEvent = (e) => controlModule.signal(e);
                    var ch = new LearningServiceCommandHandler();
                    ch.registerOnHandle((c) => { self.handle(c); });
                    controlModule.registerCommandHandler(ch);
                    var eh = new LearningServiceEventHandler();
                    eh.registerOnHandle((e) => self.learn(e));
                    controlModule.registerRobotEventHandler(eh);
                }
                getSequenceNames() {
                    return this.sequences.map(s => s.name);
                }
                startLearning(sequenceName) {
                    this._learningModeOn = true;
                    this.currentLearningSequence = new learnablesequence_1.LearnableSequence(sequenceName, []);
                    this.currentLearningSequenceTriggerTime = (new Date()).getTime();
                }
                endLearning() {
                    var currentTime = (new Date()).getTime();
                    if (!this.currentLearningSequence) {
                        return;
                    }
                    if (this.currentLearningSequence.events.length > 0) {
                        this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
                    }
                    this.sequences.push(this.currentLearningSequence);
                    this.currentLearningSequence = null;
                    this.currentLearningSequenceTriggerTime = 0;
                    this._learningModeOn = false;
                }
                registerOnSequenceAdded(func) {
                    this._onSequenceAddedFuncs.push(func);
                }
                clearOnSequenceAddedFuncs() {
                    this._onSequenceAddedFuncs = [];
                }
                learn(robotEvent) {
                    if (!this._learningModeOn) {
                        return;
                    }
                    var currentTime = (new Date()).getTime();
                    if (this.currentLearningSequence.events.length > 0) {
                        this.currentLearningSequence.events[this.currentLearningSequence.events.length - 1].waitTime = currentTime - this.currentLearningSequenceTriggerTime;
                    }
                    this.currentLearningSequence.events.push(new learnableevent_1.LearnableEvent(robotEvent, 0));
                    this.currentLearningSequenceTriggerTime = currentTime;
                }
                _runStep() {
                    var self = this;
                    if (!this._running) {
                        return;
                    }
                    self.applyEvent(self.currentSequence.events[self.currentSequenceStep].robotEvent);
                    self.currentSequenceStep++;
                    if (self.currentSequenceStep > self.currentSequence.events.length - 1) {
                        this.currentSequence = null;
                        this.currentSequenceStep = 0;
                        return;
                    }
                    if (self.currentSequence && this._running) {
                        setTimeout(() => self._runStep(), self.currentSequence.events[self.currentSequenceStep - 1].waitTime);
                    }
                }
                run(sequence) {
                    if (typeof sequence == "string") {
                        var sequencesOfName = this.sequences.filter(s => s.name == sequence);
                        if (sequencesOfName.length == 0) {
                            throw new Error("no sequence of name: " + sequence);
                        }
                        this.currentSequence = sequencesOfName[0];
                    }
                    else {
                        this.currentSequence = sequence;
                    }
                    this.currentSequenceStep = 0;
                    this._running = true;
                    this._runStep();
                }
                stopRunning() {
                    this._running = false;
                }
            };
            exports_50("LearningService", LearningService);
        }
    };
});
System.register("helpers/vector", [], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var Vector2d;
    return {
        setters: [],
        execute: function () {
            Vector2d = class Vector2d {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                }
                add(vector) {
                    return new Vector2d(this.x + vector.x, this.y + vector.y);
                }
                dot(vector) {
                    return new Vector2d(this.x * vector.x, this.y + vector.y);
                }
                getModulus() {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }
                multiplyBy(n) {
                    return new Vector2d(this.x * n, this.y * n);
                }
                getUnitVector() {
                    var modulus = this.getModulus();
                    return new Vector2d(this.x / modulus, this.y / modulus);
                }
                getPerpendicularVector() {
                    if (this.x == 0 && this.y == 0) {
                        throw Error("Cannot find a vector perpendicular to (0,0,0)");
                    }
                    var unitVector = this.getUnitVector();
                    return new Vector2d(-unitVector.y, unitVector.x);
                }
                rotate(radians) {
                    return new Vector2d(this.x * Math.cos(radians) - this.y * Math.sin(radians), this.x * Math.sin(radians) + this.y * Math.cos(radians));
                }
                reverse() {
                    return new Vector2d(-this.x, -this.y);
                }
            };
            exports_51("Vector2d", Vector2d);
        }
    };
});
System.register("services/touchservice", [], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    function copyTouch(touch, targetElement) {
        var target = targetElement.getBoundingClientRect();
        return new TouchCopy(touch.identifier, touch.pageX - target.left, touch.pageY - target.top);
    }
    var TouchCopy, TouchService;
    return {
        setters: [],
        execute: function () {
            TouchCopy = class TouchCopy {
                constructor(identifier, offsetX, offsetY) {
                    this.identifier = identifier;
                    this.offsetX = offsetX;
                    this.offsetY = offsetY;
                }
            };
            TouchService = class TouchService {
                constructor(element) {
                    this._ongoingTouches = [];
                    this._onTouchDownEvents = [];
                    this._element = element;
                    this._element.addEventListener("touchstart", (e) => this._handleStart(e), false);
                    this._element.addEventListener("touchend", (e) => this._handleEnd(e), false);
                    this._element.addEventListener("touchcancel", (e) => this._handleCancel(e), false);
                    this._element.addEventListener("touchmove", (e) => this._handleMove(e), false);
                }
                _getTouchIndex(identifier) {
                    return this._ongoingTouches.indexOf(this._ongoingTouches.filter(ot => ot.identifier == identifier)[0]);
                }
                _handleStart(e) {
                    e.preventDefault();
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touchCopy = copyTouch(touches[i], this._element);
                        this._onTouchDownEvents.forEach(tde => tde(touchCopy));
                        this._ongoingTouches.push(touchCopy);
                    }
                }
                _handleEnd(e) {
                    e.preventDefault();
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var index = this._getTouchIndex(touches[i].identifier);
                        this._ongoingTouches.splice(index, 1);
                    }
                }
                _handleCancel(e) {
                    e.preventDefault();
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var index = this._getTouchIndex(touches[i].identifier);
                        this._ongoingTouches.splice(index, 1);
                    }
                }
                _handleMove(e) {
                    e.preventDefault();
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touchCopy = copyTouch(touches[i], this._element);
                        var index = this._getTouchIndex(touches[i].identifier);
                        this._onTouchDownEvents.forEach(tde => tde(touchCopy));
                        this._ongoingTouches.splice(index, 1, touchCopy);
                    }
                }
                registerOnTouchDownEvent(callback) {
                    this._onTouchDownEvents.push(callback);
                }
            };
            exports_52("TouchService", TouchService);
        }
    };
});
System.register("virtualrobot", ["objects/robot", "services/fakepinfactory", "hats/linesensor/linesensor", "hats/linesensor/linesensorarray", "framework/services/defaultcontrolmodule", "framework/services/defaultdomainservice", "sensationhandlers/linesensationhandler", "hats/motozero/motoreventhandler", "hats/motozero/fakemotorfactory", "commandhandlers/twowheeldrivecommandhandler", "commands/directionkeycommand", "services/learningservice", "commands/startlearningcommand", "commands/endlearningcommand", "commands/runlearntsequencecommand", "helpers/vector", "services/touchservice", "commands/setfullstatecommand"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var robot_1, fakepinfactory_2, linesensor_1, linesensorarray_1, defaultcontrolmodule_1, defaultdomainservice_1, linesensationhandler_1, motoreventhandler_1, fakemotorfactory_1, twowheeldrivecommandhandler_1, directionkeycommand_3, learningservice_1, startlearningcommand_2, endlearningcommand_2, runlearntsequencecommand_2, vector_1, touchservice_1, setfullstatecommand_3, domainService, controlModule, leftMotor, rightMotor, lineSensorArray, lineSensors, i, lineSensor, robot, keys, setKeyState, tryKeySwitch, learningService, canvas, ctx, checkPositionColour, MyLine, myLine, touchService, started, VirtualRobot, virtualRobot, run;
    return {
        setters: [
            function (robot_1_1) {
                robot_1 = robot_1_1;
            },
            function (fakepinfactory_2_1) {
                fakepinfactory_2 = fakepinfactory_2_1;
            },
            function (linesensor_1_1) {
                linesensor_1 = linesensor_1_1;
            },
            function (linesensorarray_1_1) {
                linesensorarray_1 = linesensorarray_1_1;
            },
            function (defaultcontrolmodule_1_1) {
                defaultcontrolmodule_1 = defaultcontrolmodule_1_1;
            },
            function (defaultdomainservice_1_1) {
                defaultdomainservice_1 = defaultdomainservice_1_1;
            },
            function (linesensationhandler_1_1) {
                linesensationhandler_1 = linesensationhandler_1_1;
            },
            function (motoreventhandler_1_1) {
                motoreventhandler_1 = motoreventhandler_1_1;
            },
            function (fakemotorfactory_1_1) {
                fakemotorfactory_1 = fakemotorfactory_1_1;
            },
            function (twowheeldrivecommandhandler_1_1) {
                twowheeldrivecommandhandler_1 = twowheeldrivecommandhandler_1_1;
            },
            function (directionkeycommand_3_1) {
                directionkeycommand_3 = directionkeycommand_3_1;
            },
            function (learningservice_1_1) {
                learningservice_1 = learningservice_1_1;
            },
            function (startlearningcommand_2_1) {
                startlearningcommand_2 = startlearningcommand_2_1;
            },
            function (endlearningcommand_2_1) {
                endlearningcommand_2 = endlearningcommand_2_1;
            },
            function (runlearntsequencecommand_2_1) {
                runlearntsequencecommand_2 = runlearntsequencecommand_2_1;
            },
            function (vector_1_1) {
                vector_1 = vector_1_1;
            },
            function (touchservice_1_1) {
                touchservice_1 = touchservice_1_1;
            },
            function (setfullstatecommand_3_1) {
                setfullstatecommand_3 = setfullstatecommand_3_1;
            }
        ],
        execute: function () {
            domainService = new defaultdomainservice_1.DefaultDomainService();
            controlModule = new defaultcontrolmodule_1.DefaultControlModule(domainService);
            controlModule.registerSensationHandler(new linesensationhandler_1.LineSensationHandler());
            leftMotor = fakemotorfactory_1.fakeMotorFactory("leftMotor", 20, 21, 22);
            rightMotor = fakemotorfactory_1.fakeMotorFactory("rightMotor", 23, 24, 25);
            controlModule.registerCommandHandler(new twowheeldrivecommandhandler_1.TwoWheelDriveCommandHandler());
            controlModule.registerRobotEventHandler(new motoreventhandler_1.MotorEventHandler([
                leftMotor,
                rightMotor
            ]));
            lineSensorArray = new linesensorarray_1.LineSensorArray();
            lineSensors = [];
            for (i = 0; i < 5; i++) {
                lineSensor = new linesensor_1.LineSensor(i, i, fakepinfactory_2.fakePinFactory);
                lineSensorArray.registerLineSensor(lineSensor);
            }
            //how to trigger a pin.
            //(<FakePin>lineSensorArray._lineSensors[0]._pin).triggerWatch(null, 1);
            // controlModule.registerCommandHandler({
            // 	handles: ["*"],
            // 	handle: (c => {
            // 		console.log("command", c);
            // 		return [];
            // 	})
            // });
            // controlModule.registerRobotEventHandler({
            //     handles: ["*"],
            //     handle: (e => {
            //         console.log("event", e);
            //     })
            // });
            robot = new robot_1.Robot(controlModule, [], [
                lineSensorArray
            ]);
            keys = [];
            setKeyState = (keyName, state) => {
                if (keys[keyName] === state) {
                    return;
                }
                keys[keyName] = state;
                controlModule.handle(new directionkeycommand_3.DirectionKeyCommand(keyName, state));
            };
            tryKeySwitch = (keyCode, value) => {
                switch (keyCode) {
                    case "ArrowLeft":
                        setKeyState("left", value);
                        break;
                    case "ArrowRight":
                        setKeyState("right", value);
                        break;
                    case "ArrowUp":
                        setKeyState("up", value);
                        break;
                    case "ArrowDown":
                        setKeyState("down", value);
                        break;
                    case "KeyS":
                        (value && controlModule.handle(new startlearningcommand_2.StartLearningCommand("test")));
                        break;
                    case "KeyE":
                        (value && controlModule.handle(new endlearningcommand_2.EndLearningCommand()));
                        break;
                    case "KeyR":
                        (value && controlModule.handle(new runlearntsequencecommand_2.RunLearntSequenceCommand("test")));
                        break;
                }
            };
            learningService = new learningservice_1.LearningService();
            learningService.attachToControlModule(controlModule);
            learningService.sequences = [];
            document.onkeydown = e => tryKeySwitch(e.code, true);
            document.onkeyup = e => tryKeySwitch(e.code, false);
            canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext("2d");
            checkPositionColour = (v) => {
                var imgData = ctx.getImageData(v.x, v.y, 1, 1).data;
                return imgData[0] > 200 && imgData[1] == 0 && imgData[2] == 0;
            };
            MyLine = class MyLine {
                constructor() {
                    this.points = [];
                }
                addPoint(point) {
                    this.points.push(point);
                }
                draw() {
                    if (this.points.length == 0) {
                        return;
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(255,0,0)";
                    ctx.lineWidth = 80;
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                    for (var i = 1; i < this.points.length; i++) {
                        ctx.lineTo(this.points[i].x, this.points[i].y);
                    }
                    ctx.stroke();
                    ctx.closePath();
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 1;
                }
            };
            myLine = new MyLine();
            canvas.onclick = (e) => {
                myLine.addPoint(new vector_1.Vector2d(e.offsetX, e.offsetY));
            };
            touchService = new touchservice_1.TouchService(canvas);
            touchService.registerOnTouchDownEvent((e) => myLine.addPoint(new vector_1.Vector2d(e.offsetX, e.offsetY)));
            started = false;
            VirtualRobot = class VirtualRobot {
                constructor() {
                    this.position = new vector_1.Vector2d(100, 100);
                    this.direction = new vector_1.Vector2d(1, 1);
                }
                draw() {
                    var self = this;
                    ctx.beginPath();
                    ctx.arc(self.position.x, self.position.y, 10, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(self.position.x, self.position.y);
                    var frontPoint = self.position.add(self.direction.multiplyBy(10));
                    ctx.lineTo(frontPoint.x, frontPoint.y);
                    var rightFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32));
                    var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
                    ctx.moveTo(leftFront.x, leftFront.y);
                    ctx.lineTo(rightFront.x, rightFront.y);
                    ctx.stroke();
                    ctx.closePath();
                    var perp = self.direction.getPerpendicularVector().multiplyBy(16);
                    for (var i = 0; i < 5; i++) {
                        ctx.beginPath();
                        var gr = 200 - 50 * i;
                        ctx.fillStyle = `rgb(${gr},${gr},${gr})`;
                        var pos = leftFront.add(perp.multiplyBy(i));
                        ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.closePath();
                    }
                }
                update() {
                    var self = this;
                    var leftSpeed = leftMotor.getSpeed() * 5;
                    var rightSpeed = rightMotor.getSpeed() * 5;
                    var frontPoint = self.position.add(self.direction.multiplyBy(10));
                    var leftFront = frontPoint.add(self.direction.getPerpendicularVector().multiplyBy(32).reverse());
                    var perp = self.direction.getPerpendicularVector().multiplyBy(16);
                    var pos = leftFront;
                    for (var i = 0; i < 5; i++) {
                        var colourCheckPos = pos.add(self.direction.multiplyBy(4));
                        var pin = lineSensorArray._lineSensors[i]._pin;
                        var isLine = checkPositionColour(colourCheckPos) ? 1 : 0;
                        if (isLine != pin.value()) {
                            if (started == false) {
                                controlModule.handle(new setfullstatecommand_3.SetFullStateCommand(true, false, false, false, 0.2, 0));
                                started = true;
                            }
                            pin.triggerWatch(null, checkPositionColour(colourCheckPos) ? 1 : 0);
                        }
                        pos = pos.add(perp);
                    }
                    var leftVelocity = self.direction.multiplyBy(leftSpeed);
                    var rightVelocity = self.direction.multiplyBy(rightSpeed);
                    var averageVelocity = leftVelocity.add(rightVelocity).multiplyBy(0.5);
                    var rotationAngle = (leftSpeed - rightSpeed) / 60;
                    self.direction = self.direction.rotate(rotationAngle);
                    self.position = self.position.add(averageVelocity);
                }
            };
            virtualRobot = new VirtualRobot();
            run = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                myLine.draw();
                virtualRobot.update();
                virtualRobot.draw();
                window.requestAnimationFrame(run);
            };
            run();
        }
    };
});
//# sourceMappingURL=virtualrobot.js.map