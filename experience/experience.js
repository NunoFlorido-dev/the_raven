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

let marginBotY;

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  marginBotY = height - 118; //place for arrows
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3); //preload arrows
  preloadPointers((width / 4) * 3); //preload pointers

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

  subtitleX = width / 4;
  subtitleY = height - 100;
  displaySubtitle("BAZA AAC");

  for (let i = pointers.length - 1; i >= 0; i--) {
    // Remove pointer if it dies
    if (pointers[i].die()) {
      pointers.splice(i, 1);
    } else {
      pointers[i].move();
      pointers[i].display();
      if (pointers[i].y >= marginBotY) {
        if (pointers.length >= 0) {
          pointers.splice(i, 1);
        }
      }
    }
  }

  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display();
  }
}

//add key input interaction
function keyPressed() {
  let center = (width / 4) * 3;
  let centerL = center - 100;
  let centerR = center + 100;

  if (keyCode === LEFT_ARROW) {
    arrowL.setPressed(false);

    for (let i = pointers.length - 1; i >= 0; i--) {
      // Check for interaction with each arrow
      for (let j = 0; j < arrows.length; j++) {
        if (pointers[i].x == centerL) {
          pointers[i].interact(arrows[j].x, arrows[j].y);
        }
      }
    }
  }
  if (keyCode === UP_ARROW) {
    arrowUP.setPressed(false);

    for (let i = pointers.length - 1; i >= 0; i--) {
      // Check for interaction with each arrow
      for (let j = 0; j < arrows.length; j++) {
        if (pointers[i].x == center) {
          pointers[i].interact(arrows[j].x, arrows[j].y);
        }
      }
    }
  }

  if (keyCode === RIGHT_ARROW) {
    arrowR.setPressed(false);

    for (let i = pointers.length - 1; i >= 0; i--) {
      // Check for interaction with each arrow
      for (let j = 0; j < arrows.length; j++) {
        if (pointers[i].x == centerR) {
          pointers[i].interact(arrows[j].x, arrows[j].y);
        }
      }
    }
  }
}

//same interaction
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    arrowL.setPressed(true);
  }
  if (keyCode === UP_ARROW) {
    arrowUP.setPressed(true);
  }
  if (keyCode === RIGHT_ARROW) {
    arrowR.setPressed(true);
  }
}