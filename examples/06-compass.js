const five = require('johnny-five');
const board = new five.Board();
const MAGNETIC_DECLINATION = 15; // Portland, Ore., approx. magnetic declination
const ALERT_THRESHOLD = 5; // How many degress from north should count as north?

function isNorth (heading) {
  return (heading > 360 - ALERT_THRESHOLD ||
    heading < 0 + ALERT_THRESHOLD);
}

/**
 * Adjust `rawHeading` for local magnetic declination and then
 * bound it between 0-360
 */
function adjustHeading (rawHeading) {
  var adjustedHeading = rawHeading - MAGNETIC_DECLINATION;
  if (adjustedHeading < 0) { adjustedHeading += 360; }
  if (adjustedHeading >= 360) { adjustedHeading -= 360; }
  return Math.floor(adjustedHeading);
}

board.on('ready', () => {
  const compass = new five.Compass({
    controller: 'HMC5883L'
  });
  const piezo = new five.Piezo({
    pin: 11
  });
  compass.on('data', function () {
    if (isNorth(adjustHeading(this.heading))) {
      piezo.frequency(587, 500);
    }
  });
});
