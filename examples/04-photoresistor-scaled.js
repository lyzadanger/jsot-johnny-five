const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const photoResistor = new five.Sensor('A3');
  var minVal = 255;
  var maxVal = 0;
  photoResistor
    .scale(0, 255)
    .on('change', function () {
      const currentVal = Math.round(this.value);
      if (currentVal > maxVal) { maxVal = currentVal; }
      if (currentVal < minVal) { minVal = currentVal; }
      this.booleanAt((maxVal + minVal) / 2);
      console.log(this.boolean);
    });
});
