import "./App.css";
import React, { useState } from "react";

const IMG_DONWLOADER_URL =
  "http://127.0.0.1:5001/kive-challenge3-bf6ff/us-central1/downloadInstagramImage"; // Hardcoded link const to lazy to fix

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleClick = () => {
    if (url.length > 0) {
      // console.log("btn clicked");
      // console.log(url);
      setLoading(true);
      setMediaUrl("");
      fetch(`${IMG_DONWLOADER_URL}?url=${url}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMediaUrl(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <div>
        <React.Fragment>
          <input
            className="input"
            type="text"
            name="emojiSearch"
            placeholder="URL to instagram image..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="btn"
            type="submit"
            value="ClickMe"
            onClick={handleClick}
            disabled={url.length === 0}
          />
          <div className="display-container">
            {loading && <div className="loader"></div>}
            {mediaUrl && (
              <img className="img" src={mediaUrl} alt="img from instagram" />
            )}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
