let song;

function preload() {
  song = loadSound("../assets/music/sound.mp3");
}

function loadMusic() {
  // This function is no longer needed for loading the song.
}

function playMusic() {
  if (song && song.isPlaying()) {
    song.stop();
  } else if (song) {
    song.play();
  }
}

let fft;
let treshold = 50;

function detectBeat(switcher) {
  playMusic();
  fft = new p5.FFT();
  let bass = fft.getEnergy("bass");
  if(bass > treshold) {
    switcher = true;
  }
  else {
    switcher = false;
  }
}