// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];
let nodePositions;
let rotationAngle = 0;
const MIRROR_NODE = -1;

class BrainNode{
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  connect(otherNode){
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < 200){
      fill(255);
      line(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z);
    }
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
    brainNodes.push(new BrainNode(node[0],node[1],node[2]));

    //Mirror the 
    if (node[2] !== MIRROR_NODE){
      brainNodes.push(new BrainNode(node[0],node[1],node[2]*-1));
    }
  }
}

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){
  if (mouseIsPressed){
    orbitControl();
    rotationAngle = 0;
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

  //rotate the brain
}