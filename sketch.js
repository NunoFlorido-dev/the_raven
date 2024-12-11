let mode = "homepage"; // Current context is the homepage

let font; //load font
let paused = false;

let menu; //load menu

//create arrows
let arrowL;
let arrowUP;
let arrowR;
let arrows = []; //create arrow array

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

//text variables
let subtitleX;
let subtitleY;
let subtitleSize;
let marginBotY;

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

//function to load font
function preloadFont() {
  font = loadFont("../assets/font/TheRaven-Regular.ttf");
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

function preload() {
  loadMusic();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  marginBotY = height - 152; //place for arrows
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3 - 30); //preload arrows
  preloadButtons();

  menu = new Menu(font);

  //text
  subtitleX = (width / 4) * 3 - 10; //x of subtitle
  subtitleY = height / 2; //y of subtitle
  subtitleSize = 25;

  textAlign(CENTER);
  menuColor = color(180);
  menuColor.setAlpha(240);
  textFont(font);
}

function draw() {
  background(255);
  fill(0);

  textSize(24);
  textFont(font);
  text("PRESS THE 3 ARROWS TO START", (width / 4) * 3 - 10, height / 2); //add subtitle to canvas

  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display(); //display arrows
  }

  buttondefs.display(); // Always show the settings button

  if (mode === "homepage") {
    buttoncredits.display(); // Show credits button only on the homepage
  }

  if (leftArrowPressed && upArrowPressed && rightArrowPressed) {
    startExperience = true;
    window.location.href = "../experience/experience.html"; // Navigate to the experience
  }
  if (paused) {
    menu.display();
  }

  menu.hover();
}

function keyPressed() {
  console.log(`Key pressed: ${key}`);
  if (!credits && !settings) {
    const changeKeys = menu.getChangeKeys();
    if (changeKeys) {
      // Using arrow keys
      if (keyCode === LEFT_ARROW) {
        arrowL.setPressed(true);
        leftArrowPressed = true;
      }
      if (keyCode === UP_ARROW) {
        arrowUP.setPressed(true);
        upArrowPressed = true;
      }
      if (keyCode === RIGHT_ARROW) {
        arrowR.setPressed(true);
        rightArrowPressed = true;
      }
    } else {
      // Using WAD keys
      if (key.toUpperCase() === "A") {
        arrowL.setPressed(true);
        leftArrowPressed = true;
      }
      if (key.toUpperCase() === "W") {
        arrowUP.setPressed(true);
        upArrowPressed = true;
      }
      if (key.toUpperCase() === "D") {
        arrowR.setPressed(true);
        rightArrowPressed = true;
      }
    }
  }
}

function keyReleased() {
  console.log(`Key released: ${key}`);
  if (!credits && !settings) {
    const changeKeys = menu.getChangeKeys();
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

function mouseReleased() {
  menu.handleMouseClick(mouseX, mouseY);
}
