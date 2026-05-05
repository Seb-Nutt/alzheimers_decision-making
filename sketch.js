// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];
//keep adding colors
let regionColors = [['grey'], ['red'], ['orange']];
let nodePositions;
let rotationAngle = 0;
let selectingLobe = false;

class BrainNode{
  constructor(x,y,z,region) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.regionColor = regionColors[region];
    this.NODE_CONNECTION_RANGE = 200;
  }

  connect(otherNode){
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < this.NODE_CONNECTION_RANGE){
      
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
    //create the nodes and classify thier region
    brainNodes.push(new BrainNode(node[0]-150,node[1]+50,node[2], node[3]));

    //Mirror the node if it is not centered
    if (node[2] !== 0){
      brainNodes.push(new BrainNode(node[0]-150,node[1]+50,node[2]*-1, node[3]));
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

    rotateY(rotationAngle);
  }
  else{
    rotationAngle+= 0.002;
    rotateY(rotationAngle);
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


}

function keyPressed(){
  if (key === ' '){
    selectingLobe = !selectingLobe;
  }
}