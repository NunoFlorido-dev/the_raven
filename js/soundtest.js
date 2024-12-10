let song;

function loadMusic() {
  song = loadSound("../assets/music/sound.mp3");
}

function playMusic() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
