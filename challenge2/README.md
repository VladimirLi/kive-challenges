# 🤞 Emoji Interpretation Challenge (React)

## Challenge description:

1. Design a JavaScript function `guessEmoji()` that:
   - Takes a string as its input (ex: "crying sad face", ":)", "going for a run")
   - Returns an array of emojis/emoji codes
   - The emojis should be reasonably good matches to input, and sorted by relevancy
2. Create a functional React component `EmojiPanel` that
   - Has an input field that runs `guessEmoji()` when input changes
   - Displays resulting emojis rendered in a grid
   - Has a container with overall nice appearance, dark mode, width ≈ 400px, height ≈ 200px.

## Solution description:

An interesting [demo on emoji search using Deep Learning](https://deepmoji.mit.edu/), and also an [implementation in Pytorch](https://github.com/huggingface/torchMoji). NOTE, this is not used in the solution, as it would requre to be run on a server.

In this solution I am using `fuse` for fuzzy search of emojies. The list of emojies is fetched from [emojilib](https://unpkg.com/browse/emojilib@3.0.4/dist/emoji-en-US.json).

## To run:

```bash
yarn install
yarn start
```
