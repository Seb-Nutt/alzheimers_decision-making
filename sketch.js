// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];
let brainRegions = [];
let nodePositions;
let rotationAngle = 0;
let selectingLobe = false;

class BrainNode{
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.NODE_CONNECTION_RANGE = 200;
  }

  connect(otherNode){
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < this.NODE_CONNECTION_RANGE){
      fill(255);
      line(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z);
    }
  }
}

class BrainRegion{
  constructor(borderNodes,r,g,b) {
    this.borderNodes = borderNodes;
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = 100;
  }

  colorIn(){
    fill(this.r,this.g,this.b,this.alpha);
    beginShape();
    for (let point of borderNodes){
      vertex(point[0],point[1]);
    }
    endShape(CLOSE);
  }
}


function preload() {
  nodePositions = loadStrings("assets/nodePositions.txt");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);


  //changing the string posisions into numbers
  for (let node = 0; node < nodePositions.length; node++){
    nodePositions[node] = nodePositions[node].split(" ");
    for (let coordinate = 0; coordinate < nodePositions[node].length; coordinate++){
      nodePositions[node][coordinate] = float(nodePositions[node][coordinate]);
    }
  }


  for (node of nodePositions){
    //create the regions
    //add a number on each node to classify the node in a region

    //create the nodes
    brainNodes.push(new BrainNode(node[0]-150,node[1]+50,node[2]));

    //Mirror the node if it is not centered
    if (node[2] !== 0){
      brainNodes.push(new BrainNode(node[0]-150,node[1]+50,node[2]*-1));
    }
  }

  
}

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){

  //rotate the brain if a lobe is not being selected
  if (selectingLobe){
    //rotate the brain back into position
    if (rotationAngle - 0.1 > 0){
      rotationAngle -= 0.05;
    }

    for (let region of brainRegions){

    }

    rotateY(rotationAngle);
  }
  else{
    rotationAngle+= 0.002;
    rotateY(rotationAngle);
  }
  
  stroke(255);
  for (node of brainNodes){
    for (otherNode of brainNodes){
      if (node !== otherNode){
        node.connect(otherNode);
      }
    }
  }


}

function keyPressed(){
  if (key === ' '){
    selectingLobe = !selectingLobe;
  }
}