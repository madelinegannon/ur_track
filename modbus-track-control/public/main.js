var socket = io('/controller');

socket.on('connect', function() {
  console.log('Connected to Server');
})

socket.on('message', function(data) {
  console.log(data);
})


$('.btn').mousedown(function(e) {
  console.log('button clicked!');
  e.preventDefault();
  var _this = $(this);


  // QUERY ------------------------------------------------------------------------------------

  if (_this.hasClass('b0')){
    console.log('Button 0 - Write Register')
    if (document.getElementById('wr-register').value != null) {
      var r = '0x0' + document.getElementById('wr-register').value;
    } else {
      var r = '0x0';
    }

    if (document.getElementById('wr-data').value != null) {
      var d = '0x' + document.getElementById('wr-data').value;
    } else {
      var r = '0x0';
    }
    //console.log(parseInt(r));
    var packet = {
      name: "Write Register",
      register: parseInt(r),
      data: parseInt(d)
    }

    socket.emit('command', packet);
  }

  if (_this.hasClass('b1')){
    console.log('Button 1 - Read Register')
    if (document.getElementById('rr-register').value != null) {
      var r = '0x0' + document.getElementById('rr-register').value;
    } else {
      var r = '0x0';
    }

    if (document.getElementById('rr-data').value != null) {
      var d = '0x' + document.getElementById('rr-data').value;
    } else {
      var r = '0x0';
    }
    //console.log(parseInt(r));
    var packet = {
      name: "Read Register",
      register: parseInt(r),
      data: parseInt(d)
    }

    socket.emit('command', packet);
  }

  if (_this.hasClass('b2')){
    console.log('Button 2 - Home Track')

    var packet = {
      name: "Home Track",
      register: 0x0407,
      data: 0x08
    }

    socket.emit('command', packet);
  }

  if (_this.hasClass('b7')){
    console.log('Button 7 - Configure Default Inputs')

    var packet = {
      name: "Configure Default Inputs",
      register: 0x0308,
      data: 0xFF3E
    }

    socket.emit('command', packet);
  }

  if (_this.hasClass('b3')){
    console.log('Button 3 - Alarm Reset')

    var packet = {
      name: "Alarm Reset",
      register: 0x0308,
      data: 0x2
    }

    socket.emit('command', packet);
  }

  if (_this.hasClass('b6')){
    console.log('Button 6 - Go To Position')
    var v;
    var a;
    var d;
    var p;

    if (document.getElementById('vel').value != null) {
      v = parseInt(document.getElementById('vel').value);
    } else {
      v = 60;
    }

    if (document.getElementById('acc').value != null) {
      a = parseInt(document.getElementById('acc').value);
    } else {
      a = 1000;
    }

    if (document.getElementById('dec').value != null) {
      d = parseInt(document.getElementById('dec').value);
    } else {
      d = a;
    }

    if (document.getElementById('pos').value != null) {
      p = parseInt(document.getElementById('pos').value);
    } else {
      p = null;
    }

    var packet = {
      velocity: v,
      acceleration: a,
      deceleration: d,
      position: p
    }

    if (p != null){
      socket.emit('position', packet);
    }

  }

});

//-------------------------------------------------------------------------------------------
// MOUSE UP ---------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

$('.btn').mouseup(function(e) {
  //console.log('button released!');
  e.preventDefault();
  var _this = $(this);

  if (_this.hasClass('b10')){
    console.log('Button 10 - Clockwise Jog - STOP')
    var command = 'SJ';

    socket.emit('query', command);
  }

  if (_this.hasClass('b11')){
    console.log('Button 11 - Counter Clockwise Jog - STOP')
    var command = 'SJ';

    socket.emit('query', command);
  }

});
