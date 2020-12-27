let playerOnePaddle;
let playerTwoPaddle;
let ball;
 
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  playerOnePaddle = new SantaPaddle(48);
  playerTwoPaddle = new SantaPaddle(width - 48);
  ball = new Ball();
  p1score = new Score(width / 2 - 225);
  p2score = new Score(width / 2 + 225);
}
 
function draw() {
    background(215, 225, 229);
    stroke(255);
    strokeWeight(3);
    line(width/2, 0, width/2, height);
    playerOnePaddle.display();
    playerTwoPaddle.display();

    if (playerOnePaddle.isUp) {
        playerOnePaddle.moveUp();
    } else if (playerOnePaddle.isDown) {
        playerOnePaddle.moveDown();
    }
    if (playerTwoPaddle.isUp) {
        playerTwoPaddle.moveUp();
    } else if (playerTwoPaddle.isDown) {
        playerTwoPaddle.moveDown();
    }
    ball.update(p1score, p2score);
    ball.display();

    ball.hasHitPlayerOne(playerOnePaddle); 
    ball.hasHitPlayerTwo(playerTwoPaddle); 
    
    p1score.display();
    p2score.display();
    displayPONG();
}

function keyPressed(){
    if(keyCode == 87)
    {
        playerOnePaddle.isUp = true;
    }
    else if(keyCode == 83)
    {
        playerOnePaddle.isDown = true;
    }
    else if(keyCode == UP_ARROW){
        playerTwoPaddle.isUp = true;
    }
    else if(keyCode == DOWN_ARROW){
        playerTwoPaddle.isDown = true;
    }
}

function keyReleased() {
    if(keyCode == 87)
    {
        playerOnePaddle.isUp = false;
    }
    else if(keyCode == 83)
    {
        playerOnePaddle.isDown = false;
    }
    else if(keyCode == UP_ARROW){
        playerTwoPaddle.isUp = false;
    }
    else if(keyCode == DOWN_ARROW){
        playerTwoPaddle.isDown = false;
    }
}

function displayPONG(){
    textSize(96);
    textAlign(CENTER);
    fill(152, 187, 255);
    text("PONG!", width / 2 - 165, 20, 330, 200);
}