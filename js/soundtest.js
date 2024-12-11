let song = [];

let E = []; // Create an array to store the sound objects
let il = [];

function loadMusic() {
  for (let i = 0; i < 18; i++) {
    il[i] = loadSound(
      "../assets/music/E" + (i + 1) + ".mp3",
      () => console.log("Sound " + (i + 1) + " loaded successfully"),
      (err) => console.error("Failed to load sound " + (i + 1), err)
    ); // Load each sound with success and error callbacks
  }
}

function loadIllustrations() {
  for (let i = 0; i < 18; i++) {
    il[i] = loadImage(
      "../assets/images/ilustracoes" + (i + 1) + ".png",
      () => console.log("Image " + (i + 1) + " loaded successfully"),
      (err) => console.error("Failed to load sound " + (i + 1), err)
    ); // Load each sound with success and error callbacks
  }
}

function playMusic(currentP) {
  if (E[currentP] && E[currentP].isLoaded()) {
    // Stop the previous track if any
    if (currentP > 0 && E[currentP - 1].isPlaying()) {
      E[currentP - 1].stop();
    }
    // Play the current track
    E[currentP].loop();
    console.log("Playing track: E" + (currentP + 1));
  } else {
    console.warn("Sound not ready or invalid index: " + currentP);
  }
}

function showIllustrations(currentP, x, y, w, h) {
  imageMode(CENTER);
  if (il[currentP]) {
    image(il[currentP], x, y, il[currentP].width, il[currentP].height);
  }
}

function stopMusic(currentP) {
  E[currentP].stop();
}

function resumeMusic(currentP) {
  E[currentP].play();
}
