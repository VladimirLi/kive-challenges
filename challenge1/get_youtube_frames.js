const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const sharp = require("sharp");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

const ffmpeg = createFFmpeg({ log: true });

const zeroPad = (num, places) => String(num).padStart(places, "0");

const extractKeyFrames = async (inputFilePath, keyFrameName, tmpPath) => {
  let imageList = [];
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "tmp.mp4", await fetchFile(inputFilePath));

  // Extracting keyFrames
  await ffmpeg.run(
    "-i",
    "tmp.mp4",
    "-vf",
    "select='gt(scene,0.5)'",
    "-vsync",
    "vfr",
    `${keyFrameName}%03d.jpg`
  );

  // This is super hacky way to store images to FS,
  // I couldnt find a way to get a list of keyFrames in ffmpeg FS
  let i = 1;
  while (true) {
    const fName = `${keyFrameName}${zeroPad(i, 3)}.jpg`;
    const filePath = path.join(tmpPath, fName);
    try {
      await fs.promises.writeFile(filePath, ffmpeg.FS("readFile", fName));
      imageList.push(filePath);
      i += 1;
    } catch (error) {
      break;
    }
  }

  return imageList;
};

const getYoutubeFrames = async (ytubeUrl) => {
  const tmpDir = path.join(__dirname, "tmp");
  const tmpFilePath = path.join(tmpDir, "video.mp4");

  fs.rmdirSync(tmpDir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.mkdirSync(tmpDir, (err) => {
    if (err) {
      console.error(err);
    }
  });

  const stream = ytdl(ytubeUrl);

  return new Promise((resolve) => {
    stream
      .pipe(fs.createWriteStream(tmpFilePath))
      .on("finish", async function () {
        let imageList = await extractKeyFrames(tmpFilePath, "frame", tmpDir);

        // Resizing frames to max 800px width
        let imgBufferArray = await Promise.all(
          imageList.map(async (image) => {
            let imgBuffer = await sharp(image)
              .resize({
                width: 800,
                fit: sharp.fit.inside,
                withoutEnlargement: true,
              })
              .toFormat("jpeg")
              .toBuffer();
            return imgBuffer;
          })
        );
        resolve(imgBufferArray);
      });
  });
};

getYoutubeFrames("https://www.youtube.com/watch?v=aqz-KE-bpKQ").then((res) =>
  console.log(res)
);
