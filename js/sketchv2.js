class Obstacle 
{
    constructor() 
    {
        this.positionObstacleX  = random(width)
        this.positionObstacleY  = random(height)
        this.vitesse = 5
        this.directionX = 1
        this.directionY = 1
        this.rayon = 25
        this.maxPosX = largeurPlateau - this.rayon/2;
        this.maxPosY = hauteurPlateau - this.rayon/2;
    }    
    display()
    {  
        ellipse(this.positionObstacleX, this.positionObstacleY, this.rayon , this.rayon); 
    }

    bouger()
    { 
        this.positionObstacleX = this.positionObstacleX + this.vitesse  * this.directionX ;
        this.positionObstacleY = this.positionObstacleY + this.vitesse  * this.directionY;
    }

    testColision()
    { 
        if (this.positionObstacleX > this.maxPosX) this.directionX *= - this.directionX ; 
        else if (this.positionObstacleX < 0 + this.rayon/2) this.directionX *= + this.directionX ;
        else if (this.positionObstacleY > this.maxPosY) this.directionY *= - this.directionY ;
        else if (this.positionObstacleY < 0 + this.rayon/2 ) this.directionY *= + this.directionY ;       
    }  
}
class Joueur
{
    constructor()
    {
        this.diametreCercle = 50,
        this.rayonCercle = this.diametreCercle/2,
        this.posX = largeurPlateau/2,
        this.posY = hauteurPlateau/2,
        this.maxPosX = largeurPlateau - this.rayonCercle,
        this.maxPosY = hauteurPlateau - this.rayonCercle,
        this.minPosX = this.rayonCercle,
        this.minPosY = this.rayonCercle,
        this.nombreDePas = 5
    }
    display()
    {
        circle(this.posX, this.posY, this.diametreCercle); 
    }
    bouger() 
    {
        if (keyIsDown(RIGHT_ARROW)) this.posX = this.posX + this.nombreDePas;
        else if (keyIsDown(LEFT_ARROW)) this.posX = this.posX - this.nombreDePas;  
        else if (keyIsDown(DOWN_ARROW)) this.posY = this.posY + this.nombreDePas;
        else if (keyIsDown(UP_ARROW)) this.posY = this.posY - this.nombreDePas;      
    }
}

let largeurPlateau = 640;
let hauteurPlateau = 480;
let obs ;
let player ;

function setup(){
    createCanvas(largeurPlateau, hauteurPlateau); 
    noStroke();
    frameRate(30);
   
  obs = new Obstacle();
  player = new Joueur();
}

function draw(){
    background(128); 
    fill('red') ;   
    obs.display();
    obs.bouger();
    obs.testColision();

    fill('white');
    stroke('black')
    strokeWeight(2);
    player.display();
    player.bouger();
}

