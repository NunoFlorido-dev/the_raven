let mode = "experience"; // Current context is the experience

let poem; //load poem
let font; //load font

let paused = false;

let menu; //load menu

function loadPoem() {
  poem = loadStrings("../assets/poem_file/theraven_formatted.txt");
}

//function to load font
function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
}

//current syllables, words and paragraphs
let currentParagraphIndex = 0;
let currentWordIndex = 0;
let currentSyllableIndex = 0;

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

//buttons
let buttoncredits;
let buttondefs;
let audio;
let volumeUp;
let volumeDown;
let narration;
let keyBinds;
let visual;
let buttons = []; // create buttons array
let buttonsSettings = [];
let buttonsAudio = [];

//states and other things
let settings = false;
let credits = false;
let menuColor;
let menuSelected = 0;
let volume = 0;
narrationState = true;

let leftArrowPressed = false;
let upArrowPressed = false;
let rightArrowPressed = false;
let startExperience = false;

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
  //general settings buttons
  audio = new ButtonText((width / 6) * 1.6, height / 3 + 50, 35, "AUDIO", font);
  keyBinds = new ButtonText(
    (width / 6) * 1.6,
    height / 2,
    35,
    "KEY-BINDS",
    font
  );
  visual = new ButtonText(
    (width / 6) * 1.6,
    height / 2 + (height / 2 - height / 3) - 50,
    35,
    "VISUAL",
    font
  );
  //audio settings buttons
  volumeDown = new ButtonText(
    (width / 6) * 2.57,
    (height / 4) * 2.2,
    35,
    "-",
    font
  );
  volumeUp = new ButtonText(
    (width / 6) * 4.55,
    (height / 4) * 2.2,
    35,
    "+",
    font
  );
  keybindWAD = new ButtonText(
    (width / 6) * 1.6,
    height / 2 + (height / 2 - height / 3) - 50,
    35,
    "WAD",
    font
  );
  narration = new ButtonImg((width / 6) * 3.5, (height / 4) * 3, 40, 40, ""); //substituir imagem por imagem do botao do narration
  //keybinds settings buttons
  //...
  //visual settings buttons
  //...
  //arrays of buttons
  buttons = [buttondefs, buttoncredits];
  buttonsSettings = [audio, keyBinds, visual];
  buttonsAudio = [volumeDown, volumeUp, narration];
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

let poem_paragraphs = [];
let syllableArrays = [];

function preload() {
  loadPoem(); // This starts loading the poem
  preloadFont(); // This loads the font
  loadMusic(); // Load other assets if needed
}

function loadPoem() {
  poem = loadStrings("../assets/poem_file/theraven_formatted.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  marginBotY = height - 118; //place for arrows
  preloadArrows((width / 4) * 3);
  preloadPointers((width / 4) * 3);
  preloadButtons();

  menu = new Menu(font);

  // Process poem only when it is fully loaded
  if (poem) {
    let fullText = poem.join("\n"); // Join the lines into full text
    poem_paragraphs = fullText.split("\n\n"); // Split into paragraphs
    syllableArrays = getSyllablesFromParagraphs();
    print(syllableArrays);
  }

  subtitleSize = 48;
  textAlign(CENTER);
}

function displaySyllable(paragraphIndex, wordIndex, syllableIndex) {
  if (paragraphIndex < syllableArrays.length) {
    const paragraph = syllableArrays[paragraphIndex]; // Get syllables for the paragraph
    if (wordIndex < paragraph.length) {
      const word = paragraph[wordIndex]; // Get syllables for the word
      if (syllableIndex < word.length) {
        fill(0);
        textFont(font);
        textSize(subtitleSize);
        text(word[syllableIndex], subtitleX, subtitleY); // Display the syllable
      } else {
        console.log("No more syllables in this word.");
      }
    } else {
      console.log("No more words in this paragraph.");
    }
  } else {
    console.log("No more paragraphs.");
  }
}

function displayCurrentParagraph(paragraphIndex) {
  fill(0);
  textFont(font);
  textSize(subtitleSize - 12);
  text("E" + (paragraphIndex + 1), width - 40, 40);
}

function draw() {
  background(250);

  // Regular updates when not paused
  subtitleX = width / 4; // x of subtitle
  subtitleY = height - 100; // y of subtitle

  if (!paused) {
    displaySyllable(
      currentParagraphIndex,
      currentWordIndex,
      currentSyllableIndex
    );

    displayCurrentParagraph(currentParagraphIndex);

    // Handle pointer interactions
    for (let i = pointers.length - 1; i >= 0; i--) {
      if (pointers[i].die()) {
        pointers.splice(i, 1); // Remove pointer if it is pressed on
      } else {
        pointers[i].move(); // Move pointer
        pointers[i].display(); // Display pointer
        if (pointers[i].y >= height) {
          pointers.splice(i, 1); // Delete pointer if it exceeds the margin
        }
      }
    }

    // Display arrows
    fill(0);
    noStroke();
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].display();
    }
  } else {
    // Display pause menu and stop other interactions
    menu.display(); // Show menu options
  }

  buttondefs.display(); // Always show the settings button
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

  if (key === "e") {
    // Move forward in syllables, then words, then paragraphs
    currentSyllableIndex++;
    handleSyllableBounds(true);
  }

  if (key === "q") {
    // Move backward in syllables, then words, then paragraphs
    if (currentSyllableIndex > 0) {
      currentSyllableIndex--;
    } else if (currentWordIndex > 0) {
      // If syllable index is 0, go to previous word
      currentWordIndex--;
      currentSyllableIndex =
        syllableArrays[currentParagraphIndex][currentWordIndex].length - 1; // Set syllable index to last syllable of the previous word
    } else if (currentParagraphIndex > 0) {
      // If word index is 0, go to previous paragraph
      currentParagraphIndex--;
      const prevParagraph = syllableArrays[currentParagraphIndex];
      currentWordIndex = prevParagraph.length - 1; // Set to last word of the previous paragraph
      currentSyllableIndex =
        syllableArrays[currentParagraphIndex][currentWordIndex].length - 1; // Set to last syllable of the last word
    }

    handleSyllableBounds(false); // Ensure bounds are handled after moving
  }
}

//same interaction but when the key is released
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
