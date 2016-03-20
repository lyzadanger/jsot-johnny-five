# Hardware Hacking with Johnny-Five and Node.js

## JavaScript and Hardware Together

> - Host-client method
> - Embedded JS
> - Other Methods

## Johnny-Five and Arduino

Today, we are going to set up a _host-client_ configuration using Arduino Uno development boards, _firmata_ firmware and the Johnny-Five Node.js framework.

# Arduino

## Arduino...It's Everything You Want to Be

Arduino. It's a company. It's a project. It's hardware. It's a user community.  Arduino is, well, it's _Arduino_, a broad concept combining open-source hardware and software with the goal of making it easy (and inexpensive) for beginners to build interactive devices.

## Arduino Uno

> - Most popular Arduino board
> - Great for beginners
> - Widely tested and used

## Lay of the Land

Diagram

## Arduino Workflow

1. Write code in the Arduino IDE using the Arduino programming language
2. Compile and upload (flash) sketch to board

## Hello, World LED with Arduino

```
void setup() {
  pinMode(13, OUTPUT); <1>
}
void loop() {
  digitalWrite(13, HIGH); <2>
  delay(500); <3>
  digitalWrite(13, LOW); <4>
  delay(500);
}
```

## Arduino Sketches

Once uploaded, Arduino sketch resides in microcontroller's nonvolatile _program memory_.

# Host-Client Configuration

## Controlling the Uno with JavaScript

To use the Uno in a host-client setup, we'll need to:

. . .

1. Upload _firmata_ firmware to microcontroller
2. Install Johnny-Five framework

## Firmata

> - Firmata _protocol_
> - Arduino firmata _implementation_

## Flashing Firmata

1. Open Arduino IDE
2. Connect the Uno with USB
3. In the `File -> Examples` menu, find the `Firmata` submenu and select `StandardFirmata`
4. Upload the `StandardFirmata` sketch to the Arduino

## Installing Johnny-Five

Johnny-Five is a Node.js firmata-based framework for controlling hardware platforms using a host-client configuration.

```
mkdir playtime
cd playtime
npm install johnny-five
```

# Hello, World Blink with Johnny-Five

## Hello, World Script

```
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(13);
  led.blink(500);
});
```
hello.js

## Arduino Lifecycle vs. Johnny-Five Lifecycle

> - Arduino `loop` vs. Johnny Five `Board.on('ready',...)`
> - Johnny-Five event-driven
> - `blink` uses `setInterval` under the covers
> - How can we interact with an LED?

## Adapting Hello, World

```
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(13);
  var blinkCount = 0;
  const blinkMax = 10;

  led.blink(500, () => {
    blinkCount++;
    console.log(`I have changed state ${blinkCount} times`);
    if (blinkCount >= blinkMax) {
      console.log('I shall stop blinking now');
      led.stop();
    }
  });
});
```

# Led and Other Johnny-Five Classes

## Led Methods

* `on`, `off`
* `blink` (a.k.a. `strobe`)

## Led Methods Requiring PWM

Basic PWM diagram (maybe reusable in book!)

## Node.js Ecosystem

## RGB Leds


## Weatherball

# Sensors and Johnny-Five

## TMP 36 Example

## TMP 36 Plus RGB LEDs

# Serial Data

## Magnetometer

# Output

## Magnetometer Plus Servo

## Motor Drivers (BRIEF!)
