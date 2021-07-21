# 📹 Frame Extraction Challenge (node.js)

## Challenge description:

- Design a JavaScript function `getYoutubeFrames()` that:
  - Takes a Youtube url as its input
  - Fetches the video
  - Extracts a frame from every scene/cut of the video (hint: use ffmpeg)
  - Converts every frame to jpg format with maximum 800px width
  - **Returns** a list of temp paths or base64 buffers

## Solution description:

`ytdl` package is used to download youtube video following the link. This is somewhat slow method, potential speedup can be achieved by download only video stream and/or video of lower quality.

`ffmpeg.wasm` is used to extract keyframes where the scene is changes more than 50% (following these [instructions](https://www.bogotobogo.com/FFMpeg/ffmpeg_thumbnails_select_scene_iframe.php#:~:text=Capturing%20scene%20change)). I think this is the only package that does not require ffmpegs binaries as a dependencies. This package can also be used on the client side.

Finaly `sharp` is used to resize images to max 800px in width.

## To run:

```bash
yarn install
node --experimental-wasm-threads --experimental-wasm-bulk-memory get_youtube_frames.js
```
