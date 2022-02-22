//Variables for navigation to and from the MainPage and Activity Pages

var pages1 = false;
var pages2 = false;
var pages3 = false;
let myFont;
var mainmenuShow = true;

//Variables for Activity1 

var direction1;
var count1;
var time1;
var arrowColorR1;
var arrowColorG1;
var arrowColorB1;
var arrowColor1;
var milliseconds1;
var numArrows1;
var isFinished1;
var speedArrowCorrect;
var speedArrowWrong;

//Variables for Activity2

var c;
var textPosition;
var textPositionArray;
var textPositionArrayGreen;
var textPositionFinal;
var subString1;
var subString2;
var black;
var greenArray;
var placeHolder;
var textPositionGreen;
let alphabets = "abcdefghijklmnopqrstuvwxyz";
let poschosen = 0;
let chosenalphabets = "";
var isFinished2;

//Variables for Activity3

var count3 = 0;
let gt = 30;
let xPos;
let yPos;
var isFinished3;

//timer

let t1 = 0;
let t2 = 0;
let t3 = 30;

//Preload sound function

function preload() {
  soundFormats('mp3', 'wav');
  speedArrowCorrect = loadSound("Assets/SpeedArrow_Correct.wav");
  speedArrowWrong = loadSound("Assets/SpeedArrow_Wrong.wav")
}

//setup function

function setup() {

  //mainmenu 

  createCanvas(1920, 1080);
  myButtonA1();
  myButtonA2();
  myButtonA3();
  mainButtonA1();
  mainButtonA2();
  mainButtonA3();
  myFont = loadFont('Assets/Amatic-Bold.ttf');

  //Declaring Variables - Activity 1

  direction1 = random([0, 1, 2, 3]);
  count1 = 0;
  time1 = 0;
  arrowColorR1 = 0;
  arrowColorG1 = 0;
  arrowColorB1 = 0;
  milliseconds1 = 0;
  numArrows1 = 10;
  isFinished1 = false;
  arrow1 = new Arrow();

  //Declaring Variables - Activity 2

  c = color('black');
  textPosition = 960;
  textPositionArray = textPosition;
  textPositionGreen = 960 - textWidth(greenArray);
  textPositionArrayGreen = textPositionGreen;
  textPositionFinal = 960;
  subString1 = 0;
  subString2 = 1;
  for (let i = 0; i < 26; i++) {
    poschosen = random(alphabets.length);
    chosenalphabets += alphabets.charAt(poschosen);
    alphabets = alphabets.substring(0, poschosen) + alphabets.substring(poschosen + 1, alphabets.length);
  }
  isFinished2 = false;

  str = '';
  for (let j = 0; j < chosenalphabets.length; j++) {
    str += chosenalphabets.charAt(j) + ',';
  }
  black = split(str, ',');
  greenArray = [];

  //Declaring Variables - Activity 3

  xPos = random(500, 1800);
  yPos = random(300, 900);
  isFinished3 = false;
}


//draw

function draw() {

  // display mainmenu

  background('Black');
  if (mainmenuShow == true) {

    MainPage();
    pages1 = false;
    pages2 = false;
    pages3 = false;

  }

  //display Activity1

  else if (pages1 == true && mainmenuShow == false) {
    Activity1Page();

    if (!isFinished1) {

      arrow1.display();
      textSize(100);
      stroke('white')
      fill('white');
      strokeWeight(1);
      text('Score: ' + count1, 200, 400);

      textSize(100);
      if (frameCount % 60 == 0 && t1 > -1) {
        t1++;
      }
      text('Seconds: ' + t1, 190, 500);

    }

    else {

      textSize(100);
      stroke('white')
      fill('white');
      strokeWeight(1);
      text('Score: ' + count1, 200, 400);

      textSize(100);
      text('Seconds: ' + t1, 190, 500);

      textSize(200);
      text('YOU WIN!', 960, 540);

    }
  }

  //display Activity2

  else if (pages2 == true && mainmenuShow == false) {

    Activity2Page();

    if (!isFinished2) {
      textSize(100)
      fill(c);
      if (textPosition > textPositionFinal) {
        textPosition -= (textPosition - textPositionFinal) / 30;
      }

      textPositionArray = textPosition;
      for (i = 0; i < greenArray.length; i++) {
        if (i > 0) {
          textPositionArray += (3 + textWidth(greenArray[i - 1]))
          c = color('lime');
          fill(c);
          text(greenArray[i], textPositionArray, 540);
        }
        else if (i === 0) {
          c = color('lime');
          fill(c);
          text(greenArray[i], textPositionArray, 540);
        }
      }

      if (greenArray.length >= 1) {
        textPositionArray += (3 + textWidth(greenArray[i - 1]));
      }
      for (i = 0; i < black.length; i++) {
        if (i > 0) {
          textPositionArray += (3 + textWidth(black[i - 1]))
          c = color('white');
          fill(c);
          text(black[i], textPositionArray, 540);
        }
        else if (i === 0) {
          c = color('white');
          fill(c);
          text(black[i], textPositionArray, 540);
        }
      }

      if (keyPressed) {
        if (key.toLowerCase() === black[0] && pages2 === true) {
          textPositionFinal -= textWidth(black[0]);

          print(black[0]);
          placeHolder = black[0];
          greenArray.push(placeHolder);
          print(greenArray)
          black.splice(0, 1);
        }
      }

      textSize(100);

      if (frameCount % 60 == 0 && t2 > -1 && greenArray.length<26) {
        t2++;
      }
      text('Time Taken: ' + t2, 300, 400);
      if(greenArray.length==26){
        text('COMPLETED!',1620,400);
      }
    }
  }

  //display Activity3

  else if (pages3 == true && mainmenuShow == false) {

    Activity3Page();

    if(!isFinished3){
      textSize(100);
      text('Score: ' + count3, 200, 400);
      
      if (frameCount % 60 == 0 && t3 > 0) {
        t3--;
      }
      text('Time Left: ' + t3, 190, 500);

      fill('lime');
      stroke('white');
      strokeWeight(10);
      circle(xPos, yPos, 100);
      strokeWeight(5);
      stroke(255, 204, 0);

      if (mouseIsPressed) {
        if (t3 != 0) {
          if (mouseX > xPos - 45 && mouseX < xPos + 45) {
            if (mouseY > yPos - 45 && mouseY < yPos + 45) {
              speedArrowCorrect.play();
              count3++;
              xPos = random(500, 1800);
              yPos = random(300, 900);
            }
          }
        }
      }
      if(t3==0){
        fill('white');
        stroke(255,204,0);
        text('OVER! GOOD JOB:)', 1620, 450);
      }
    }
  }
}

//Arrow Game

function Arrow() {

  //This function takes the direction, and determines which arrow will be printed
  //Each arrow is created as it's own image, rather than the same arrow being rotated.

  this.display = function () {

    if (direction1 === 0) {

      arrowColorR1 -= 4;
      arrowColorG1 -= 4;
      arrowColorB1 -= 4;
      strokeWeight(15);
      stroke(arrowColorR1 + 1, arrowColorG1 + 1, arrowColorB1 + 1);
      fill('white');
      beginShape();
      vertex(740, 502.5);
      vertex(980, 502.5);
      vertex(980, 390);
      vertex(1220, 580);
      vertex(980, 750);
      vertex(980, 637.5);
      vertex(740, 637.5);
      endShape(CLOSE);

    }

    else if (direction1 === 1) {

      arrowColorR1 -= 4;
      arrowColorG1 -= 4;
      arrowColorB1 -= 4;
      strokeWeight(15);
      stroke(arrowColorR1, arrowColorG1, arrowColorB1);
      fill('white');
      beginShape();
      vertex(1220, 637.5);
      vertex(980, 637.5);
      vertex(980, 750);
      vertex(740, 580);
      vertex(980, 390);
      vertex(980, 502.5);
      vertex(1220, 502.5);
      endShape(CLOSE);

    }

    else if (direction1 === 2) {

      arrowColorR1 -= 4;
      arrowColorG1 -= 4;
      arrowColorB1 -= 4;
      strokeWeight(15);
      stroke(arrowColorR1 + 1, arrowColorG1 + 1, arrowColorB1 + 1);
      fill('white');
      beginShape();
      vertex(912.5, 330);
      vertex(912.5, 580);
      vertex(800, 580);
      vertex(980, 810);
      vertex(1160, 580);
      vertex(1047.5, 580);
      vertex(1047.5, 330);
      endShape(CLOSE);

    }

    else if (direction1 === 3) {

      arrowColorR1 -= 4;
      arrowColorG1 -= 4;
      arrowColorB1 -= 4;
      strokeWeight(15);
      stroke(arrowColorR1 + 1, arrowColorG1 + 1, arrowColorB1 + 1);
      fill('white');
      beginShape();
      vertex(1047.5, 810);
      vertex(1047.5, 580);
      vertex(1160, 580);
      vertex(980, 330);
      vertex(800, 580);
      vertex(912.5, 580);
      vertex(912.5, 810);
      endShape(CLOSE);

    }
  }
}

//This function is the interactive part of Activity 1, where the user types the arrow keys 
//as inputs and the code determines whether it is right or wrong. If correct, the player's
//score will increase by 1. If wrong, the score will decrease by 1.

function keyPressed() {

  if (keyCode === RIGHT_ARROW && direction1 === 0 && isFinished1 === false && pages1 === true) {

    speedArrowCorrect.play();
    count1++;
    direction1 = random([0, 1, 2, 3]);
    arrowColorR1 = 0;
    arrowColorG1 = 255;
    arrowColorB1 = 0;
    if (count1 >= numArrows1) {
      isFinished1 = true;
    }

  }

  else if (keyCode === LEFT_ARROW && direction1 === 1 && isFinished1 === false && pages1 === true) {

    speedArrowCorrect.play();
    count1++;
    direction1 = random([0, 1, 2, 3]);
    arrowColorR1 = 0;
    arrowColorG1 = 255;
    arrowColorB1 = 0;
    if (count1 >= numArrows1) {
      isFinished1 = true;
    }

  }

  else if (keyCode === DOWN_ARROW && direction1 === 2 && isFinished1 === false && pages1 === true) {

    speedArrowCorrect.play();
    count1++;
    direction1 = random([0, 1, 2, 3]);
    arrowColorR1 = 0;
    arrowColorG1 = 255;
    arrowColorB1 = 0;
    if (count1 >= numArrows1) {
      isFinished1 = true;
    }

  }

  else if (keyCode === UP_ARROW && direction1 === 3 && isFinished1 === false && pages1 === true) {

    speedArrowCorrect.play();
    count1++;
    direction1 = random([0, 1, 2, 3]);
    arrowColorR1 = 0;
    arrowColorG1 = 255;
    arrowColorB1 = 0;
    if (count1 >= numArrows1) {
      isFinished1 = true;
    }

  }
  else {
    if (pages1 === true){
      speedArrowWrong.play();
    arrowColorR1 = 255;
    arrowColorG1 = 0;
    arrowColorB1 = 0;
    if (count1 > 0 && isFinished1 === false) {
        count1--;
      }
    }
  }
}

//Page1

function MainPage() {

  // This mainpage displays all the different boxs and text shown on the main GUI page

  myButton1.draw();
  myButton2.draw();
  myButton3.draw();
  noStroke();
  fill('#FF7F7F');
  rect(10, 10, 500, 1060);
  fill(255, 204, 0);
  rect(530, 10, 855, 150);
  fill('#6495ED');
  rect(1405, 10, 500, 1060);
  textSize(100);
  textFont(myFont);
  textAlign(CENTER);
  fill('black');
  text('Welcome Back! Start Activities:', 530, 10, 855, 150);
  textSize(40);
  textAlign(LEFT);
  text('Game 1: This game works on the basis of the user\n clicking on arrows pointing in the direction\n displayed. Correct Answers receive green\n feedback + 1 POINT while Wrong Answers receive\n red feedback - 1 POINT. The game goes on until\n you receive a score of 10 so HURRY UP and\n ALL THE BEST!',20, 180);
  text('Game 2: This game works on the principle of\n displaying 26 alphabets arranged in a random\n order after which the user has to trace through\n them and click onto the right keys as he/she\n progresses throughout the string. Right answers\n turn green so you know where you are at!\n Get going and remember, the quicker the better!!',1420,420);
  text('Game 3: This game is simply based on the ability\n of a user to maneuver around the screen using\n a mouse to reach out to the circular figure being\n displayed. There is a time period of 30 seconds\n awarded within which the user has to get through\n as many of such circles. All the best!', 20, 700);
}


//Page2

function Activity1Page() {

  stroke(255, 204, 0);
  strokeWeight(4);
  activity1Button.draw();
  fill('Black');
  rect(480, 20, 1420, 150);
  stroke(255, 204, 0);
  strokeWeight(4);
  fill('Black');
  rect(20, 190, 1880, 850);
  stroke(255, 204, 0);
  strokeWeight(4);
  textSize(100);
  textFont(myFont);
  textAlign(CENTER);
  fill('FFCC00');
  text('Activity 1: Speed Arrow Game', 480, 30, 1420, 150);

}

// First button on GUI page that goes to Activity 1

function myButtonA1() {

  myButton1 = new Clickable();
  myButton1.locate(530, 170);
  myButton1.width = 855;
  myButton1.height = 250;
  myButton1.color = ('#FFCC00');
  myButton1.textSize = 90;
  myButton1.text = "Activity 1: Speed Arrow";
  myButton1.onPress = function () {

    if (pages1 == false) {
      mainmenuShow = false;
      pages1 = true;
    }

    else if (pages1 == true) {
      mainmenuShow = true;
      pages1 = false;
    }
  }
}

//Page3

function Activity2Page() {

  activity2Button.draw();
  fill('Black');
  rect(480, 20, 1420, 150);
  stroke(255, 204, 0);
  strokeWeight(4);
  fill('Black');
  rect(20, 190, 1880, 850);
  stroke(255, 204, 0);
  strokeWeight(4);
  textSize(100);
  textFont(myFont);
  textAlign(CENTER);
  fill('FFCC00');
  text('Activity 2: Typing Game', 480, 30, 1420, 150);

}
// 2nd Button on GUI page that goes to Activity 2 page

function myButtonA2() {

  myButton2 = new Clickable();
  myButton2.locate(530, 430);
  myButton2.width = 855;
  myButton2.height = 250;
  myButton2.color = ('#FFCC00');
  myButton2.textSize = 90;
  myButton2.text = "Activity 2: Typing Game";
  myButton2.onPress = function () {

    if (pages2 == false) {
      mainmenuShow = false;
      pages2 = true;
    }

    else if (pages2 == true) {
      mainmenuShow = true;
      pages2 = false;
    }

  }
}

// Activity 3 Page

function Activity3Page() {

  activity3Button.draw();
  fill('Black');
  rect(480, 20, 1420, 150);
  stroke(255, 204, 0);
  strokeWeight(4);
  fill('Black');
  rect(20, 190, 1880, 850);
  stroke(255, 204, 0);
  strokeWeight(4);
  textSize(100);
  textFont(myFont);
  textAlign(CENTER);
  fill('FFCC00');
  text('Activity 3: Mouse Tracking Game', 480, 30, 1420, 150);

}

// Button on GUI page that goes to Activity 3 page

function myButtonA3() {

  myButton3 = new Clickable();
  myButton3.locate(530, 690);
  myButton3.width = 855;
  myButton3.height = 250;
  myButton3.color = ('#FFCC00');
  myButton3.textSize = 90;
  myButton3.text = "Activity 3: Mouse Tracking Game";
  myButton3.onPress = function () {

    if (pages3 == false) {
      mainmenuShow = false;
      pages3 = true;
    }

    else if (pages3 == true) {
      mainmenuShow = true;
      pages3 = false;
    }

  }
}

// Button in upper left corner of Activity 1 page that takes user back to main menu

function mainButtonA1() {

  activity1Button = new Clickable();
  activity1Button.locate(20, 20, 150);
  activity1Button.width = 450;
  activity1Button.height = 150;
  activity1Button.textSize = 80;
  activity1Button.text = "Main Menu";
  activity1Button.onPress = function () {

    if (!mainmenuShow) {
      mainmenuShow = true;
      direction1 = random([0, 1, 2, 3]);
      count1 = 0;
      time1 = 0;
      arrowColorR1 = 0;
      arrowColorG1 = 0;
      arrowColorB1 = 0;
      milliseconds1 = 0;
      numArrows1 = 10;
      isFinished1 = false;
      arrow1 = new Arrow();
      t1 = 0;
    }

  }
}

// Button in upper left corner of Activity 2 page that takes user back to main menu

function mainButtonA2() {

  activity2Button = new Clickable();
  activity2Button.locate(20, 20, 150);
  activity2Button.width = 450;
  activity2Button.height = 150;
  activity2Button.textSize = 80;
  activity2Button.text = "Main Menu";
  activity2Button.onPress = function () {

    if (!mainmenuShow) {
      mainmenuShow = true;
      c = color('black');
      textPosition = 960;
      textPositionArray = textPosition;
      textPositionGreen = 960 - textWidth(greenArray);
      textPositionArrayGreen = textPositionGreen;
      textPositionFinal = 960;
      subString1 = 0;
      subString2 = 1;
      alphabets = "abcdefghijklmnopqrstuvwxyz";
      poschosen = 0;
      chosenalphabets = "";
      for (let i = 0; i < 26; i++) {
        poschosen = random(alphabets.length);
        chosenalphabets += alphabets.charAt(poschosen);
        alphabets = alphabets.substring(0, poschosen) + alphabets.substring(poschosen + 1, alphabets.length);
      }
      isFinished2 = false;
      str = '';
      for (let j = 0; j < chosenalphabets.length; j++) {
        str += chosenalphabets.charAt(j) + ',';
      }
      black = split(str, ',');
      greenArray = [];
      t2=0;
    }
  }
}

// Button in upper left corner of Activity 3 page that takes user back to main menu

function mainButtonA3() {

  activity3Button = new Clickable();
  activity3Button.locate(20, 20, 150);
  activity3Button.width = 450;
  activity3Button.height = 150;
  activity3Button.textSize = 80;
  activity3Button.text = "Main Menu";
  activity3Button.onPress = function () {

    if (!mainmenuShow) {
      mainmenuShow = true;
      isFinished3 = false;
      xPos = random(500, 1800);
      yPos = random(300, 900);
      t3=30;
      count3=0;
    }

  }
}

//Libraries--------------------------------------------------------------------------


//clickable--------------------------------------------------------------------------

//Determines if the mouse was pressed on the previous frame
var cl_mouseWasPressed = false;
//Last hovered button
var cl_lastHovered = null;
//Last pressed button
var cl_lastClicked = null;
//All created buttons
var cl_clickables = [];

//This function is what makes the magic happen and should be ran after
//each draw cycle.
p5.prototype.runGUI = function () {
  for (i = 0; i < cl_clickables.length; ++i) {
    if (cl_lastHovered != cl_clickables[i])
      cl_clickables[i].onOutside();
  }
  if (cl_lastHovered != null) {
    if (cl_lastClicked != cl_lastHovered) {
      cl_lastHovered.onHover();
    }
  }
  if (!cl_mouseWasPressed && cl_lastClicked != null) {
    cl_lastClicked.onPress();
  }
  if (cl_mouseWasPressed && !mouseIsPressed && cl_lastClicked != null) {
    if (cl_lastClicked == cl_lastHovered) {
      cl_lastClicked.onRelease();
    }
    cl_lastClicked = null;
  }
  cl_lastHovered = null;
  cl_mouseWasPressed = mouseIsPressed;
}

p5.prototype.registerMethod('post', p5.prototype.runGUI);

//This function is used to get the bounding size of a
//string of text for use in the 'textScaled' property
function getTextBounds(m, font, size) {
  let txt = document.createElement("span");
  document.body.appendChild(txt);

  txt.style.font = font;
  txt.style.fontSize = size + "px";
  txt.style.height = 'auto';
  txt.style.width = 'auto';
  txt.style.position = 'absolute';
  txt.style.whiteSpace = 'no-wrap';
  txt.innerHTML = m;

  let width = Math.ceil(txt.clientWidth);
  let height = Math.ceil(txt.clientHeight);
  document.body.removeChild(txt);
  return [width, height];
}

//Button Class
function Clickable() {
  this.x = 0;			//X position of the clickable
  this.y = 0;			//Y position of the clickable
  this.width = 100;		//Width of the clickable
  this.height = 50;		//Height of the clickable
  this.color = "#FFFFFF";		//Background color of the clickable
  this.cornerRadius = 10;		//Corner radius of the clickable
  this.strokeWeight = 2;		//Stroke width of the clickable
  this.stroke = "#000000";	//Border color of the clickable
  this.text = "Press Me";		//Text of the clickable
  this.textColor = "#000000";	//Color for the text shown
  this.textSize = 50;		//Size for the text shown
  this.textFont = loadFont('Assets/Amatic-Bold.ttf');	//Font for the text shown
  this.textScaled = false;     //Scale the text with the size of the clickable

  // image options
  this.image = null; // image object from p5loadimage()
  this.fitImage = false; // when true, image will stretch to fill button
  this.imageScale = 1.0;
  this.tint = null; // tint image using color
  this.noTint = true; // default to disable tinting
  this.filter = null; // filter effect

  this.updateTextSize = function () {
    if (this.textScaled) {
      for (let i = this.height; i > 0; i--) {
        if (getTextBounds(this.text, this.textFont, i)[0] <= this.width
          && getTextBounds(this.text, this.textFont, i)[1] <= this.height) {
          console.log("textbounds: " + getTextBounds(this.text, this.font, i));
          console.log("boxsize: " + this.width + ", " + this.height);
          this.textSize = i / 2;
          break;
        }
      }
    }
  }
  this.updateTextSize();

  this.onHover = function () {
    //This function is ran when the clickable is hovered but not
    //pressed.
  }

  this.onOutside = function () {
    //This function is ran when the clickable is NOT hovered.
  }

  this.onPress = function () {
    //This function is ran when the clickable is pressed.
  }

  this.onRelease = function () {
    //This function is ran when the cursor was pressed and then
    //released inside the clickable. If it was pressed inside and
    //then released outside this won't run.
  }

  this.locate = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.resize = function (w, h) {
    this.width = w;
    this.height = h;
    this.updateTextSize();
  }

  this.drawImage = function () {
    push();
    imageMode(CENTER);
    let centerX = this.x + this.width / 2;
    let centerY = this.y + this.height / 2;
    let imgWidth = this.width;
    let imgHeight = this.height;
    if (this.fitImage) {
      let imageAspect = this.image.width / this.image.height;
      let buttonAspect = this.width / this.height;
      if (imageAspect > buttonAspect) { // image is wider than button
        imgWidth = this.width;
        imgHeight = this.height * (buttonAspect / imageAspect);
      }
      else {
        imgWidth = this.width * (imageAspect / buttonAspect);
        imgHeight = this.height;
      }
    }

    image(this.image, centerX, centerY, imgWidth * this.imageScale, imgHeight * this.imageScale);

    if (this.tint && !this.noTint) {
      tint(this.tint)
    } else {
      noTint();
    }
    if (this.filter) {
      filter(this.filter);
    }
    pop();
  }

  this.draw = function () {
    push();
    fill(this.color);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    fill(this.textColor);
    noStroke();
    if (this.image) {
      this.drawImage();
    }
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    textFont(this.textFont);
    text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    if (mouseX >= this.x && mouseY >= this.y
      && mouseX < this.x + this.width && mouseY < this.y + this.height) {
      cl_lastHovered = this;
      if (mouseIsPressed && !cl_mouseWasPressed)
        cl_lastClicked = this;
    }
    pop();
  }

  cl_clickables.push(this);
}
