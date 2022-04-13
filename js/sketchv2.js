class Obstacle 
{   
    constructor()
    {
        this.positionObstacleX = 10 ,
        this.positionObstacleY = 10 ,
        this.maxPosObstacleX = largeurPlateau - this.rayonObstacle,
        this.maxPosObstacleY = hauteurPlateau - this.rayonObstacle,
        this.h_v = 1 ,
        this.vitesseObstacle = 1 ,   
        this.rayonObstacle = 25 
    }

    display() 
    {
        circle(this.positionObstacleX,this.positionObstacleY,this.rayonObstacle)
    }
    moove() 
    {
        this.positionObstacleX = this.positionObstacleX + this.vitesseObstacle * this.h_v; //horizontal
        this.positionObstacleY = this.positionObstacleY + this.vitesseObstacle * this.h_v; //vertical
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
    moove() 
    {
        if (keyIsDown(RIGHT_ARROW)) //fleche droite du clavier
        {
            this.posX = this.posX + this.nombreDePas; //bouger dans la direction demandé
        }    
        else if (keyIsDown(LEFT_ARROW)) //fleche gauche du clavier
        {
            this.posX = this.posX - this.nombreDePas;
        }    
        else if (keyIsDown(DOWN_ARROW)) //fleche bas du clavier
        {
            this.posY = this.posY + this.nombreDePas;
        }
    
        else if (keyIsDown(UP_ARROW)) //fleche haut du clavier
        {
            this.posY = this.posY - this.nombreDePas;
        }
    }
}

// =======configuration plateau========== //
//taille
let largeurPlateau = 640;
let hauteurPlateau = 480;
let obs ;
let player;

function setup() {

    createCanvas(largeurPlateau, hauteurPlateau); 
    obs = new Obstacle() ; 
    player = new Joueur();     
}

function draw() {
    background(128);

    fill('red');  
    obs.display() ;
    // obs.moove() ; 
    
    fill('white')
    player.display();
    player.moove();   
}