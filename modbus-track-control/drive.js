var util              = require('util');
var SerialPort        = require('serialport');
var events            = require('events');
var winston           = require('winston');

// Logger -----------------------------------------------------------------------------------------

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

var Drive = function() {
	var _this = this;
	_this.open = false;

	_this.sentCommands = [];
	//var packet_length
	_this.response = "";
	//_this.jogging = false;

	this.initialize = function(_port, _baudRate){
		_this.serial = new SerialPort(_port, {
			baudRate: _baudRate,
			dataBits: 8,
			parity: 'none',
			stopBits: 2,
			//flowControl: false,
			//lock: false,
			//parser: SerialPort.parsers.ByteLength(10),
			disconnectedCallback: function(e) {
				_this.open = false;
				logger.error('=== DRIVE ===', 'Serial port: '+ port +' disconnected');
				_this.emit('disconnected');
			}
		});

		_this.serial.on('open', function() {
			_this.open = true;
			logger.info('=== DRIVE ===', 'Serial Port Opened');
			_this.emit("open");
		});

		_this.serial.on('data', function(data) {
      //console.log(parseInt(data));
			var msg = _this.serial.read(10);//Buffer.allocUnsafe(10).fill(0);
      //msg.writeUIntBE(data,0,6);
		//	_this.response = _this.response + msg
      console.log(parseInt(msg[0]));
      _this.response = '';
      //this.flush();
		});
	}

	this.write = function(data, cb) {
		logger.info('=== DRIVE ===', 'Sending: ' + data);
    _this.serial.flush();
		var result = _this.serial.write(data);
    //_this.serial.drain();
    if (!result ){
      console.log("Draining");
      _this.serial.drain();
    }
		if (cb != null) {
			cb();
		}
	}

}

util.inherits(Drive, events.EventEmitter);

module.exports = Drive;
