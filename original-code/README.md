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

