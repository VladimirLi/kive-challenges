import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
let fuse = null;

const guessEmoji = (emojiDescription) => {
  // IMHO This is useless function should be included in EmojiPanel
  return fuse.search(emojiDescription, { limit: 200 });
};

const EmojiPanel = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // Getting data
    let emojiLib = null;
    (async () => {
      emojiLib = await fetch(
        "https://unpkg.com/emojilib@3.0.4/dist/emoji-en-US.json"
      ).then((res) => res.json());

      let parsedEmojiLib = [];
      for (const [key, value] of Object.entries(emojiLib)) {
        parsedEmojiLib.push({
          emoji: key,
          query: value.map((query) => {
            return { value: query };
          }),
        });
      }
      const options = {
        includeScore: true,
        keys: ["query.value"],
      };

      fuse = new Fuse(parsedEmojiLib, options);
    })();
  });

  console.log(result);
  return (
    <React.Fragment>
      <input
        className="input"
        type="text"
        name="emojiSearch"
        placeholder="Input an emoji..."
        onChange={(e) => {
          console.log(e.target.value);
          setResult(guessEmoji(e.target.value));
        }}
      />
      <div className="display-container">
        {result.map((el) => {
          return ` ${el.item.emoji} `;
        })}
      </div>
    </React.Fragment>
  );
};

export default EmojiPanel;
