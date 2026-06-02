// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let HOME_BUTTON;
let INSTRUCTIONS;
let quicksandFont;

function preload(){
  INSTRUCTIONS = loadStrings('instructions.txt');
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(quicksandFont);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);
}

function draw() {
  background(0);
  drawMenuButtons();
}

function drawMenuButtons(){
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
}

function mouseClicked(){
  if (HOME_BUTTON.detectHovering()){
    HOME_BUTTON.triggerEffect();
  }

  if (INSTRUCTIONS_BUTTON.detectHovering()){
    INSTRUCTIONS_BUTTON.triggerEffect();
  }
}