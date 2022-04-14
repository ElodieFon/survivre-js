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
        fill('red')
        ellipse(this.positionObstacleX, this.positionObstacleY, this.rayon , this.rayon); 
    }

    bouger()
    { 
        this.positionObstacleX = this.positionObstacleX + this.vitesse  * this.directionX ;
        this.positionObstacleY = this.positionObstacleY + this.vitesse  * this.directionY;
    }
    limitationDeTerrain()
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
        fill('white');
        stroke('black')
        strokeWeight(2);
        circle(this.posX, this.posY, this.diametreCercle); 
    }
    bouger() 
    {
        if (keyIsDown(RIGHT_ARROW)) this.posX = this.posX + this.nombreDePas;
        else if (keyIsDown(LEFT_ARROW)) this.posX = this.posX - this.nombreDePas;  
        else if (keyIsDown(DOWN_ARROW)) this.posY = this.posY + this.nombreDePas;
        else if (keyIsDown(UP_ARROW)) this.posY = this.posY - this.nombreDePas;      
    }
    limitationDeTerrain() 
    {
        if (this.posX < this.minPosX)//gauche 
        {
            this.posX = this.minPosX;
            stroke('blue');
            strokeWeight(4);
            line(0, largeurPlateau, 0, 0);                   
        }
        else if (this.posX > this.maxPosX)//droite 
        {
            this.posX = this.maxPosX;
            stroke('green');
            strokeWeight(4);
            line(largeurPlateau, hauteurPlateau, largeurPlateau, 0);  
            
        }
        else if (this.posY < this.minPosY) //haut 
        {
            this.posY = this.minPosY;
            stroke('yellow');
            strokeWeight(4);
            line(0, 0.5, largeurPlateau, 0);           
        }
        else if (this.posY > this.maxPosY)//bas 
        {             
            this.posY = this.maxPosY;
            stroke('red');
            strokeWeight(4);             
            line(0, hauteurPlateau, largeurPlateau, hauteurPlateau);            
        }
     
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let largeurPlateau = 640;
let hauteurPlateau = 480;
let obs ;
let player ;
let compteurImpact = 0;
let maxCompteurImpact = 1;
let timer = 0 ;
let millisecond = 0 ;


function setup(){

    createCanvas(largeurPlateau, hauteurPlateau); 
    noStroke();
    frameRate(30);
    
    obs = new Obstacle();
    player = new Joueur();
}

function draw(){

    background(128); 
    textSize(20);

    millisecond = millis();
    timer = Math.trunc(millisecond/1000) ;
    fill('white')  
    text(timer,20,20)

    text(compteurImpact, largeurPlateau/2, hauteurPlateau-50);
     
    player.display();
    player.bouger();
    player.limitationDeTerrain() ;
     
    obs.display();
    obs.bouger();
    obs.limitationDeTerrain();  

    Colision() ;
 
}

function Colision() 
{
    if (   player.posX              < obs.positionObstacleX     + obs.rayon
        && obs.positionObstacleX    < player.posX               + player.rayonCercle 
        && player.posY              < obs.positionObstacleY     + obs.rayon
        && obs.positionObstacleY    < player.posY               + player.rayonCercle  )
        {    

        compteurImpact = compteurImpact + 1;        
    }   
    if (compteurImpact >= maxCompteurImpact)
        {
            strokeWeight(4);
            textSize(20); 
            text('fin de partie \ntemp écoulé : \n'+ timer +' secondes ' , 100 , 100);                
            releaseTime();     
        }
}       
