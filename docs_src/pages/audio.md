# Audio input

VEDA.js supports audio inputs.
It's built with Web Audio API and getUserMedia, so it works only when allowed by users.
When enabled the browser shows a dialog and asks the user to allow using audio input, like you see it now.


## Usage

```js
veda.toggleAudio(true);
```

Then these uniform variables will be available.

- `float volume`
- `sampler2D samples`
- `sampler2D spectrum`

`sampler2D samples` stores the most recent 256 frames from the audio input.
This is useful for drawing waveforms.

`sampler2D spectrum` stores the FFT result.
This is useful to draw the volume of specific frequency band, such as spectrum visualizer.

`float volume` is the average of all the frequency bands in `spectrum`.
