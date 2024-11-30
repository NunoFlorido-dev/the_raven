let font; //load font

//create arrows
let arrowL;
let arrowUP;
let arrowR;
let arrows = []; //create arrow array

//text variables
let subtitleX;
let subtitleY;
let subtitleSize;

//function to load font
function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
}

//function to load arrows
function preloadArrows(center) {
  arrowL = new Arrow(
    center - 100,
    height - 118,
    48,
    color(255, 0, 0),
    color(200, 0, 0)
  );
  arrowUP = new Arrow(
    center,
    height - 118,
    48,
    color(0, 255, 0),
    color(0, 200, 0)
  );
  arrowR = new Arrow(
    center + 100,
    height - 118,
    48,
    color(0, 0, 255),
    color(0, 0, 200)
  );

  arrows = [arrowL, arrowUP, arrowR];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3); //preload arrows

  //text
  subtitleSize = 48;
  textAlign(CENTER);
}

//function to display subtitles (receives string as input)
function displaySubtitle(subtitle) {
  fill(0);
  textFont(font);
  textSize(subtitleSize);
  text(subtitle, subtitleX, subtitleY);
}

function draw() {
  background(220);

  //subtitle coordinates
  subtitleX = width / 4;
  subtitleY = height - 100;

  displaySubtitle("BAZA AAC"); //display the subtitles

  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display();
  }
}

//add key input interaction
function keyPressed() {
  if (key === "A" || key === "a") {
    arrowL.setPressed(false);
  }
  if (key === "W" || key === "w") {
    arrowUP.setPressed(false);
  }
  if (key === "D" || key === "d") {
    arrowR.setPressed(false);
  }
}

//same interaction
function keyReleased() {
  if (key === "A" || key === "a") {
    arrowL.setPressed(true);
  }
  if (key === "W" || key === "w") {
    arrowUP.setPressed(true);
  }
  if (key === "D" || key === "d") {
    arrowR.setPressed(true);
  }
}
