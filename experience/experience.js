let font; //load font

// Arrows
let arrowL, arrowUP, arrowR;
let arrows = [];

// Text variables
let subtitleX, subtitleY, subtitleSize;
let marginBotY;

//function to load font
function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
}

function preloadPointers(center, y) {
  let posX = [center - 100, center, center + 100];

  for (let i = 0; i < 1; i++) {
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
  textSize(subtitleSize - 12);
  text("E" + (paragraphIndex + 1), width - 50, 47.5);
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

  setupMusic();
}

function draw() {
  background(250);

  subtitleX = width / 4; //x of subtitle
  subtitleY = height - 100; //y of subtitle
  displaySubtitle("BAZA AAC"); //add subtitle to canvas

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

  if (!credits && !settings) {
    const changeKeys = menu.getChangeKeys();
    if (changeKeys) {
      // Using arrow keys
      if (keyCode === LEFT_ARROW) {
        handleInteraction(centerL, arrowL);
        arrowL.setPressed(false);
        leftArrowPressed = true;
      }
      if (keyCode === UP_ARROW) {
        handleInteraction(center, arrowUP);
        arrowUP.setPressed(false);
        upArrowPressed = true;
      }
      if (keyCode === RIGHT_ARROW) {
        handleInteraction(centerR, arrowR);
        arrowR.setPressed(false);
        rightArrowPressed = true;
      }
    } else {
      // Using WAD keys
      if (key.toUpperCase() === "A") {
        handleInteraction(centerL, arrowL);
        arrowL.setPressed(false);
        leftArrowPressed = true;
      }
      if (key.toUpperCase() === "W") {
        handleInteraction(center, arrowUP);
        arrowUP.setPressed(false);
        upArrowPressed = true;
      }
      if (key.toUpperCase() === "D") {
        handleInteraction(centerR, arrowR);
        arrowR.setPressed(false);
        rightArrowPressed = true;
      }
    }
  }

  if (key === " ") {
    playMusic();
  }
}

function keyReleased() {
  if (!credits && !settings) {
    const changeKeys = menu.getChangeKeys();
    if (changeKeys) {
      if (keyCode === LEFT_ARROW) arrowL.setPressed(true);
      if (keyCode === UP_ARROW) arrowUP.setPressed(true);
      if (keyCode === RIGHT_ARROW) arrowR.setPressed(true);
    } else {
      if (key.toUpperCase() === "A") arrowL.setPressed(true);
      if (key.toUpperCase() === "W") arrowUP.setPressed(true);
      if (key.toUpperCase() === "D") arrowR.setPressed(true);
    }
  }
}

//handle syllable bounds
function handleSyllableBounds(forward) {
  const paragraph = syllableArrays[currentParagraphIndex];
  const word = paragraph[currentWordIndex];

  if (forward) {
    if (currentSyllableIndex >= word.length) {
      currentSyllableIndex = 0;
      currentWordIndex++;

      if (currentWordIndex >= paragraph.length) {
        currentWordIndex = 0;
        currentParagraphIndex++;

        if (currentParagraphIndex >= syllableArrays.length) {
          currentParagraphIndex = syllableArrays.length - 1; // Limit to last paragraph
          console.log("Reached the end of the poem.");
        }
      }
    }
  } else {
    if (currentSyllableIndex < 0) {
      currentWordIndex--;

      if (currentWordIndex < 0) {
        currentParagraphIndex--;

        if (currentParagraphIndex < 0) {
          currentParagraphIndex = 0; // Limit to first paragraph
          console.log("Reached the beginning of the poem.");
        } else {
          const prevParagraph = syllableArrays[currentParagraphIndex];
          currentWordIndex = prevParagraph.length - 1;
        }
      }

      const prevWord = paragraph[currentWordIndex];
      currentSyllableIndex = prevWord.length - 1;
    }
  }
}

function mouseReleased() {
  menu.handleMouseClick(mouseX, mouseY);
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
