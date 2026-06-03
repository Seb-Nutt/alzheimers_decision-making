// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let HOME_BUTTON;
let INSTRUCTIONS;
let quicksandFont;
let selectionButtons = [];
let alzhiemersButton;
let controlButton;
const TITLE_SIZE = 50;

class Opponent{
  constructor(type){
    this.type = type;
    this.TEXT_SIZE = 20;
    this.choice;
    this.STAY_SILENT = 0;
    this.SNITCH = 1;
  }

  drawOpponent(){

  }

  decideMove(){
    if (this.type === "Alzhiemer's"){
      this.choice = this.SNITCH;
    }
    else{
      //iterate through past choices from the user and use a tit for tat with leaniancy stragegy
    }

    return this.choice;
  }
}

function preload(){
  INSTRUCTIONS = loadStrings('instructions.txt');
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(quicksandFont);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);

  alzhiemersButton = new ToggleButton(width/3 - "Alzhiemer's Group".length * 10, height/2 - TITLE_SIZE, "Alzhiemer's Group", color(200));
  controlButton = new ToggleButton(2*width/3 - "Control Group".length*10, height/2 - TITLE_SIZE, "Control Group", color(200));

  selectionButtons.push(alzhiemersButton);
  selectionButtons.push(controlButton);
}

function draw() {
  background(0);
  drawMenuButtons();
  drawSelectionButtons();
  runSimulation();
}

function drawMenuButtons(){
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
}

function mouseClicked(){
  let uiButtons = [HOME_BUTTON,INSTRUCTIONS_BUTTON];
  for (let button of uiButtons){
    if (button.detectHovering()){
      button.clicked = !button.clicked;
      button.triggerEffect();
    }
    else{
      button.clicked = false;
    }
  }

  for (let button of selectionButtons){
    if (button.detectHovering()){
      button.triggerEffect();
    }
  }
}

function drawSelectionButtons(){
  for (let button of selectionButtons){
    if (!controlButton.clicked && !alzhiemersButton.clicked){
      button.drawButton();
    }
  }
}

function runSimulation(){
  if (controlButton.clicked){
    opponent = new Opponent();
  }
}