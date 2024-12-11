let song;

function loadMusic() {
  song = loadSound("../assets/music/sound.mp3");
  fft = new p5.FFT(); // Initialize after loadSound has been called
}

function playMusic() {
  if (song && song.isPlaying()) {
    song.stop();
  } else if (song) {
    song.play();
  }
}

function setupMusic() {
  playMusic();
}

let fft;
let threshold = 50;
let lastBeatTime = 0; // To track the last beat time
let beatCooldown = 300; // Cooldown in milliseconds

function detectBeat() {
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  if (bass > threshold && millis() - lastBeatTime > beatCooldown) {
    switcher = true;
    lastBeatTime = millis(); // Update last beat time
  } else {
    switcher = false;
  }
}
