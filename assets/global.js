class Button{
  //the default class for button
  constructor(x,y, buttonText, buttonColor){
    this.x = x;
    this.y = y;
    this.buttonText = buttonText;
    this.buttonColor = buttonColor;
    this.backgroundColor = color(red(this.buttonColor)-70,green(this.buttonColor)-70,blue(this.buttonColor)-70);
    this.hoveredColor = color(red(this.buttonColor)-100,green(this.buttonColor)-100,blue(this.buttonColor)-100);
    this.buttonWidth = this.buttonText.length*20;
    this.buttonHeight = 100;
    this.backgroundColorDeficit = 50;
    this.clicked = false;
    this.titleSize = this.buttonHeight/3;
  }
  
  drawButton(){
    stroke('white');

    //draw the background and name of the button
    fill(this.detectHovering() ? this.hoveredColor : this.backgroundColor);
    rect(this.x,this.y,this.buttonWidth,this.buttonHeight,50);
    textAlign(CENTER);
    textSize(this.titleSize);
    textFont(quicksandFont);
    fill(this.buttonColor);
    text(this.buttonText, this.x + this.buttonWidth/2, this.y + this.buttonHeight/2);

    //if the button is clicked trigger tis custom effect
    if (this.clicked){
      this.triggerEffect();
    }
  }

  detectHovering(){
    if (webglVersion === 'p2d'){
      //due to the different canvas measuring system of webGL mode the equation differe based on whether it is in webGL or not
      return this.x < mouseX && this.x + this.buttonWidth > mouseX && this.y < mouseY && this.y + this.buttonHeight > mouseY;
    }
    return this.x < mouseX-width/2 && this.y < mouseY-height/2 && this.x + this.buttonWidth > mouseX-width/2 && this.y + this.buttonHeight > mouseY- height/2;
  }
}

class InformationButton extends Button{
  constructor(x,y, buttonText, buttonColor, contentText, hoveredColor, buttonWidth, buttonHeight, clicked){
    super(x,y, buttonText, buttonColor, hoveredColor, buttonWidth, clicked, buttonHeight);
    this.title = buttonText;
    this.contentText = contentText;
    this.buttonWidth = this.buttonText.length*20;
    this.buttonHeight = 100;
    this.backgroundColorDeficit = 50;
    this.titleSize = this.buttonHeight/3;
    this.webglXOffset = webglVersion !== 'p2d' ? 0 : width/2;
    this.webglYOffset = webglVersion !== 'p2d' ? 0 : height/2;
    this.contentSizeDivisor = 1.55;
  }

  triggerEffect(){
    fill(this.backgroundColor);
    stroke(this.buttonColor);

    //draw the backround for the text (webGl doesnt support 2d shapes)
    if (webglVersion !== 'p2d'){
      box(width/2,height/2);
    }
    else{
      rect(width/8,height/8, 3*width/4, 3*height/4);
    }
    
    //apply these transformations to only the text attached
    push();
    if (webglVersion !== 'p2d'){
      //move the text in front of the box if it is 3d
      translate(0,0,250);
    }
    textAlign(CENTER);
    fill(this.buttonColor);
    textFont(quicksandFont);
    //write the title
    textSize(this.titleSize);
    text(this.title,0 + this.webglXOffset,-height/4 + this.titleSize + this.webglYOffset);
    //write the information attached
    textSize(this.titleSize/this.contentSizeDivisor);
    text(this.contentText,-width/4 + this.webglXOffset,-height/8 + this.webglYOffset,width/2);
    pop();
  }
}

class ToggleButton extends Button{
  //simply just an on or off button
  constructor(x, y, buttonText, buttonColor, hoveredColor, buttonWidth, buttonHeight, clicked){
    super(x, y, buttonText, buttonColor, hoveredColor, buttonWidth, buttonHeight, clicked);
  }
  triggerEffect(){
    this.clicked = true;
  }
}

class RedirectButton extends Button{
  //redirect the the attached page when clicked
  constructor(x, y, buttonText, buttonColor, location, hoveredColor, buttonWidth, buttonHeight, clicked){
    super(x, y, buttonText, buttonColor, hoveredColor, buttonWidth, buttonHeight, clicked);
    this.location = location;
  }

  triggerEffect(){
    //go to the page that was passed in
    window.location.href = this.location;
  }
}