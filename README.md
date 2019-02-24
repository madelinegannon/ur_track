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
To 'manually' jog the track motor through the Sureservo drive:

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

_`Note` The motor WILL NOT jog if the arudino inside is not externally powered (i.e., plug the arduino into your PC)._

For more detailed instructions, see page 73 of the [Sureservo Manual](/reference)
![](https://github.com/madelinegannon/ur_track/blob/master/reference/how-to_jog.png)

Automation Direct also has a step-by-step [youtube tutorial](https://youtu.be/mXcDYoz1iMo) for How to Jog the servo Motor

### Instructions: Teaching Absolute Positions
The Sureservo drive has 8 programmable positions that can be externally triggered (_currently by an arduino micro in the track's control box_). You program an absolute position for the track in terms of motor REVS (revolutions) and COUNTS (encoder counts):

```
1 REV = 10,000 COUNTS

For example:
46.5 revs = 46 revs + 5,000 counts
```

For our track, we have estimated that `46.5 revs = 1 meter` of travel distance. *<-- this still needs to be verified*


Automation Direct has a great step-by-step [youtube tutorial](https://youtu.be/QJGwrEGMhjo) for How to Use Sureservo's Position Register Mode. 

You navigate the Sureservo drive interface similarly to the Jogging tutorial above:

1. Press `MODE`
2. Press `NEXT` until you see `P1-00` on the display
3. Press the `UP/DN` arrow until you see `P1-15`

- This is where you input the `REV` for the 1st recorded postion

4. Press `ENTER` to save or `MODE` to go back
5. Press `MODE`
6. Press the `UP/DN` arrow until you see `P1-16`

- This is where you input the `COUNT` for the 1st recorded postion

7. 4. Press `ENTER` to save or `MODE` to go back
8. Press `MODE`
9. Press the `UP/DN` arrow until you see `P1-17`

- This is where you input the `REV` for the 2nd recorded postion

10. Repeat for Position Command Parameters `P1-15` to `P1-30`

![](https://github.com/madelinegannon/ur_track/blob/master/reference/position-command-paramters.png)


For more detailed instructions, see page 74 of the [Sureservo Manual](/reference)
![](https://github.com/madelinegannon/ur_track/blob/master/reference/how-to_teach-positions.png)





