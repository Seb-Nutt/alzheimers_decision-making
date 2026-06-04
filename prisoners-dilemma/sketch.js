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
let turnCount = 0;
let previousChoice;
let opponent;
let player;
let opponentChosen;
let opponentDefined;
const TITLE_SIZE = 50;
const STAY_SILENT = 0;
const SNITCH = 1;
let prisonerImg;
let snitchButton;
let staySilentButton;
let actionable = false;

class Participant{
  constructor(type){
    this.type = type;
    this.x = width/3;
    this.TEXT_SIZE = 20;
    this.choice;
    this.imageHeight = 300;
    this.imageWidth = 200;
    this.movementDirection = 1;
  }

  drawParticipant(){
    textAlign(CENTER);
    text(this.type,this.x, height/2 - this.imageHeight);
    image(prisonerImg, this.x - this.imageWidth/2, height/2 - this.imageHeight/2,this.imageWidth,this.imageHeight);
  }

  moveParticipant(){
    if (Math.abs(width/2 - this.x) > 50){
      this.x -= 1*this.movementDirection;
    }
  }
}

class Opponent extends Participant{
  constructor(TEXT_SIZE, imageHeight, imageWidth, type){
    super(TEXT_SIZE, imageHeight, imageWidth, type);
    this.x = 2*width/3;
    this.choice;
    this.betrayed = false;
    this.movementMultiplier = -1;
  }

  decideMove(){
    if (this.type === "Alzhiemer's"){
      this.choice = SNITCH;
    }
    else{
      if (turnCount === 0){
        this.choice = STAY_SILENT;
      }
      else{
        if (this.betrayed){
          if (random(100) > 66){
            this.betrayed = false;
          }
          this.choice = SNITCH;
        }

        else{
          this.choice = previousChoice;
        }
      }
    }
    return this.choice;
  }
}

function preload(){
  INSTRUCTIONS = loadStrings('instructions.txt');
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
  prisonerImg = loadImage("../assets/prisoner.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(quicksandFont);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);

  alzhiemersButton = new ToggleButton(width/3 - "Alzhiemer's Group".length * 10, height/2 - TITLE_SIZE, "Alzhiemer's Group", color(200));
  controlButton = new ToggleButton(2*width/3 - "Control Group".length*10, height/2 - TITLE_SIZE, "Control Group", color(200));

  player = new Participant("Player");

  snitchButton = new ToggleButton(width/3 - "Snitch".length * 10, 3*height/4 - TITLE_SIZE, "Snitch", color(100));
  staySilentButton = new ToggleButton(2*width/3 - "Stay Silent".length * 10, 3*height/4 - TITLE_SIZE, "Stay Silent", color(200));

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
  let uiButtons = [HOME_BUTTON, INSTRUCTIONS_BUTTON];
  let actionButtons = [snitchButton, staySilentButton];
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
      opponentChosen = true;
    }
  }

  for (let button of actionButtons){
    if (button.detectHovering()){
      button.triggerEffect();
      actionable = false;
      opponent.decideMove();
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
  if (opponentChosen){
    if (!opponentDefined){
      if (alzhiemersButton.clicked){
        opponent = new Opponent("Alzhiemer's");
      }
      else{
        opponent = new Opponent("Control (Standard)");
      }
      opponentDefined = true;
      actionable = true;
    }
    player.drawParticipant();
    opponent.drawParticipant();

    if (actionable){
      snitchButton.drawButton();
      staySilentButton.drawButton();
      textAlign(CENTER);
      text("Or", width/2, 3*height/4);
    }

    else{
      player.moveParticipant();
      opponent.moveParticipant();
    }

  }
}