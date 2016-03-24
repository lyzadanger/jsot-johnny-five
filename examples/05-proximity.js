const five = require('johnny-five');
const board = new five.Board();
const DISTANCE_THRESHOLD = 6;

board.on('ready', () => {
  // Add a proximity Sensor with a common infrared controller
  const proximitySensor = new five.Proximity({
    controller: 'GP2Y0A41SK0F',
    pin: 'A4'
  });

  // Status LED when something gets too close
  const proximitySensorLED = new five.Led(8);

  proximitySensor.on('change', function () {
    if (proximitySensor.cm > 0 &&
        proximitySensor.cm < DISTANCE_THRESHOLD) {
      proximitySensorLED.on();
    } else {
      proximitySensorLED.off();
    }
  });
});
