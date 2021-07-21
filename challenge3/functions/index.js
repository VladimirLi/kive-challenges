const functions = require("firebase-functions");
const save = require("instagram-save");

exports.downloadInstagramImage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const { Storage } = require("@google-cloud/storage");
    const storage = new Storage();
    const bucket = storage.bucket("kive-challenge3-bf6ff.appspot.com");

    let originalUrl = req.query.url;
    if (originalUrl.slice(-1) === "/") {
      originalUrl = originalUrl.slice(0, -1);
    }

    const id = originalUrl.split("/").pop();

    let mediaLink = null;
    try {
      await save(id, ".").then(async (res) => {
        await bucket.upload(res.file).then((data) => {
          mediaLink = data[0].metadata.mediaLink;
        });
      });
    } catch (err) {
      res.status(500).end();
    }
    res.json({ result: mediaLink });
  }
});
