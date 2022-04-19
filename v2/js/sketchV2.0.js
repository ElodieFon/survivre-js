// il n'est pas fini pour le moment

class Obstacle 
{   
    constructor() 
    {      
        this. positionObstacleX = random(width) , 
        this.positionObstacleY = random(height),
        this.vitesseX = 5;
        this.vitesseY = 5;
        this.directionX = 1;
        this.directionY = 1;
        this.rayon = 25;
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
        this.positionObstacleX = this.positionObstacleX + this.vitesseX  * this.directionX ;
        this.positionObstacleY = this.positionObstacleY + this.vitesseY  * this.directionY;
    }
    limitationDeTerrain()
    { //limite la position de l'obstacle en faisant rebondir la bal sur le "mur"
        if (this.positionObstacleX > this.maxPosX) this.directionX *= - this.directionX ; 
        else if (this.positionObstacleX < 0 + this.rayon/2) this.directionX *= + this.directionX ;
        else if (this.positionObstacleY > this.maxPosY) this.directionY *= - this.directionY ;
        else if (this.positionObstacleY < 0 + this.rayon/2 ) this.directionY *= + this.directionY ;       
    }  
    Colision() 
    {
        if (  //detecte la colision 
            player.posX              < this.positionObstacleX       + this.rayon
            && this.positionObstacleX   < player.posX               + player.rayonCercle
            && player.posY              < this.positionObstacleY    + this.rayon
            && this.positionObstacleY   < player.posY               + player.rayonCercle
        ) 
        {    
            //  faire rebondir l'obstacle sur le joueur 
            
            if (player.posX  < this.positionObstacleX + this.rayon )this.directionX *= + this.directionX;
            if (player.posY  < this.positionObstacleY + this.rayon )this.directionY *= + this.directionY;
            if (this.positionObstacleX < player.posX + player.rayonCercle)this.directionX *= - this.directionX;
            if (this.positionObstacleY < player.posY + player.rayonCercle)this.directionY *= - this.directionY;

            //ajoute 1 au compteur
            compteurImpact = compteurImpact + 1;                                      
        }   

        if (compteurImpact >= maxCompteurImpact)
        {          
            //envoi un message quand le compteur a atteint son niveau max
            

            text('fin de partie \ntemp écoulé : '+ timer +' secondes \npress F5 '  , 100 , 100); 
            
            
            // frameRate(0) //<- ralentit le temp

        // window.alert('fin de partie \ntemp écoulé : '+ timer +' secondes \npress F5 ') ; 
        // location.reload(true); //<- ne recharge pas la page

        // clearRect();
        // clear();
        // reset();
        // removeElements();
        // remove();
        // window.clearInterval();
        
        //TODO trouver comment reter et reset le jeu sans que ça rame
     
        }     
    }   
}
class Joueur
{
    constructor()
    {
        this.diametreCercle = 50,
        this.rayonCercle = this.diametreCercle/2,
        this.posX = random(width),
        this.posY = random(height),
        this.maxPosX = largeurPlateau - this.rayonCercle,
        this.maxPosY = hauteurPlateau - this.rayonCercle,
        this.minPosX = this.rayonCercle,
        this.minPosY = this.rayonCercle,
        this.vitesse = 15
    }    
    display()
    {  
        fill('white');
        
        stroke('black');
        strokeWeight(2);
        circle(this.posX, this.posY, this.diametreCercle); 
    }

    bouger() 
    {
        if (keyIsDown(RIGHT_ARROW)) this.posX = this.posX + this.vitesse;
        else if (keyIsDown(LEFT_ARROW)) this.posX = this.posX - this.vitesse;  
        else if (keyIsDown(DOWN_ARROW)) this.posY = this.posY + this.vitesse;
        else if (keyIsDown(UP_ARROW)) this.posY = this.posY - this.vitesse;      
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
let interval = setInterval(draw, 100);


let millisecond ; 

let compteurImpact = 0;
let maxCompteurImpact = 10;

let player ;

let obs =[];

let nbrObstacle = 10 ;
let maxnbrObstacle = 10;

function setup(){

    createCanvas(largeurPlateau, hauteurPlateau); 
    noStroke();
    frameRate(30);

    for (let i = 0; i < nbrObstacle; i++) {
        obs[i] = new Obstacle(              
        i,
        obs
        );
      }
    player = new Joueur() ;     
}
function draw(){

    background('black'); 
    textSize(20);

    millisecond = millis();
    timer = Math.trunc(millisecond/1000) ;

    fill('white')  
    text(timer+ ' s',20,20)

    text('impact : ' + compteurImpact,largeurPlateau/2,450)

    player.display();
    player.bouger();
    player.limitationDeTerrain() ;

    obs.forEach(Obstacle => {
    Obstacle.display();
    Obstacle.bouger();
    Obstacle.limitationDeTerrain();
    Obstacle.Colision(); 
    });
 // TODO trouver comment faire aparaitre chaque objet synchroniser sur le temp (ex : un nouvelle obstacle par seconde)
}
