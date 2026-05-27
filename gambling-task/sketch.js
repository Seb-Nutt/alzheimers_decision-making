// Iowa Gambling Task
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let HOME_BUTTON;
let quicksandFont;

function preload(){
  quicksandFont = loadFont("../assets/Quicksand-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  HOME_BUTTON = new RedirectButton(width/39, 9*height/11, " Home ",color(100),"../index.html");
}

function draw() {
  background(0);
  drawHomeButton();
}

function drawHomeButton(){
  HOME_BUTTON.drawButton();

  
}

function mousePressed(){
  if (HOME_BUTTON.detectHovering()){
    HOME_BUTTON.triggerEffect();
  }
  console.log(mouseX,mouseY);
}