const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  var minVal = 255;
  var maxVal = 0;
  const photoResistor = new five.Sensor('A3');
  const photoResistorLED = new five.Led(7);
  photoResistor
    .scale(0, 255)
    .on('change', function () {
      const currentVal = Math.round(this.value);
      if (currentVal > maxVal) { maxVal = currentVal; }
      if (currentVal < minVal) { minVal = currentVal; }
      this.booleanAt((maxVal + minVal) / 2);

      if (this.boolean) {
        photoResistorLED.off();
        console.log('bright');
      } else {
        photoResistorLED.on();
        console.log('dim');
      }
    });
});
