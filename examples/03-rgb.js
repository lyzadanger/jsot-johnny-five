//const five = require('johnny-five');
const webColors = require('website-color-extractor');

//const board = new five.Board();

webColors.frequent({
  amount: 10,
  pages : [
    ['https://raw.githubusercontent.com/rwaldron/johnny-five/master/docs/breadboard/led-rgb.png',
    ['1200x1200'],
    { crop: true }]
  ]
}, (err, colors) => {
  // Throw out greys because boring
  const interestingColors = colors[0].filter(color => {
    return (!(color.r === color.g && color.g === color.b));
  });
  console.log(interestingColors);
  // Set colors
});
