let font; //load font

//text variables
let subtitleX;
let subtitleY;
let subtitleSize;

function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
} //function to load font

function setup() {
  createCanvas(windowWidth, windowHeight);
  preloadFont();

  //text
  subtitleSize = 48;
  textAlign(CENTER);
}

function displaySubtitle(subtitle) {
  textFont(font);
  textSize(subtitleSize);
  text(subtitle, subtitleX, subtitleY);
}

function draw() {
  //subtitle coordinates
  subtitleX = width / 4;
  subtitleY = height - 100;

  background(220);
  textFont(font);
  textSize(48);
  displaySubtitle("BAZA AAC");
}
