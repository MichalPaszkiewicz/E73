# Assuming use of adxl345 three-axis accelerometer.

Requires adxl345-sensor package. Install the package with:

```
npm install adxl345-sensor
```

To wire in the accelerometer, you will need your accelerometer wired into your robot.

```javascript
var myControlModule = new DefaultControlModule(new DefaultDomainService());
var myRobot = new Robot(myControlModule, [

], [
    new Accelerometer()
])
```

You will then need to create a sensation handler that will handle an AccelerationFeltSensation.

```javascript
class SuperAccelerationSensationHandler implements IAmASensationHandler{
    handles = [ACCELERATION_FELT_SENSATION_NAME]

    handle(sensation: AccelerationFeltSensation, domainService: IAmADomainService){
        //do things
        return [SOME_EVENT_CAUSED_BY_THIS_SENSATION];
    }
}
```