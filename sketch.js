// Alzhiemers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global variables
let brainNodes = [];
let regionColors;
let regionNodes = [[],[],[],[],[],[]];
let nodePositions;
let brainRotationAngle = 0;
let selectingLobe = false;
let regionButtons = [];
let quicksandFont;
let buttonOpacity;
let selectedRegion;
const DEFAULT_WIDTH = 1912;
const DEFAULT_HEIGHT = 948;
const BRAIN_STEM = 0;
const CEREBELLUM = 1;
const OCCIPITAL = 2;
const PARIETAL = 3;
const FRONTAL = 4;
const TEMPORAL = 5;
let regionWriteUps;
let parentSimulationButton;
let simulationButtons = [];
const IOWA_GAMBLING_TASK = 0;
const PRISONERS_DILEMMA = 1;
let simulationLinks = ["gambling-task/index.html","prisoners-dilemma/index.html"];


class BrainNode{
  constructor(x,y,z,region) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.regionColor = regionColors[region];
    this.NODE_CONNECTION_RANGE = 200;
  }

  connect(otherNode){
    //use a scale
    
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < this.NODE_CONNECTION_RANGE && (this.regionColor === otherNode.regionColor || !selectingLobe)){
      line(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z);
    }
  }
}

function preload() {
  nodePositions = loadStrings("assets/nodePositions.txt");
  quicksandFont = loadFont("assets/Quicksand-Regular.otf");
  regionWriteUps = loadStrings("assets/regionWriteUps.txt");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  scale(width/DEFAULT_WIDTH,height/DEFAULT_HEIGHT);

  regionColors = [color(150), color(200,0,0), color(200,200,0), color(0,200,0), color(0,200,200), color(0,0,200)];

  //changing the string posisions into numbers
  for (let node = 0; node < nodePositions.length; node++){
    nodePositions[node] = nodePositions[node].split(" ");
    for (let coordinate = 0; coordinate < nodePositions[node].length; coordinate++){
      nodePositions[node][coordinate] = float(nodePositions[node][coordinate]);
    }
  }

  //create the parent simulation button
  parentSimulationButton = new ToggleButton(-19*width/39, -5*height/11,'Simulations',color(200));

  //create the two simulation buttons that appear below the main one when selected
  simulationButtons.push(new RedirectButton(parentSimulationButton.x, parentSimulationButton.y + parentSimulationButton.buttonHeight*2, 'Iowa Gambling Task', color(150), simulationLinks[IOWA_GAMBLING_TASK]));
  simulationButtons.push(new RedirectButton(parentSimulationButton.x, parentSimulationButton.y + parentSimulationButton.buttonHeight*4, 'Prisoners Dilemma', color(150), simulationLinks[PRISONERS_DILEMMA]));

  //create the buttons for each region of the brain
  regionButtons.push(new InformationButton(60,350,'Brain Stem', regionColors[BRAIN_STEM],regionWriteUps[BRAIN_STEM]));
  regionButtons.push(new InformationButton(-578, 91, 'Cerebellum', regionColors[CEREBELLUM],regionWriteUps[CEREBELLUM]));
  regionButtons.push(new InformationButton(-665, -187, 'Occipital Lobe', regionColors[OCCIPITAL],regionWriteUps[OCCIPITAL]));
  regionButtons.push(new InformationButton(-220, -450, 'Parietal Lobe',regionColors[PARIETAL],regionWriteUps[PARIETAL]));
  regionButtons.push(new InformationButton(420, -355, 'Frontal Lobe', regionColors[FRONTAL],regionWriteUps[FRONTAL]));
  regionButtons.push(new InformationButton(130, 160, 'Temporal Lobe', regionColors[TEMPORAL],regionWriteUps[TEMPORAL]));

  for (node of nodePositions){
    //create the nodes and classify their region
    brainNodes.push(new BrainNode(node[0],node[1],node[2], node[3]));
    regionNodes[node[3]].push([node[0],node[1],node[2]]);

    //Mirror the node if it is not centered
    if (node[2] !== 0){
      brainNodes.push(new BrainNode(node[0],node[1],node[2]*-1, node[3]));
      regionNodes[node[3]].push([node[0],node[1],node[2]*-1]);
    }
  }
}

function draw(){ 
  background(0);
  drawBrain();
  drawSimulationButtons();
  drawUI();
}


function drawBrain(){
  const ROTATION_SPEED = 0.002;
  const ALIGNMENT_SPEED = 0.05;

  push();

  brainRotationAngle %= 2*PI;
  //rotate the brain if a lobe is not being selected
  if (selectingLobe){
    //rotate the brain back into position
    if (brainRotationAngle > 0){
      brainRotationAngle -= ALIGNMENT_SPEED;
    }
    else{
      brainRotationAngle = 0;
    }

    rotateY(brainRotationAngle);
  }
  else{
    brainRotationAngle += ROTATION_SPEED;
    rotateY(brainRotationAngle);
  }

  for (node of brainNodes){
    for (otherNode of brainNodes){

      //if selecting a lobe then color the regions
      if (selectingLobe){
        stroke(node.regionColor);
      }
      else{
        stroke(255);
      }

      if (node !== otherNode){
        node.connect(otherNode);
      }
    }

    
  }
  pop();

  if (selectingLobe){
    for (let button of regionButtons){
      button.drawButton(buttonOpacity);
    }
  }
}

function keyPressed(){
  if (key === ' '){
    selectingLobe = !selectingLobe;
  }
}

function mouseClicked(){
  if (selectingLobe){
    for (let button of regionButtons){
      if (button.detectHovering()){
        button.clicked = !button.clicked;
        button.triggerEffect();
      }
      else{
        button.clicked = false;
      }
    }
  }
  for (let childButton of simulationButtons){
    if (childButton.detectHovering() && parentSimulationButton.clicked){
      childButton.triggerEffect();
    }
  }
  if (parentSimulationButton.detectHovering()){
    parentSimulationButton.triggerEffect();
  }
  else{
    parentSimulationButton.clicked = false;
  }

}

function drawSimulationButtons(){
  parentSimulationButton.drawButton();
  if (parentSimulationButton.clicked){
    for (let childButton of simulationButtons){
      childButton.drawButton();
    }
  }
}

function drawUI(){
  let titleSize = 50;
  stroke(255);
  textSize(titleSize);
  textAlign(CENTER);

  if (!selectingLobe){
    text("Press space to enter/exit selection mode!",0, -height/2 + titleSize);
  }
}