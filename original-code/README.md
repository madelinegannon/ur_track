# Position Control for Track
Original code running on the Arduino Micro that talks to the Sureservo motor driver.

### Running the Ardino Sketch
The following protocol was testing with Arduino 1.8.8

1. Connect the Arduino Micro from the Track Control Box to your PC via USB.
2. Open `position_trigger.ino`
3. Select the correct board: _Tools > Board > Arduino/Genuino Micro_
4. Select the correct port: _Tools > Port > COMX (Arduino/Genuino Micro)_
5. If this code is not currently uploaded onto the board, hit the `UPLOAD` button on the top left of the UI.
6. Open the Serial Monitor (the magnifying glass icon on the top right of the UI).
7. Now you can enter and send commands to the motor driver using the commands below.

### Running the Grasshopper Script
With the grasshopper script, we just communicate to the Arduino over a general serial port connection. The following was tested with Grasshopper 0.9.0076 and [Firefly 1.0.0.70](http://www.fireflyexperiments.com/download)

1. Connect the Arduino Micro from the Track Control Box to your PC via USB.
2. Open Rhino3D, start Grasshopper, and open `position_trigger.gh`
3. In the first group, select the correct port number. _HINT: you can always open the Arduino IDE to check the proper port number (e.g., COM3 or COM5)_ 
4. In the first group, toggle Open Serial Connection to TRUE.
5. To send position control commands:
    1. Use the slider to select the desired position
        - Position 0 is closest to the HOME end
        - Position 7 is closest to the MOTOR end
    2. Write the Position to the Arduino by setting the Start Toggle in (2.) to TRUE
    3. When you're ready to _Send_ the position (for the track to move), set the Start Toggle in (3.) to TRUE
        - `IMPORTANT:` `DO NOT toggle back to FALSE until the track has finished moving`
6. To call the homing routine:
    - Set all the toggles in the Control Positions group to FALSE
    - Set the Start Toggle in the Homing group to TRUE
    - Once the track is done homing, toggle back to FALSE


### Commands
To send commands to the track, first open a serial monitor and make sure the rate is set to 19200 bauds.
1. In the top input bar, type one of the keys below to set the approprate pins on the board. 
2. Hit Enter
3. Type `'9'` to trigger that action.
4. Hit Enter. The track should now be executing that command.

```
'e' = enable
'd' = disable
'9' = trigger
'h' = home
'0' = Position 0
'1' = Position 1
'2' = Position 2
'3' = Position 3
'4' = Position 4
'5' = Position 5
'6' = Position 6
'7' = Position 7
```

Example:
The input sequence
```
'h' 
<ENTER>
'9'
<ENTER>
```
will run the homing routine for the track.

The input sequence
```
'2' 
<ENTER>
'9'
<ENTER>
```
will move the robot to the 3rd recorded position on the track.

