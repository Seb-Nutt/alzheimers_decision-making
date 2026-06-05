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
const COOPERATE = 0;
const STEAL = 1;
let prisonerImg;
let coinImg;
let stealButton;
let cooperateButton;
let actionable = false;
let atCenter = false;
let resultCalculated = false;

class Participant{
  constructor(type){
    this.type = type;
    this.x = width/3;
    this.TEXT_SIZE = 20;
    this.choice;
    this.prisonerHeight = 300;
    this.prisonerWidth = 200;
    this.movementDirection = 1;
    this.points = 0;
    this.hasCoin = true;
  }

  drawParticipant(){
    textAlign(CENTER);
    text(this.type,this.x, height/2 - this.prisonerHeight);
    image(prisonerImg, this.x - this.prisonerWidth/2, height/2 - this.prisonerHeight/2,this.prisonerWidth,this.prisonerHeight);

    if (this.hasCoin){
      if (this.type === "Player"){
        image(coinImg, this.x, height/2 - this.prisonerHeight/2,100,100);
      }
      else{
        image(coinImg, this.x - this.prisonerWidth/2, height/2 - this.prisonerHeight/2,100,100);
      }
    }

    text(this.points,this.x,height/2 + this.prisonerHeight/2);
  }

  moveParticipant(goal){
    if (goal === width/2){
      this.x += 2*this.movementDirection;
    }
    else if(goal - this.x !== 0){
      this.x -= 2*this.movementDirection;
    }
    else{
      actionable = true;
      resultCalculated = false;
      this.hasCoin = true;
    }
    atCenter = Math.abs(width/2 - this.x) < 100;
  }

  drawDecision(){
    text(this.choice, this.x, height/2 + this.prisonerHeight*2);
  }
}

class Opponent extends Participant{
  constructor(TEXT_SIZE, prisonerHeight, prisonerWidth, type, points, hasCoin){
    super(TEXT_SIZE, prisonerHeight, prisonerWidth, type, points, hasCoin);
    this.x = 2*width/3;
    this.choice;
    this.betrayed = false;
    this.movementDirection = -1;
  }

  decideMove(){
    if (this.type === "Alzhiemer's"){
      this.choice = STEAL;
    }
    else{
      if (turnCount === 0){
        this.choice = COOPERATE;
      }
      else{

        if (previousChoice === STEAL){
          this.betrayed = true;
        }

        if (this.betrayed){
          if (random(100) > 66){
            this.betrayed = false;
          }
          this.choice = STEAL;
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
  coinImg = loadImage("../assets/coin.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(quicksandFont);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);

  alzhiemersButton = new ToggleButton(width/3 - "Alzhiemer's Group".length * 10, height/2 - TITLE_SIZE, "Alzhiemer's Group", color(200));
  controlButton = new ToggleButton(2*width/3 - "Control Group".length*10, height/2 - TITLE_SIZE, "Control Group", color(200));

  player = new Participant("Player");

  stealButton = new ToggleButton(width/3 - "Steal".length * 10, 3*height/4 - TITLE_SIZE, "Steal", color(100));
  cooperateButton = new ToggleButton(2*width/3 - "Cooperate".length * 10, 3*height/4 - TITLE_SIZE, "Cooperate", color(200));

  selectionButtons.push(alzhiemersButton);
  selectionButtons.push(controlButton);
}

function draw() {
  background(0);
  drawSelectionButtons();
  runSimulation();  
  drawMenuButtons();
}

function drawMenuButtons(){
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
}

function mouseClicked(){
  let uiButtons = [HOME_BUTTON, INSTRUCTIONS_BUTTON];
  let actionButtons = [stealButton, cooperateButton];
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
      previousChoice = player.choice;
      if (button === stealButton){
        player.choice = STEAL;
      }
      else{
        player.choice = COOPERATE;
      }
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
      stealButton.drawButton();
      cooperateButton.drawButton();
      textAlign(CENTER);
      text("Or", width/2, 3*height/4);
    }

    else if (!atCenter && !resultCalculated){
      player.moveParticipant(width/2);
      opponent.moveParticipant(width/2);
    }

    else if (atCenter && !resultCalculated){
      getResult();
    }

    else{
      player.moveParticipant(width/3);
      opponent.moveParticipant(2*width/3);
    }
  }
}

function getResult(){
  if (player.choice === STEAL){
    if (opponent.choice === COOPERATE){
      opponent.hasCoin = false;
      player.points += 3;
      opponent.points -= 1;
    }
  }
  else{
    player.hasCoin = false;
    if (opponent.choice === STEAL){
      opponent.points += 3;
      player.points -= 1;
    }

    else{
      opponent.hasCoin = false;
      opponent.points += 2;
      player.points += 2;
    }
  }
  resultCalculated = true;
}