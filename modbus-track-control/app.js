// create an empty modbus client
var ModbusRTU         = require("modbus-serial");
var Drive             = require("./drive.js");
var winston           = require('winston');
var crc16             = require('./crc16.js')
var lrc               = require('./lrc.js')
var SerialPort        = require('serialport');
var emitter           = require("events");
var express           = require('express');
var expressLayouts    = require("express-ejs-layouts");
var http 			        = require("http");
var path              = require('path');
var app               = express();

var DRIVE_ADDRESS = 1;
var WRITE = 6;
var READ = 3;

var DI_REGISTER            = 0x0407;
var HOME_COMMAND           = 0x8;
var TRIGGER_COMMAND        = 0x4;
var ALARM_RESET_COMMAND    = 0x2;
var POS_SELECT_0           = 0x10;
var POS_SELECT_1           = 0x20;
var REVS_REGISTER          = 0x010F;
var COUNTS_REGISTER        = 0x0110;

var DEBUG_LOG = true;

/* Command Infos

Set Up DIs for Modbus Control      = Regsiter: 308, Command: FF3E
Seek Home                          = Register: 407, Command: 8
Trigger                            = Register: 407, Command: 4
Alarm Reset                        = Register: 407, Command: 2
Position Command Select 0          = Register: 407, Command: 10
Position Command Select 1          = Register: 407, Command: 20

*///----------------------------------------------------------------------------

// Logger ----------------------------------------------------------------------
var logger = new (winston.Logger)({
    levels: {info: 0, notice: 1, warning: 2, success: 3, error: 4},
    colors: {info: "blue", notice: "yellow", warning: "magenta", success:"green", error: "red"},
    transports: [
        new winston.transports.Console({
            level: "error",
            colorize: true
        })
    ]
});

// Server/App ------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views')); // set the views folder in this directory as the one the app references
app.set('view engine', 'ejs'); // set the views engine to look for .ejs files
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
server.listen(8003, function() {
	logger.info('==== APP ====', 'Server Created')
});

var router = express.Router();

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Socket IO -------------------------------------------------------------------

var io = require("socket.io")(server);

var socket = io.of('/controller');

socket.on('connection', function(socket) {
	logger.info('==== APP ====', 'Page Conencted to Socket');

	socket.on('command', function(packet) {
		logger.notice('== APP ====', 'Received Command')
    var msg = buildPacket(DRIVE_ADDRESS, WRITE, packet.register, packet.data);//'010603000002'
    console.log(msg);
    drive.write(msg);
	})

  socket.on('position', function(packet) {
    logger.notice('== APP ====', 'Received Position Command')
    var revs;
    var counts
    var trigger = buildPacket(DRIVE_ADDRESS, WRITE, DI_REGISTER, TRIGGER_COMMAND);
    var posSelect = buildPacket(DRIVE_ADDRESS, WRITE, DI_REGISTER, POS_SELECT_0);
    if (Math.abs(packet.position) < 10000) {
      revs = buildPositionPacket(DRIVE_ADDRESS, WRITE, REVS_REGISTER, 0);
      counts = buildPositionPacket(DRIVE_ADDRESS, WRITE, COUNTS_REGISTER, packet.position);
    } else {
      var getRevs = Math.trunc(packet.position/10000);
      var getCounts = packet.position-(getRevs*10000);
      revs = buildPositionPacket(DRIVE_ADDRESS, WRITE, REVS_REGISTER, getRevs);
      counts = buildPositionPacket(DRIVE_ADDRESS, WRITE, COUNTS_REGISTER, getCounts);
    }

    if (DEBUG_LOG) {
      console.log("Revolutions:     " + revs);
      console.log("Counts:          " + counts);
      // console.log("Position Select: " + posSelect);
      // console.log("Trigger:         " + trigger);
    }

    drive.write(counts);
    drive.write(revs);


    //drive.write(posSelect);
    //drive.write(trigger);
  })

});

// Drive ------------------------------------------------------------------------------------------

var drive = new Drive();

SerialPort.list(function (err, ports) {
   ports.forEach(function(port) {
     if (port.manufacturer == 'Prolific') {
       drivePort = port.comName;
       drive.initialize(port.comName, 19200);
       //console.log(drivePort);
     }
   });
 });

drive.on('open', function() {
	logger.notice('== APP ====', 'Drive Connected');


})

var buildPacket  = function (address, command, register, data) {
  var packet = Buffer.allocUnsafe(6).fill(0);
  packet.writeUIntBE(address,0,1);
  packet.writeUIntBE(command,1,1);
  packet.writeUIntBE(register,2,2);
  packet.writeUIntBE(data,4,2);
  //console.log(packet);
  var packetLRC = lrc(packet);
  var returnPacket = ':' + buffToString(packet).toUpperCase() + packetLRC.toString(16).toUpperCase() + '\r\n'
  return returnPacket;
}

var buildPositionPacket  = function (address, command, register, data) {
  var packet = Buffer.allocUnsafe(6).fill(0);
  packet.writeUIntBE(address,0,1);
  packet.writeUIntBE(command,1,1);
  packet.writeUIntBE(register,2,2);
  packet.writeIntBE(data,4,2);
  //console.log(packet);
  var packetLRC = lrc(packet);
  var returnPacket = ':' + buffToString(packet).toUpperCase() + packetLRC.toString(16).toUpperCase() + '\r\n'
  return returnPacket;
}

var buffToString = function (buffer) {
  var buffString = '';
  for (var i = 0; i < buffer.length; i++) {
    var value = buffer[i].toString(16);
    if (value.length == 1) {
      value = '0'+value;
    }
    buffString += value;
  }
  //console.log(buffString);
  return buffString;
}
