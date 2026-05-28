// Iowa Gambling Task
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let HOME_BUTTON;
let quicksandFont;
let INSTRUCTIONS;
let INSTRUCTIONS_BUTTON;
let buttons;

class Card{

  constructor(x, y, cardWidth, cardHeight, gain, penalty, cardID){
    this.FACE_DOWN = 0;
    this.FACE_UP = 1;
    this.x = x;
    this.y = y;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;
    this.gain = gain;
    this.penalty = penalty;
    this.side = FACE_DOWN;
    this.id = cardID;
  }

  drawCard(){
    if (this.side === this.FACE_DOWN){

    }
    else{

    }
  }

  getResult(){

  }
}

function preload(){
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
  INSTRUCTIONS = loadStrings("INSTRUCTIONS.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);
}

function draw() {
  background(0);
  drawMenuButtons();
}

function mousePressed(){
  let buttons = [HOME_BUTTON,INSTRUCTIONS_BUTTON];
  for (let button of buttons){
    if (button.detectHovering()){
      button.clicked = !button.clicked;
      button.triggerEffect();
    }
    else{
      button.clicked = false;
    }
  }


  if (HOME_BUTTON.detectHovering()){
    HOME_BUTTON.triggerEffect();
  }

  if (INSTRUCTIONS_BUTTON.detectHovering()){
    INSTRUCTIONS_BUTTON.clicked = true;
    INSTRUCTIONS_BUTTON.triggerEffect();
  }
  console.log(mouseX,mouseY);
}

function drawMenuButtons(){
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
}