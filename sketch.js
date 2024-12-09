let font; //load font

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

function preload() {
  loadMusic();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  marginBotY = height - 118; //place for arrows
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3); //preload arrows
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
  background(250);
  fill(0);

  textSize(24);
  textFont(font);
  text("PRESS THE 3 ARROWS TO START", (width / 4) * 3 - 10, height / 2); //add subtitle to canvas

  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display(); //display arrows
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }

  menu.display();

  if (leftArrowPressed && upArrowPressed && rightArrowPressed) {
    startExperience = true;
    window.location.href = "../experience/experience.html"; // Navigate to the experience
  }
}

//add key input interaction
function keyPressed() {
  if (keyCode === LEFT_ARROW && arrowL.isPressed) {
    leftArrowPressed = true;
    arrowL.setPressed(false);
  }
  if (keyCode === UP_ARROW && arrowUP.isPressed) {
    upArrowPressed = true;
    arrowUP.setPressed(false);
  }
  if (keyCode === RIGHT_ARROW && arrowR.isPressed) {
    rightArrowPressed = true;
    arrowR.setPressed(false);
  }
}

//when the key is released start experience
function keyReleased() {
  if (credits == false && settings == false) {
    if (keyCode === LEFT_ARROW) {
      leftArrowPressed = false;
    }
    if (keyCode === UP_ARROW) {
      upArrowPressed = false;
    }
    if (keyCode === RIGHT_ARROW) {
      rightArrowPressed = false;
    }
  }
}

function mouseReleased() {
  menu.handleMouseClick(mouseX, mouseY);
}
