class SantaPaddle {
    constructor(x) {
        this.x = x;
        this.y = height / 2 - 60; // height is height of display window
        this.height = 120;
        this.width = 25;
        
        this.isUp = false;
        this.isDown = false;
    }
     
    display() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
 
    moveUp(){
        if(this.y > 0){
            this.y -= 3;
        }
    }

    moveDown(){
        if(this.y < height - this.height){
            this.y += 3;
        }
    }
}