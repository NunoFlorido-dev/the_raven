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
let poem_paragraphs = [];

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

let fft; // FFT object for beat detection
let beatThreshold = 145; // Energy threshold for beat detection

let pointer = [];
let pointerSpeed = 5; // Default pointer speed

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
    "KEYBINDS",
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
  returnCredits = new ButtonText(
    width / 2 - 420,
    height / 2 - 260,
    64,
    "RETURN",
    this.font
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

//function to load arrows
function preloadArrows(center) {
  let arrowLImg = loadImage("../assets/icons/arrowL.png");
  let arrowUPImg = loadImage("../assets/icons/arrowUP.png");
  let arrowRImg = loadImage("../assets/icons/arrowR.png");

  let arrowLPress = loadImage("../assets/icons/arrowLpress.png");
  let arrowUPPress = loadImage("../assets/icons/arrowUPpress.png");
  let arrowRPress = loadImage("../assets/icons/arrowRpress.png");

  let arrowLOutline = loadImage("../assets/icons/arrowL-outline.png");
  let arrowUPOutline = loadImage("../assets/icons/arrowUP-outline.png");
  let arrowROutline = loadImage("../assets/icons/arrowR-outline.png");

  arrowL = new Arrow(
    center - 100,
    marginBotY,
    70,
    arrowLImg,
    arrowLPress,
    arrowLOutline
  );
  arrowUP = new Arrow(
    center,
    marginBotY,
    70,
    arrowUPImg,
    arrowUPPress,
    arrowUPOutline
  );
  arrowR = new Arrow(
    center + 100,
    marginBotY,
    70,
    arrowRImg,
    arrowRPress,
    arrowROutline
  );

  arrows = [arrowL, arrowUP, arrowR];
}

//create array with pointers
let pointers = [];

//test function to preload pointers
/*function preloadPointers(center) {
  let posX = [];
  posX[0] = center - 100;
  posX[1] = center;
  posX[2] = center + 100;

  for (let i = 0; i < 10; i++) {
    let type = int(random(0, 3));
    let randomPos = posX[type];
    let img;

    let x = randomPos;
    let y = int(random(-500, 300));

    if (type == 0) {
      img = loadImage("../assets/icons/arrowL.png");
    } else if (type == 1) {
      img = loadImage("../assets/icons/arrowUP.png");
    } else if (type == 2) {
      img = loadImage("../assets/icons/arrowR.png");
    }

    pointers.push(new Pointer(x, y, 70, img));
  }
}
*/

function preloadPointers(center) {
  let posX = [center - 100, center, center + 100];
  let type = int(random(0, 3)); // Random arrow type
  let x = posX[type];
  let img;

  // Choose the arrow image
  if (type == 0) img = loadImage("../assets/icons/arrowL.png");
  if (type == 1) img = loadImage("../assets/icons/arrowUP.png");
  if (type == 2) img = loadImage("../assets/icons/arrowR.png");

  let pointer = new Pointer(x, -70, 70, img); // Pointer starts above the screen
  pointers.push(pointer);
}

let syllableArrays = [];

function preload() {
  loadPoem(); // This starts loading the poem
  preloadFont(); // This loads the font
  loadMusic(); // Load other assets if needed
}

function loadPoem() {
  poem = loadStrings("../assets/poem_file/theRaven_words.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  marginBotY = height - 152; //place for arrows
  preloadArrows((width / 4) * 3 - 30);
  preloadPointers((width / 4) * 3 - 30);
  preloadButtons();
  fft = new p5.FFT();

  menu = new Menu(font);

  // Process poem only when it is fully loaded
  if (poem) {
    let fullText = poem.join("\n"); // Join lines into full text
    let paragraphs = fullText.split("\n\n"); // Split by double newline to get paragraphs

    // For each paragraph, remove \n, split into words, and remove empty strings
    poem_paragraphs = paragraphs.map((paragraph) =>
      paragraph
        .replace(/\n/g, "")
        .split("+")
        .filter((word) => word.trim() !== "")
    );

    console.log(poem_paragraphs); // Verify structure
  }

  subtitleSize = 48;
  textAlign(CENTER, BASELINE); // Ensure baseline alignment

  playMusic(currentParagraphIndex);
}

let lastBeatTime = 0; // Time of the last detected beat
let beatCooldown = 0.3; // Minimum time (in seconds) between beats

function detectBeat() {
  let spectrum = fft.analyze();
  let energy = fft.getEnergy("bass"); // Get energy in the low-mid range for beat detection

  if (energy > beatThreshold) {
    return true; // Beat detected
  }
  return false;
}

const MAX_POINTERS = 10; // Maximum number of pointers

function spawnPointer() {
  let pointerCount = 3; // Spawn 3 pointers on each beat
  for (let i = 0; i < pointerCount; i++) {
    preloadPointers((width / 4) * 3 - 30); // Use preloadPointers to spawn dynamically
  }
}

function updatePointerSpeeds() {
  // Adjust pointer speed so they reach marginBotY at the beat timing
  let distance = marginBotY - -70; // Total distance the pointer travels
  let beatInterval = 0.5; // Time in seconds between beats, adjust for your song's tempo

  pointerSpeed = distance / (beatInterval * frameRate());
}

function displayCurrentParagraph(paragraphIndex) {
  fill(0);
  textFont(font);
  textSize(subtitleSize - 12);
  text("E" + (paragraphIndex + 1), width - 50, 47.5);
}

function displayWord(paragraphIndex, wordIndex) {
  if (paragraphIndex < poem_paragraphs.length) {
    let paragraph = poem_paragraphs[paragraphIndex];
    if (wordIndex < paragraph.length) {
      let word = paragraph[wordIndex];
      fill(0);
      textFont(font);
      textSize(subtitleSize);

      // Reset the subtitle position for consistent vertical alignment
      subtitleY = height - 100; // Adjust this value if necessary

      text(word, subtitleX, subtitleY); // Display the word
    } else {
      console.log("No more words in this paragraph.");
    }
  } else {
    console.log("No more paragraphs.");
  }
}
function draw() {
  background(250);

  // Regular updates when not paused
  subtitleX = width / 4; // x of subtitle
  subtitleY = height - 100; // y of subtitle

  displayCurrentParagraph(currentParagraphIndex);
  displayWord(currentParagraphIndex, currentWordIndex);

  if (!paused) {
    // Handle pointer interactions
    for (let i = pointers.length - 1; i >= 0; i--) {
      if (pointers[i].die()) {
        pointers.splice(i, 1); // Remove pointer if it is pressed on
      } else {
        pointers[i].move(); // Move pointer
        pointers[i].display(); // Display pointer
        if (pointers[i].die() || pointers[i].y >= height + this.size) {
          pointers.splice(i, 1); // Delete pointer if it exceeds the margin
        }
      }
    }

    // Display arrows
    fill(0);
    noStroke();
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].display();
      arrows[i].fadeOutline(); // Gradually fade the outline
    }
  } else {
    // Display pause menu and stop other interactions
    menu.display(); // Show menu options
  }

  menu.hover();

  buttondefs.display(); // Always show the settings button

  // Check for beats and spawn pointers
  if (detectBeat()) {
    spawnPointer();
    updatePointerSpeeds(); // Adjust speed dynamically
  }

  // Update and display pointers
  for (let i = pointer.length - 1; i >= 0; i--) {
    let pointer = pointer[i];
    pointer.y += pointerSpeed; // Move down dynamically

    pointer.display();

    // Remove pointer if it goes off-screen
    if (pointer.y > height + pointer.size) {
      pointer.splice(i, 1);
    }
  }

  // Display arrows
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display();
  }
}

function handleInteraction(centerX, arrow) {
  let intersectionOccurred = false;

  for (let i = pointers.length - 1; i >= 0; i--) {
    if (pointers[i].intersect(arrow.x, arrow.y)) {
      intersectionOccurred = true;
      pointers[i].interact(arrow.x, arrow.y); // Process the interaction with the pointer
    }
  }

  // Trigger the fade-out effect
  if (intersectionOccurred) {
    arrow.setPressed(true); // Reset and show the outline
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
        arrowL.setPressed(true);
        leftArrowPressed = true;
      }
      if (keyCode === UP_ARROW) {
        handleInteraction(center, arrowUP);
        arrowUP.setPressed(true);
        upArrowPressed = true;
      }
      if (keyCode === RIGHT_ARROW) {
        handleInteraction(centerR, arrowR);
        arrowR.setPressed(true);
        rightArrowPressed = true;
      }
    } else {
      // Using WAD keys
      if (key.toUpperCase() === "A") {
        handleInteraction(centerL, arrowL);
        arrowL.setPressed(true);
        leftArrowPressed = true;
      }
      if (key.toUpperCase() === "W") {
        handleInteraction(center, arrowUP);
        arrowUP.setPressed(true);
        upArrowPressed = true;
      }
      if (key.toUpperCase() === "D") {
        handleInteraction(centerR, arrowR);
        arrowR.setPressed(true);
        rightArrowPressed = true;
      }
    }
  }

  if (key === "e") {
    // Move forward in words, then paragraphs
    currentWordIndex++;
    handleBounds(true);
  }

  if (key === "q") {
    // Move backward in words, then paragraphs
    currentWordIndex--;
    handleBounds(false);
  }
}

//same interaction but when the key is released
function keyReleased() {
  if (!credits && !settings) {
    let changeKeys = menu.getChangeKeys();
    if (changeKeys) {
      if (keyCode === LEFT_ARROW) arrowL.setPressed(false);
      if (keyCode === UP_ARROW) arrowUP.setPressed(false);
      if (keyCode === RIGHT_ARROW) arrowR.setPressed(false);
    } else {
      if (key.toUpperCase() === "A") arrowL.setPressed(false);
      if (key.toUpperCase() === "W") arrowUP.setPressed(false);
      if (key.toUpperCase() === "D") arrowR.setPressed(false);
    }
  }
}

function handleBounds(forward) {
  if (forward) {
    if (currentWordIndex >= poem_paragraphs[currentParagraphIndex].length) {
      currentWordIndex = 0;
      currentParagraphIndex++;
      if (currentParagraphIndex >= poem_paragraphs.length) {
        currentParagraphIndex = poem_paragraphs.length - 1; // Limit to last paragraph
        console.log("Reached the end of the poem.");
      } else {
        playMusic(currentParagraphIndex); // Play music for the new paragraph
        displayCurrentTrack(currentParagraphIndex); // Display track info
      }
    }
  } else {
    if (currentWordIndex < 0) {
      currentParagraphIndex--;
      if (currentParagraphIndex < 0) {
        currentParagraphIndex = 0; // Limit to first paragraph
        console.log("Reached the beginning of the poem.");
      } else {
        currentWordIndex = poem_paragraphs[currentParagraphIndex].length - 1; // Go to the last word of the previous paragraph
        playMusic(currentParagraphIndex); // Play music for the previous paragraph
        displayCurrentTrack(currentParagraphIndex); // Display track info
      }
    }
  }
}

function mouseReleased() {
  menu.handleMouseClick(mouseX, mouseY);
}
