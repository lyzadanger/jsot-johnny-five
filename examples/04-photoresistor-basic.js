const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const photoResistor = new five.Sensor('A3');
  photoResistor
    .on('change', function () {
      const currentVal = Math.round(this.value);
      console.log(currentVal);
    });
});
