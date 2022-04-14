class Obstacle 
{
    constructor() {
        this.positionObstacleX  = random(width)
        this.positionObstacleY  = random(height)
        this.vitesse = 5
        this.directionX = 1
        this.directionY = 1
        this.rayon = 25
        this.maxPosX = largeurPlateau - this.rayon/2;
        this.maxPosY = hauteurPlateau - this.rayon/2;
    }    
    display = function(){  
        ellipse(this.positionObstacleX, this.positionObstacleY, this.rayon , this.rayon); 
    }

    bouger = function(){ 
        this.positionObstacleX = this.positionObstacleX + this.vitesse  * this.directionX ;
        this.positionObstacleY = this.positionObstacleY + this.vitesse  * this.directionY;
    }

    testColision = function(){ 
        if ( this.positionObstacleX > this.maxPosX) this.directionX *= - this.directionX ; 
        if (this.positionObstacleX < 0 + this.rayon/2) this.directionX *= + this.directionX ;
        if (this.positionObstacleY > this.maxPosY) this.directionY *= - this.directionY ;
        if (this.positionObstacleY < 0 + this.rayon/2 ) this.directionY *= + this.directionY ;       
    }  
}

let largeurPlateau = 640;
let hauteurPlateau = 480;

function setup(){
    createCanvas(largeurPlateau, hauteurPlateau); 
    noStroke();
   
  obs = new Obstacle();
}

function draw(){
    background(128); 
    fill('red') ;   
    obs.display();
    obs.bouger();
    obs.testColision();
}

// on définit un classe qui s'appelle "Obstacle"
