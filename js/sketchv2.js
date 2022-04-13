class Obstacle 
{   
    constructor()
    {
        this.positionObstacleX = 25 ,
        this.positionObstacleY = 25 ,
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

        //TODO faire en sorte que l'obstacle ne sorte pas de la map
        //revoir ce code (je pense que les dimenssions du plateau ne peuvent pas etre lu comme ça)
        // if (this.positionObstacleX > this.maxPosObstacleX ) { this.h_v *= - this.h_v;}
        // if ( this.positionObstacleX < 0 + this.rayonObstacle) {this.h_v *= + this.h_v;}
        // if (this.positionObstacleY > this.maxPosObstacleY ) { this.h_v *= - obs.h_v;}
        // if (  this.positionObstacleY < 0 + this.rayonObstacle ) {this.h_v *= + obs.h_v;} 
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
let compteurImpact = 0;
let maxCompteurImpact = 1;
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
    obs.moove() ; 
     

    fill('white')
    player.display();
    player.moove();   
}

// function limitationDeTerrain() 
// {
//     if (posX < minPosX)//gauche 
//     {
//         posX = minPosX;// assignation d'une nouvelle valeur
//         line(0, largeurPlateau, 0, 0);// creation d'une ligne a cette position
//         // line(x : point de départ , y : arriver , x2 : point de départ oposé a x , y2 : arriver oposé a y )
//         stroke('blue'); // changement de couleur des traits 
//         console.log("bord gauche toucher")
//     }
//     else if (posX > maxPosX)//droite 
//     {
//         posX = maxPosX;
//         line(largeurPlateau, hauteurPlateau, largeurPlateau, 0);
//         stroke('green');
//         console.log("bord droit toucher")
//     }
//     else if (posY < minPosY) //haut 
//     {
//         posY = minPosY;
//         line(0, 0.5, largeurPlateau, 0);
//         stroke('yellow');
//         console.log("bord haut toucher")
//     }
//     else if (posY > maxPosY)//bas 
//     {
//         posY = maxPosY;
//         line(0, hauteurPlateau, largeurPlateau, hauteurPlateau);
//         stroke('red');
//         console.log("bord bas toucher")
//     }
//     else {
//         stroke(0, 0, 0)
//     }
// }