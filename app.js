const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9 // confidence threshold for predictions.
};

// For browser support
navigator.getUserMedia =
  navigator.getDisplayMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

// Select all imports in HTML
const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
// Set that Iam working with 2D context
const context = canvas.getContext("2d");
// Train AI based on model, get gigher accuracy for hand detections
let model;

// Starts a CAM and stream to html canvas
handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
        // Run detection every
        setInterval(runDetection, 1000);
      },
      err => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then(predictions => {
    console.log(predictions);
    //model.renderPredictions(predictions, canvas, context, video);
    if (predictions.length > 0) {
      audio.play();
    } else {
      audio.stop();
    }
  });
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});
