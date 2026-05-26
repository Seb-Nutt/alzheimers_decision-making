class Button{
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
  
  drawButton(opacity){
    stroke('white');

    fill(this.detectHovering() ? this.hoveredColor : this.backgroundColor,opacity);
    rotateY(0);
    rect(this.x,this.y,this.buttonWidth,this.buttonHeight);
    textAlign(CENTER);
    textSize(this.titleSize);
    textFont(quicksandFont);
    fill(this.buttonColor,opacity);
    text(this.buttonText, this.x + this.buttonWidth/2, this.y + this.buttonHeight/2);

    if (this.clicked){
      this.triggerEffect();
    }
  }

  detectHovering(){
    return this.x < mouseX-width/2 && this.y < mouseY-height/2 && this.x + this.buttonWidth > mouseX-width/2 && this.y + this.buttonHeight > mouseY- height/2;
  }
}