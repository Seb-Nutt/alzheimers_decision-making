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
let cards = {
  a: null,
  b: null,
  c: null,
  d: null
};
let remainingFlips = 10;
let clickTime;
let allowFlipping = true;
let overallBalance = 0;
let CARD_WIDTH = 250;
let penalty;
const TEXTSIZE = 50;

class Card{

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

    this.selectionButton = new ToggleButton(this.x + cardWidth/4, this.y + 3*this.cardHeight/4, 'Select', color(150));
  }

  drawCard(){
    fill(150);
    stroke(255);

    textAlign(CENTER);

    rect(this.x,this.y,this.cardWidth,this.cardHeight,this.CORNER_ROUNDING);



    if (this.selectionButton.clicked){
      allowFlipping = false;

      text("You have gained: " + this.gain, this.x, this.y + this.cardHeight/3, this.cardWidth);

      if (penalty){
        text("You have lost: " + this.penalty, this.x, this.y + 2*this.cardHeight/3, this.cardWidth);
      }

      if (millis() - clickTime > 3000){
        this.selectionButton.clicked = false;
        allowFlipping = true;
      }
    }
    else{
      text(this.id,this.x + this.cardWidth/2,this.y + this.cardHeight/2);

      if (remainingFlips > 0){
        this.selectionButton.drawButton();
      }
    }
  }

}

function preload(){
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
  INSTRUCTIONS = loadStrings("instructions.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
  INSTRUCTIONS_BUTTON = new InformationButton(32*width/39, height/11, "Instructions", color(150), INSTRUCTIONS);

  cards.a = new Card(width/4 - 3*CARD_WIDTH/2,height/4,CARD_WIDTH,height/2,100,150,'A');
  cards.b = new Card(width/2 - 3*CARD_WIDTH/2, height/4, CARD_WIDTH, height/2, 100, 150, 'B');
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

  //go through and impliment checking for each card

  for (card of [cards.a,cards.b,cards.c,cards.d]){
    if (card.selectionButton.detectHovering() && allowFlipping && remainingFlips > 0){

      penalty = 50 > random(100);

      overallBalance += card.gain - (penalty ? card.penalty: 0);

      clickTime = millis();
      remainingFlips--;
      allowFlipping = false;
      card.selectionButton.triggerEffect();
    }
  }


  // console.log(mouseX,mouseY);
}

function drawMenuButtons(){
  HOME_BUTTON.drawButton();
  INSTRUCTIONS_BUTTON.drawButton();
}

function drawCards(){
  cards.a.drawCard();
  cards.b.drawCard();
  cards.c.drawCard();
  cards.d.drawCard();
}

function drawRemainingFlips(){
  
}

function drawUI(){
  stroke(255);
  textAlign(LEFT);
  text('Remaining Flips: ' + remainingFlips, 0, TEXTSIZE);

  textAlign(CENTER);
  text('Balance: ' + overallBalance, width/2, height/8);

  if (remainingFlips === 0){
    text('Game Over! Check the instructions to see your results', width/2, 7*height/8);
  }
}

