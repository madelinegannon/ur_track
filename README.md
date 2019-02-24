# ur_track
Code, Manuals, and References for using our linear track with URSA

## Connecting the Track to the Track Control Box
How to hook everything up.






## Servo Motor and Drive Information
The servo motor and drive for the track are from Automation Direct | link to [motor](https://www.automationdirect.com/adc/shopping/catalog/motion_control/servo_systems/drives_-a-_motors_components/svl-201b) and [drive](https://www.automationdirect.com/adc/shopping/catalog/motion_control/servo_systems/drives_-a-_motors_components/sva-2100)
```
Servo Motor Model Number: SVL-201B
Servo Drive Model Number: SVA-2100
```
More information on the servo motor and drive can be found in the [_reference_](/reference) folder of this repo.

### Instructions: Jogging
To 'manually' jog the track motor directly through the Sureservo drive:

1. Power on and enable the track
2. Remove the lid of the track control box, and find the motor drive (the big thing with the LED display).
3. Press `MODE`
4. Press `NEXT` until you see `P4-00` on the display
5. Press the `UP` arrow until you see `P4-05`
6. Press `ENTER`
7. The number you see displayed now is the SPEED 

- `Be sure to slow your speed if you're near an End-Stop limit switch. The robot will pick up a lot of momentum and you can damage the switches and the track if you crash into them.`
- 1000 is a good medium-to-high speed for jogging
- 500 slow-to-medium speed for jogging
- 10 is super slow, but precise — good for dialing in an exact encoder count

8. Press the `UP/DN` arrows to set your desired speed
9. Press `ENTER`
10. Press the `UP/DN` arrows to jog

- The `UP` arrow moves the robot AWAY from the home position.
- The `DN` arrow moves the robot TOWARDS from the home position.

For more detailed instructions, see page 74 of the [Sureservo Manual](/reference)

![](https://github.com/madelinegannon/ur_track/blob/master/reference/how-to_jog.png)

You can also watch step-by-step instructions on Automation Direct's [youtube tutorial](https://youtu.be/mXcDYoz1iMo) 

_`Note` The motor WILL NOT jog if the arudino inside is not externally powered (i.e., plug the arduino into your PC)._
