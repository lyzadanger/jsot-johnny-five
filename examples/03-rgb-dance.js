const five           = require('johnny-five');
const board          = new five.Board();

board.on('ready', function () {
  const colorLED = new five.Led.RGB([6, 5, 3]);
  var colors = [ '#ffffff', '#ff0000', '#ffff00', '#ff00ff', '#0000ff'];
  var colorIndex = 0;
  function danceColor () {
    if (colorIndex >= colors.length) { colorIndex = 0; }
    colorLED.color(colors[colorIndex]);
    colorIndex++;
  }
  setInterval(danceColor, 250);
});
