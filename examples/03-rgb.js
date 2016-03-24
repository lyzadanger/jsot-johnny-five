const five           = require('johnny-five');
const webColors      = require('website-color-extractor');
const board          = new five.Board();

const COLOR_DURATION = 2000;
const WEBSITE        = 'https://www.npmjs.com';

/**
 * Cycle through the colors in `colors`, one per every COLOR_DURATION
 */
function cycleColors (led, colors, index) {
  if (!index || index >= colors.length) { index = 0; }
  console.log('changing colors', colors[index]);
  led.color([colors[index].r, colors[index].g, colors[index].b]);
  setTimeout(() => {
    cycleColors(led, colors, index += 1);
  }, COLOR_DURATION);
}

board.on('ready', function () {
  const colorLED = new five.Led.RGB([6, 5, 3]);
  webColors.frequent({
    amount: 20,
    pages : [
      [WEBSITE,
      ['1024x768'],
      { crop: true }]
    ]
  }, (err, colors) => {
    // Throw out greys because boring
    const mainColors = colors[0].filter(color => {
      return (!(color.r === color.g && color.g === color.b));
    });
    cycleColors(colorLED, mainColors);
  });
});
