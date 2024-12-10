let mode = "experience"; // Current context is the experience

let font; //load font
let menu;
let paused = false;

//create arrows
let arrowL;
let arrowUP;
let arrowR;
let arrows = []; //create arrow array

//text variables
let subtitleX;
let subtitleY;
let subtitleSize;

let marginBotY;

let settingsIcon;
let creditsIcon;

let buttondefs;
let buttoncredits;

function preloadButtons() {
  buttondefs = new ButtonImg(
    (width / 10) * 0.2,
    20,
    40,
    40,
    "../assets/icons/settings.png"
  );
  buttoncredits = new ButtonImg(
    (width / 10) * 9.72 - 20,
    20,
    40,
    40,
    "../assets/icons/credits.png"
  );
}

//function to load font
function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
}

//function to load arrows
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

//create array with pointers
let pointers = [];

//test function to preload pointers
function preloadPointers(center) {
  let posX = [];
  posX[0] = center - 100;
  posX[1] = center;
  posX[2] = center + 100;

  for (let i = 0; i < 10; i++) {
    let type = int(random(0, 3));
    let randomPos = posX[type];
    let colorP;

    let x = randomPos;
    let y = int(random(-500, 300));

    if (type == 0) {
      colorP = color(255, 0, 0);
    } else if (type == 1) {
      colorP = color(0, 255, 0);
    } else if (type == 2) {
      colorP = color(0, 0, 255);
    }

    pointers.push(new Pointer(x, y, 48, colorP));
  }
}

function preload() {
  loadMusic();
  settingsIcon = loadImage("../assets/icons/settings.png");
  creditsIcon = loadImage("../assets/icons/credits.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  marginBotY = height - 118; //place for arrows
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3); //preload arrows
  preloadPointers((width / 4) * 3); //preload pointers
  preloadButtons();

  menu = new Menu(font, settingsIcon, creditsIcon);

  //text
  subtitleSize = 48;
  textAlign(CENTER);

  menuColor = color(180);
  menuColor.setAlpha(240);
}

//function to display subtitles (receives string as input)
function displaySubtitle(subtitle) {
  fill(0);
  textFont(font);
  textSize(subtitleSize);
  text(subtitle, subtitleX, subtitleY);
}

function draw() {
  background(250);

  subtitleX = width / 4; //x of subtitle
  subtitleY = height - 100; //y of subtitle

  if (!paused) {
    displaySubtitle("BAZA AAC"); //add subtitle to canvas

    buttondefs.display(); // Always show the settings button

    if (mode === "homepage") {
      buttoncredits.display(); // Show credits button only on the homepage
    }

    for (let i = pointers.length - 1; i >= 0; i--) {
      if (pointers[i].die()) {
        pointers.splice(i, 1); // Remove pointer if it is pressed on
      } else {
        pointers[i].move(); //move pointer
        pointers[i].display(); //display pointer
        if (pointers[i].y >= height) {
          if (pointers.length >= 0) {
            pointers.splice(i, 1); //if the pointer exceeds the margin and isn't pressed, delete it
          }
        }
      }
    }

    for (let i = 0; i < arrows.length; i++) {
      arrows[i].display(); //display arrows
    }
  } else {
    menu.display();
  }
}

//function to handle interaction
function handleInteraction(centerX, arrow) {
  for (let i = pointers.length - 1; i >= 0; i--) {
    if (pointers[i].x === centerX && pointers[i].intersect(arrow.x, arrow.y)) {
      pointers[i].interact(arrow.x, arrow.y);
    }
  }
}

//add key input interaction
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

  if (key === " ") {
    playMusic();
  }
}

//same interaction but when the key is released
function keyReleased() {
  if (keyCode === LEFT_ARROW) arrowL.setPressed(true);
  if (keyCode === UP_ARROW) arrowUP.setPressed(true);
  if (keyCode === RIGHT_ARROW) arrowR.setPressed(true);
}

function mouseReleased() {
  menu.handleMouseClick(mouseX, mouseY);
}
