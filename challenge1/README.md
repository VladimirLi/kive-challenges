# Frame Extraction Challenge

`ytdl` package is used to download youtube video following the link. This is somewhat slow method, potential speedup can be achieved by download only video stream and/or video of lower quality.

`ffmpeg.wasm` is used to extract keyframes where the scene is changes more than 50% (following these [instructions](https://www.bogotobogo.com/FFMpeg/ffmpeg_thumbnails_select_scene_iframe.php#:~:text=Capturing%20scene%20change)). I think this is the only package that does not require ffmpegs binaries as a dependencies. This package can also be used on the client side.

Finaly `sharp` is used to resize images to max 800px in width.

## To run:

```bash
yarn install
node --experimental-wasm-threads --experimental-wasm-bulk-memory get_youtube_frames.js
```
