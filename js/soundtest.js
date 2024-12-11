let song = [];

let E = []; // Create an array to store the sound objects

function loadMusic() {
  for (let i = 0; i < 18; i++) {
    E[i] = loadSound(
      "../assets/music/E" + (i + 1) + ".mp3",
      () => console.log("Sound " + (i + 1) + " loaded successfully"),
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
    E[currentP].play();
    console.log("Playing track: E" + (currentP + 1));
  } else {
    console.warn("Sound not ready or invalid index: " + currentP);
  }
}
