// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
let regionIDs = [BRAIN_STEM,CEREBELLUM,OCCIPITAL,PARIETAL,FRONTAL,TEMPORAL];

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

class RegionButton{
  constructor(x,y,region,id){
    this.x = x;
    this.y = y;
    this.region = region;
    this.regionID = id;
    this.secondaryColor = regionColors[this.regionID];
    this.buttonWidth = this.region.length*20;
    this.buttonHeight = 100;
    this.backgroundColorDeficit = 50;
    this.clicked = false;
    this.zoom = new Zoom(Vec.fromList([this.x + this.buttonWidth,this.y + this.buttonHeight]));


  }

  drawButton(opacity){
    stroke('white');

    this.backgroundColorDeficit = this.detectHovering() ? 100 : 70;

    fill(red(this.secondaryColor)-this.backgroundColorDeficit,green(this.secondaryColor)-this.backgroundColorDeficit,blue(this.secondaryColor)-this.backgroundColorDeficit,opacity);
    rect(this.x,this.y,this.buttonWidth,this.buttonHeight);
    textAlign(CENTER);
    textSize(this.buttonHeight/3);
    textFont(quicksandFont);
    fill(this.secondaryColor,opacity);
    text(this.region, this.x + this.buttonWidth/2, this.y + this.buttonHeight/2);
  }

  detectHovering(){
    return this.x < mouseX-width/2 && this.y < mouseY-height/2 && this.x + this.buttonWidth > mouseX-width/2 && this.y + this.buttonHeight > mouseY- height/2;
  }

  selected(){
    this.zoom.apply();    
    this.zoom.zoom(
      Vec.fromList([this.x + this.buttonWidth,this.y + this.buttonHeight]),100000
    );
  }
}

function preload() {
  nodePositions = loadStrings("assets/nodePositions.txt");
  quicksandFont = loadFont("assets/Quicksand-Regular.otf");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  scale(width/DEFAULT_HEIGHT,height/DEFAULT_HEIGHT);

  regionColors = [color(150), color(200,0,0), color(200,200,0), color(0,200,0), color(0,200,200), color(0,0,200)];

  //changing the string posisions into numbers
  for (let node = 0; node < nodePositions.length; node++){
    nodePositions[node] = nodePositions[node].split(" ");
    for (let coordinate = 0; coordinate < nodePositions[node].length; coordinate++){
      nodePositions[node][coordinate] = float(nodePositions[node][coordinate]);
    }
  }

  regionButtons.push(new RegionButton(60,350,'Brain Stem',0));
  regionButtons.push(new RegionButton(-578, 91, 'Cerebellum',1));
  regionButtons.push(new RegionButton(-665, -187, 'Occipital Lobe',2));
  regionButtons.push(new RegionButton(-220, -450, 'Parietal Lobe',3));
  regionButtons.push(new RegionButton(420, -355, 'Frontal Lobe',4));
  regionButtons.push(new RegionButton(130, 160, 'Temporal Lobe', 5));

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

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){
  const ROTATION_SPEED = 0.002;
  const ALIGNMENT_SPEED = 0.05;

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

    if (selectingLobe){
      if (brainRotationAngle === 0 && buttonOpacity <= 100){
        buttonOpacity += 0.05;
      }
      // just make a button next to each section
      // for (let region = 0; region < regionNodes.length; region++){
      //   fill(regionColors[region],50);
      //   stroke('white');
      //   beginShape();
      //   for (let node of regionBorderNodes[region]){
      //     vertex(node[0],node[1],node[2]);
      //   }
      //   endShape(CLOSE);
      // }

      for (let button of regionButtons){
        button.drawButton(buttonOpacity);
        // console.log(button.detectHovering());
      }

    }

    else{
      buttonOpacity = 0;
    }

  }

  ellipse(mouseX-width/2, mouseY-height/2, 3, 3);
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
        button.clicked = true;
        button.selected();
      }
    }
  }
}