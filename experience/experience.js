let poem; //load poem
let font; //load font

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

function draw() {
  background(220);

  subtitleX = width / 4; //x of subtitle
  subtitleY = height - 100; //y of subtitle
  displaySyllable(
    currentParagraphIndex,
    currentWordIndex,
    currentSyllableIndex
  );

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
  if (keyCode === LEFT_ARROW) arrowL.setPressed(true);
  if (keyCode === UP_ARROW) arrowUP.setPressed(true);
  if (keyCode === RIGHT_ARROW) arrowR.setPressed(true);
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
