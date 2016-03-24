const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const proximitySensor = new five.Proximity({
    controller: 'GP2Y0A41SK0F',
    pin: 'A4'
  });
  const proximitySensorLED = new five.Led(8);
  proximitySensor.on('change', function () {
    if (proximitySensor.cm > 0 &&
        proximitySensor.cm < 4) {
      proximitySensorLED.on();
    } else {
      proximitySensorLED.off();
    }
  });
});
