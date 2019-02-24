
#define LED_PIN     13

//External Inputs to Motor
//DI7 - Forward Limit Switch  P2-16 - 0023  (Normally Open)                      
//DI8 - Reverse Limit Switch  P2-17 - 0022  (Normally Open)

//Arduino Outputs to Motor
//DI1 - Servo Enable          P2-10 - 0101
//DI2 - Position Bit 1        P2-11 - 0111
//DI3 - Position Bit 2        P2-12 - 0112
//DI4 - Position Bit 3        P2-13 - 0113
//DI5 - Position Trigger      P2-14 - 0108
//DI6 - Homing Trigger        P2-15 - 0127
#define SERVO_EN    11
#define POS1_PIN    10
#define POS2_PIN    9
#define POS3_PIN    8
#define POS_TRIG    7
#define HOME_TRIG   6

//Arduino Inputs from Motor
//DO3 - Homing Complete       P2-18 - 0109       
//DO4 - At Position           P2-19 - 0105
#define AT_HOME     4
#define AT_POS      5

#define MOVE_TIMEOUT     30000           //in mS

int i;
unsigned long stop,time;

//Commands
//'e' = enable
//'d' = disable
//'9' = trigger
//'h' = home
//'0' = Position 0
//'1' = Position 1
//'2' = Position 2
//'3' = Position 3
//'4' = Position 4


void setup() {
  Serial.begin(19200);
  delay(1000);
  
  pinMode(LED_PIN, OUTPUT);

  digitalWrite(SERVO_EN, HIGH);   //Enable on Boot
  digitalWrite(POS1_PIN, LOW);
  digitalWrite(POS2_PIN, LOW);
  digitalWrite(POS3_PIN, LOW);
  digitalWrite(POS_TRIG, LOW);
  digitalWrite(HOME_TRIG, LOW);
  
  pinMode(SERVO_EN, OUTPUT);
  pinMode(POS1_PIN, OUTPUT);
  pinMode(POS2_PIN, OUTPUT);
  pinMode(POS3_PIN, OUTPUT);
  pinMode(POS_TRIG, OUTPUT);
  pinMode(HOME_TRIG, OUTPUT);

  pinMode(AT_HOME, INPUT);
  pinMode(AT_POS, INPUT);
}

void loop() {
  uint8_t moving;
  if (Serial.available()) 
  {
    char data = Serial.read();     
    //************
    //Home Trigger 
    if(data == 'h')
    {
      Serial.println("yo");
      digitalWrite(HOME_TRIG, HIGH);
      blink_LED();
      digitalWrite(HOME_TRIG, LOW);
      delay(100);
      moving = 0;
      stop = millis()+MOVE_TIMEOUT;
      time = millis();
      while(!moving && time<stop)
      {
        delay(100);
        moving = digitalRead(AT_POS);
        time = millis();
      };
      //**********************************************
      //Check if we timed out or finished successfully
      if(!moving)
      {
        Serial.println("88");
      }
      else
      {
        Serial.println("99");
      }
      //Flush the incoming buffer
      while(Serial.available())
      {
        Serial.read();
      }
    }
    //**************
    //Enable/Disable
    if(data == 'e')
    {
      digitalWrite(SERVO_EN, HIGH);
      blink_LED();
    }
    if(data == 'd')
    {
      digitalWrite(SERVO_EN, LOW);
      blink_LED();
    }
    //*********
    //Positions
    if(data == '0')
    {
      digitalWrite(POS1_PIN, LOW);
      digitalWrite(POS2_PIN, LOW);
      digitalWrite(POS3_PIN, LOW);
      blink_LED();
    }
    if(data == '1')
    {
      digitalWrite(POS1_PIN, HIGH);
      digitalWrite(POS2_PIN, LOW);
      digitalWrite(POS3_PIN, LOW);
      blink_LED();
    }
    if(data == '2')
    {
      digitalWrite(POS1_PIN, LOW);
      digitalWrite(POS2_PIN, HIGH);
      digitalWrite(POS3_PIN, LOW);
      blink_LED();
    }
    if(data == '3')
    {
      digitalWrite(POS1_PIN, HIGH);
      digitalWrite(POS2_PIN, HIGH);
      digitalWrite(POS3_PIN, LOW);
      blink_LED();
    }
    if(data == '4')
    {
      digitalWrite(POS1_PIN, LOW);
      digitalWrite(POS2_PIN, LOW);
      digitalWrite(POS3_PIN, HIGH);
      blink_LED();
    }
    if(data == '5')
    {
      digitalWrite(POS1_PIN, HIGH);
      digitalWrite(POS2_PIN, LOW);
      digitalWrite(POS3_PIN, HIGH);
      blink_LED();
    }
    if(data == '6')
    {
      digitalWrite(POS1_PIN, LOW);
      digitalWrite(POS2_PIN, HIGH);
      digitalWrite(POS3_PIN, HIGH);
      blink_LED();
    }
    if(data == '7')
    {
      digitalWrite(POS1_PIN, HIGH);
      digitalWrite(POS2_PIN, HIGH);
      digitalWrite(POS3_PIN, HIGH);
      blink_LED();
    }
    //****************
    //Position Trigger   
    if(data == '9')
    {
      digitalWrite(POS_TRIG, HIGH);
      blink_LED();
      digitalWrite(POS_TRIG, LOW);
      delay(100);
      moving = 0;
      stop = millis()+MOVE_TIMEOUT;
      time = millis();
      while(!moving && time<stop)
      {
        delay(100);
        moving = digitalRead(AT_POS);
        time = millis();
        
        if (Serial.available()) 
        {
            char data = Serial.read();  
            if(data == 'd')
            {
              digitalWrite(SERVO_EN, LOW);
              blink_LED();   
              stop = 0;       //Set this so we abort the command         
            }
        }
      }
      //**********************************************
      //Check if we timed out or finished successfully
      if(!moving)
      {
        Serial.println("88");
      }
      else
      {
        Serial.println("99");
      }
      //Flush the incoming buffer
      while(Serial.available())
      {
        Serial.read();
      }
    }
    //*************
    //Poll Position
    if(data == 'p')
    {
      Serial.print("Home: ");
      Serial.println(digitalRead(AT_HOME));
      Serial.print("Position: ");
      Serial.println(digitalRead(AT_POS));
    }
    data = '!';
  }
}

void blink_LED()
{
  digitalWrite(LED_PIN, HIGH);
  delay(10);
  digitalWrite(LED_PIN, LOW);
}


