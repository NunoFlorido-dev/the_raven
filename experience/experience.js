let font;

// Arrows
let arrowL, arrowUP, arrowR;
let arrows = [];

// Text variables
let subtitleX, subtitleY, subtitleSize;
let marginBotY;

// Pointers
let pointers = [];

// Beat detection
let switcher = false; // Trigger for beat detection (updated by detectBeat)

function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
}

function preloadPointers(center, y) {
  let posX = [center - 100, center, center + 100];

  for (let i = 0; i < 10; i++) {
    let type = int(random(0, 3));
    let randomPos = posX[type];
    let colorP;

    if (type === 0) {
      colorP = color(255, 0, 0);
    } else if (type === 1) {
      colorP = color(0, 255, 0);
    } else if (type === 2) {
      colorP = color(0, 0, 255);
    }

    pointers.push(new Pointer(randomPos, y, 48, colorP));
  }
}

function preloadArrows(center) {
  arrowL = new Arrow(
    center - 100,
    marginBotY,
    48,
    color(255, 0, 0),
    color(200, 0, 0)
  );
  arrowUP = new Arrow(
    center,
    marginBotY,
    48,
    color(0, 255, 0),
    color(0, 200, 0)
  );
  arrowR = new Arrow(
    center + 100,
    marginBotY,
    48,
    color(0, 0, 255),
    color(0, 0, 200)
  );
  arrows = [arrowL, arrowUP, arrowR];
}

function preload() {
  preloadFont();
  loadMusic(); // Load the music from soundtest.js
}

function displaySubtitle(subtitle) {
  fill(0);
  textFont(font);
  textSize(subtitleSize);
  text(subtitle, subtitleX, subtitleY);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  marginBotY = height - 118; // Space for arrows
  let center = (width / 4) * 3;

  preloadArrows(center);

  // Text properties
  subtitleSize = 48;
  textAlign(CENTER);

  let y = int(random(-500, 300)); // Initialize y here
  preloadPointers(center, y); // Use the initialized y value
}

function draw() {
  background(220);

  // Display subtitle
  subtitleX = width / 4;
  subtitleY = height - 100;
  displaySubtitle("BAZA AAC");

  // Handle pointers
  for (let i = pointers.length - 1; i >= 0; i--) {
    if (pointers[i].die() || pointers[i].y >= height) {
      pointers.splice(i, 1); // Remove dead or out-of-bounds pointers
    } else {
      pointers[i].move();
      pointers[i].display();
    }
  }

  // Display arrows
  for (let arrow of arrows) {
    arrow.display();
  }

  // Detect beat and spawn pointers
  detectBeat(switcher);
  if (switcher) {
    spawnPointer();
  }
}

function handleInteraction(centerX, arrow) {
  for (let i = pointers.length - 1; i >= 0; i--) {
    if (pointers[i].x === centerX && pointers[i].intersect(arrow.x, arrow.y)) {
      pointers[i].interact(arrow.x, arrow.y);
    }
  }
}

// Add key input interaction
function keyPressed() {
  let center = (width / 4) * 3;
  let centerL = center - 100;
  let centerR = center + 100;

  if (keyCode === LEFT_ARROW && arrowL.isPressed) {
    arrowL.setPressed(false);
    handleInteraction(centerL, arrowL);
  }
  if (keyCode === UP_ARROW && arrowUP.isPressed) {
    arrowUP.setPressed(false);
    handleInteraction(center, arrowUP);
  }
  if (keyCode === RIGHT_ARROW && arrowR.isPressed) {
    arrowR.setPressed(false);
    handleInteraction(centerR, arrowR);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) arrowL.setPressed(true);
  if (keyCode === UP_ARROW) arrowUP.setPressed(true);
  if (keyCode === RIGHT_ARROW) arrowR.setPressed(true);
}

// Spawn a pointer at a random position based on beat
function spawnPointer() {
  let center = (width / 4) * 3;
  let posX = [center - 100, center, center + 100];

  let type = int(random(0, 3));
  let x = posX[type];
  let colorP;

  if (type === 0) colorP = color(255, 0, 0);
  else if (type === 1) colorP = color(0, 255, 0);
  else if (type === 2) colorP = color(0, 0, 255);

  pointers.push(new Pointer(x, -48, 48, colorP));
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume(); // Resume the AudioContext
  }
  playMusic(); // Start playing music on user gesture
}
