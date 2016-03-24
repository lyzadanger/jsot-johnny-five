const five = require('johnny-five');
const board = new five.Board();
const MAGNETIC_DECLINATION = 15;
const ALERT_THRESHOLD = 5;

function checkHeading (heading, piezo) {
  const shouldAlert = (heading > 360 - ALERT_THRESHOLD ||
    heading < 0 + ALERT_THRESHOLD);
  if (shouldAlert) {
    piezo.frequency(587, 500);
  }
}

function correctHeading (rawHeading) {
  var adjustedHeading = rawHeading - MAGNETIC_DECLINATION;
  if (adjustedHeading < 0) { adjustedHeading += 360; }
  if (adjustedHeading >= 360) { adjustedHeading -= 360; }
  return Math.floor(adjustedHeading);
}

board.on('ready', () => {
  var currentHeading;
  const compass = new five.Compass({
    controller: 'HMC5883L'
  });
  const piezo = new five.Piezo({
    pin: 11
  });
  compass.on('data', function () {
    currentHeading = correctHeading(this.heading);
    checkHeading(currentHeading, piezo);
  });
});
