let song;

function loadMusic() {
  song = loadSound("../assets/music/sound.mp3");
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
  fft = new p5.FFT();
}

let fft;
let treshold = 50;

function detectBeat(switcher) {
  let bass = fft.getEnergy("bass");
  if (bass > treshold) {
    switcher = true;
  } else {
    switcher = false;
  }
}
