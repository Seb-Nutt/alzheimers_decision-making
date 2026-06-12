// Iowa Gambling Task
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//global variables
let HOME_BUTTON;
let quicksandFont;
let INSTRUCTIONS;
let INSTRUCTIONS_BUTTON;
let CONCLUSION;
let CONCLUSION_BUTTON;
let buttons;
let cards = {
  a: null,
  b: null,
  c: null,
  d: null
};
let remainingFlips = 100;
let clickTime;
let allowFlipping = true;
let overallBalance = 0;
let CARD_WIDTH = 250;
let rolledPenalty;
const TEXTSIZE = 50;

class Card{
  //card class for each of the four options
  constructor(x, y, cardWidth, cardHeight, gain, penalty, cardID){
    this.x = x;
    this.y = y;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;
    this.gain = gain;
    this.penalty = penalty;
    this.side = this.FACE_DOWN;
    this.id = cardID;
    this.CORNER_ROUNDING = 50;

    //add a button that chekcs if it has been selected
    this.selectionButton = new ToggleButton(this.x + cardWidth/4, this.y + 3*this.cardHeight/4, 'Select', color(150));
  }

  drawCard(){
    fill(150);
    stroke(255);
    textAlign(CENTER);

    //draw the background of the card
    rect(this.x,this.y,this.cardWidth,this.cardHeight,this.CORNER_ROUNDING);

    //if the button is clicked then reveal the result
    if (this.selectionButton.clicked){
      allowFlipping = false;

      text("You have gained: " + this.gain, this.x, this.y + this.cardHeight/3, this.cardWidth);

      if (rolledPenalty){
        text("You have lost: " + this.penalty, this.x, this.y + 2*this.cardHeight/3, this.cardWidth);
      }

      //flip the card back after 1 second
      if (millis() - clickTime > 1000){
        this.selectionButton.clicked = false;
        allowFlipping = true;
      }
    }

    //if the card is not selected then display the letter of the card and, if there are flips remaining, the selection button
    else{
      text(this.id,this.x + this.cardWidth/2,this.y + this.cardHeight/2);

      if (remainingFlips > 0){
        this.selectionButton.drawButton();
      }
    }
  }

}

function preload(){
  //load assets
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
  INSTRUCTIONS = loadStrings("instructions.txt");
  CONCLUSION = loadStrings("conclusion.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create the UI buttons
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);
  CONCLUSION_BUTTON = new InformationButton(32*width/39, 5*height/6, "Conclusion", color(150), CONCLUSION)

  //define the four cards
  cards.a = new Card(width/4 - 3*CARD_WIDTH/2,height/4,CARD_WIDTH,height/2,100, 250,'A');
  cards.b = new Card(width/2 - 3*CARD_WIDTH/2, height/4, CARD_WIDTH, height/2, 100, 250, 'B');
  cards.c = new Card(3*width/4 - 3*CARD_WIDTH/2, height/4, CARD_WIDTH, height/2, 50, 50, 'C');
  cards.d = new Card(width - 3*CARD_WIDTH/2, height/4, CARD_WIDTH, height/2, 50, 50, 'D');

  textSize(TEXTSIZE);
}

function draw() {
  background(0);
  drawCards();  
  drawMenuButtons();
  drawUI();
}

function mousePressed(){
  //draw the UI buttons and detect if they are clicked
  let uiButtons = [HOME_BUTTON, INSTRUCTIONS_BUTTON, CONCLUSION_BUTTON];
  for (let button of uiButtons){
    if (button.detectHovering()){
      button.clicked = !button.clicked;
      button.triggerEffect();
    }
    else{
      button.clicked = false;
    }
  }

  //check if each card is selected
  for (card of [cards.a,cards.b,cards.c,cards.d]){
    if (card.selectionButton.detectHovering() && allowFlipping && remainingFlips > 0){

      //determine whether the user drew a penalty
      rolledPenalty = 50 > random(100);

      //update the users balance
      overallBalance += card.gain - (penalty ? card.penalty: 0);

      //set a reference time to determine when the one second timer for each flip is up
      clickTime = millis();

      //update the flip state and trigger the button selection
      remainingFlips--;
      allowFlipping = false;
      card.selectionButton.triggerEffect();
    }
  }
}

function drawMenuButtons(){
  //constantly draw the UI button
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
  CONCLUSION_BUTTON.drawButton();
}

function drawCards(){
  //constantly draw the cards
  cards.a.drawCard();
  cards.b.drawCard();
  cards.c.drawCard();
  cards.d.drawCard();
}

function drawUI(){
  //draw the different UI aspects
  stroke(255);
  textAlign(LEFT);
  text('Remaining Flips: ' + remainingFlips, 0, TEXTSIZE);

  textAlign(CENTER);
  text('Balance: ' + overallBalance, width/2, height/8);

  //display game over when the user is out of flips
  if (remainingFlips <= 0){
    text('Game Over!', width/2, 7*height/8);
  }
}

