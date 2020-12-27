class Ball{
    constructor(){
        this.r = 12.5;
        this.reset();
    }

    update(score1, score2){
        if (this.y < this.r || this.y > height - this.r)
        {
            this.ySpeed = -this.ySpeed;
        }
        if (this.x < this.r){
            score2.increment();
            this.reset();
        } 
        else if (this.x > width + this.r){
            score1.increment();
            this.reset();
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    reset(){
        this.x = width / 2;
        this.y = height / 2;

        this.xSpeed = random(3, 4);
        let isLeft = random(0, 1);
        if(isLeft > 0.5){
            this.xSpeed = -this.xSpeed;
        }
        this.ySpeed = random(-3, 3)
    }
    
    display(){
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    hasHitPlayerOne(player) {
        if (this.x - this.r <= player.x + player.width && this.x > player.x) {
            if (this.isSameHeight(player)) {
                this.xSpeed = -this.xSpeed;
            }
        }
    }

    hasHitPlayerTwo(player) {
        if (this.x - this.r >= player.x - player.width && this.x < player.x) {
            if (this.isSameHeight(player)) {
                this.xSpeed = -this.xSpeed;
            }
        }
    }

    isSameHeight(player) {
        return this.y >= player.y && this.y <= player.y + player.height
    }
}