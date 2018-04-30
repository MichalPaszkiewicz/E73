# How to code in the E73 framework

To begin with, it is worth looking into the following files for guidance on how to write high level code:

- client.ts
- server.ts
- simulation.ts
- virtualrobot.ts

Each of these use the framework from start to finish to achieve their goals. Most of the code is easily reusable for any new features you may want to add.

## High level framework design

The prime object within this project is the Robot (./objects/robot). To create a robot, you will need the following code:

```javascript
var domainService = new DefaultDomainService();
// The domain service provides your command handlers with aggregate roots.
// Aggregate roots are the objects within you should write any business logic that transforms a command or sensation into an IAmARobotEvent
// A command handler picks commands and queries the domain service for the correct aggregate root to deal with that command.

var controlModule = new DefaultControlModule();
// Your control module is the object to which you register your command, sensation and event handlers.
// Sensation handlers are the same as Command Handlers, but they deal with sensations instead of with commands.
// Event handlers are the objects that provide you with the methods that you want performed when a particular IAmARobotEvent has been triggered.
// The control module can also be used to directly handle your commands by using: controlModule.handle(new SomeCommand());

var robot = new Robot(controlModule, [
    // Here goes a list of any IAmAUserInterface objects that you need for your project. This may be a Http or bluetooth service that acquires commands from a seperate device, or they may be a local device that interacts with the robot, such as a keyboard or a touch screen.
], [
    // This array holds any sensors that can affect the behaviour of the robot.
    // Sensors and sensations are split away from User Interfaces and commands in order to allow a promotion of the hierarchy of commands above sensors - since we do not want our robot to become sentient.
]);
```