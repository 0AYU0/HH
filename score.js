class Score{
    constructor(x)
    {
        this.x = x;
        this.score = 0;
    }

    display(){
        textSize(52);
        textAlign(CENTER);
        fill(44, 54, 70);
        text(this.score, this.x, 80)
    }
    
    increment(){
        this.score++;
    }
}