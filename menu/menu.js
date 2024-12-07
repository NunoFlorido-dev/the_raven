let font; //load font

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
let narration
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
let settings=false;
let credits=false;
let menuColor;
let menuSelected = 0;
let volume = 0;
narrationState = true;

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
  buttondefs = new ButtonImg((width/10)*0.2, 20, 40, 40, "../assets/icons/settings.png");
  buttoncredits = new ButtonImg((width/10)*9.72 - 20, 20, 40, 40, "../assets/icons/credits.png");
  //general settings buttons
  audio = new ButtonText(width/6*1.2, height/3+50, 35, "AUDIO", font);
  keyBinds = new ButtonText(width/6*1.2, height/2, 35, "KEY-BINDS", font);
  visual = new ButtonText(width/6*1.2, height/2+(height/2 - height/3) - 50, 35, "VISUAL", font);
  //audio settings buttons
  volumeDown = new ButtonText(width/6*2.57, height/4*2.2, 35, "-", font);
  volumeUp = new ButtonText((width/6)*4.55, height/4*2.2, 35, "+", font);
  narration = new ButtonImg(width/6*3.5, height/4*3, 40, 40, "../assets/icons/settings.png"); //substituir imagem por imagem do botao do narration
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
  createCanvas(windowWidth-30, windowHeight);
  marginBotY = height - 118; //place for arrows
  preloadFont(); //preload font
  preloadArrows((width / 4) * 3); //preload arrows
  preloadButtons();
  //preloadPointers((width / 4) * 3); //preload pointers
  menuimage = loadImage("../assets/images/macaquinho.jpg");
  //text
  subtitleX = (width / 4)*3 -10; //x of subtitle
  subtitleY = (height / 2); //y of subtitle
  subtitleSize = 25;
  textAlign(CENTER);
  c = color(110, 110, 110);
  c.setAlpha(240);
  textFont(font);
  textSize(25);
}

function draw() {
  background(220);
  fill(0);
  text("PRESS ANY ARROW TO START", (width / 4)*3 -10, (height / 2)); //add subtitle to canvas
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].display(); //display arrows
  }
  for (let i = 0; i< buttons.length; i++) {
    buttons[i].display();
  }
  image(menuimage, width/4, height/16, width/4, height-100);
  if (settings){
    fill(c);
    rect(width/8, height/8, (width/8)*6, (height/8)*6); //substituir por imagem de background das settings
    for (let i = 0; i < buttonsSettings.length; i++){
      buttonsSettings[i].display();
    }
    switch (menuSelected){
      case 0:
        for (let i = 0; i < buttonsAudio.length; i++){
          buttonsAudio[i].display();
        }
        fill(255);
        textSize(120);
        text("AUDIO", width/6*3.55, height/4*1.2);
        fill(0);
        textSize(50);
        text("VOLUME", width/6*3.55, height/2*0.95);
        rect(width/3*1.35, height/4*2.1, width/4*1.15, 20) //substituir por imagem da barra de volume
        rect(width/3*1.325 + ((width/4*1.15)/9)*volume*0.99, height/2 * 1.025, 40, 40) //substituir por imagem do slider do volume
        text("NARRATION", width/6*3.55, height/3*2.1);
        textSize(25);
        if (narrationState){
          rect(width/6*3.525, height/4*3.035, 20, 20) //substituir por um coisito que fica posto por cima (ou por baixo) da imagem do botao para simbolizar que ta ativado
        }
        break;
      case 1:
        //to do keybinds settings
        fill(255);
        textSize(120);
        text("KEY-BINDS", width/6*3.55, height/4*1.2);
        textSize(25);
        break;
      case 2:
        //to do visual settings
        fill(255);
        textSize(120);
        text("VISUAL", width/6*3.55, height/4*1.2);
        textSize(25);
        break;
    }
  }
  else if (credits){
    //adicionar codigo para adicionar imagem de creditos aqui
  }
} 

//when the key is released start experience
function keyReleased() {
  if (credits == false && settings == false){
    if (keyCode === LEFT_ARROW)  window.location.href = "../experience/experience.html";
    else if (keyCode === UP_ARROW)  window.location.href = "../experience/experience.html";
    else if (keyCode === RIGHT_ARROW)  window.location.href = "../experience/experience.html";
  }
}

function mouseReleased() {
  if (buttons[0].isPressed(mouseX, mouseY)){ //clicked settings
    credits = false;
    settings = !settings;
  }
  else if(buttons[1].isPressed(mouseX, mouseY)){ //clicked credits
    settings = false;
    credits = !credits;
  }
  if (settings){
    if(buttonsSettings[0].isPressed(mouseX, mouseY)){ //clicked audio settings
      menuSelected=0;
    }
    else if(buttonsSettings[1].isPressed(mouseX, mouseY)){ //clicked keybindings settings
      menuSelected=1;
    }
    else if(buttonsSettings[2].isPressed(mouseX, mouseY)){ //clicked visual settings
      menuSelected=2;
    }
    if (menuSelected==0){
      if (buttonsAudio[0].isPressed(mouseX, mouseY)){ //decreased audio
        if (volume > 0){
          volume -= 1;
        }
      }
      else if (buttonsAudio[1].isPressed(mouseX, mouseY)){ //increased audio
        if (volume < 9){
          volume += 1;
        }
      }
      else if (buttonsAudio[2].isPressed(mouseX, mouseY)){ //clicked narration setting
        narrationState = !narrationState;
        console.log(narrationState);
      }
    }
    else if(menuSelected==1){
      //to be added click functions for keybinds settings
    }
    else if(menuSelected==2){
      //to be added click functions for visual settings
    }
  }
}