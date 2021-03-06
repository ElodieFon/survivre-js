
// =======configuration plateau========== //
//taille
let largeurPlateau = 640;
let hauteurPlateau = 480;

// configuration compteur de point d'impact
let compteurImpact = 0;
let maxCompteurImpact = 1;

// =======configuration cercle======= //

//taille
let diametreCercle = 50;
let rayonCercle = diametreCercle/2;
//position au démarage du jeu
let posX, posY; 
//limitation de la zone de jeu 
let maxPosX = largeurPlateau - rayonCercle;
let maxPosY = hauteurPlateau - rayonCercle;
let minPosX = rayonCercle;
let minPosY = rayonCercle;
//déplacement 
let nombreDePas = 15;

// =========configuration obstacle========== //
//taille
let rayonObstacle = 25; 
//position au démarage du jeu
let obstaclePosX, obstaclePosY; 
//vitesse
let vitesseObstacleX = 10; 
let vitesseObstacleY = 10; 
//direction
let directionObstacleX = 1; 
let directionObstacleY = 1;
//limitation de la zone de jeu 
let maxPosObstacleX = largeurPlateau - rayonObstacle;
let maxPosObstacleY = hauteurPlateau - rayonObstacle;

//===========================================//

function setup() {
    //creer le plateau de jeu
    createCanvas(largeurPlateau, hauteurPlateau); 
    noStroke();
    frameRate(30);
    // Position aléatoir de départ du joueur au lancement du jeux
    posX = random(width);
    posY = random(height);
    // Position aléatoir de départ de l'obstacle au lancement du jeux
    obstaclePosX = random(width);
    obstaclePosY = random(height);
  
}
function draw() {
    //mettre une couleur en fond
    background(128);  

    // creation du cercle joueur
    fill('white')  
    strokeWeight(2);
    changementCouleur();   
    circle(posX, posY, diametreCercle); 
    controleDirection();

    // création de l'obstacle 
    strokeWeight(1);
    fill('red');
    ellipse(obstaclePosX, obstaclePosY, rayonObstacle, rayonObstacle) ;  
    bouger() ;

   //affichage du compteur
    textSize(20);
    text(compteurImpact, largeurPlateau/2, hauteurPlateau-50);

   aretDeJeu() ;
       
    //calcul de distance
    affichageDistance();
     
}
function controleDirection() {
    if (keyIsDown(RIGHT_ARROW)) //fleche droite du clavier
    {
        posX = posX + nombreDePas; //bouger dans la direction demandé
    }
    else if (keyIsDown(LEFT_ARROW)) //fleche gauche du clavier
    {
        posX = posX - nombreDePas;
    }
    else if (keyIsDown(DOWN_ARROW)) //fleche bas du clavier
    {
        posY = posY + nombreDePas;
    }
    else if (keyIsDown(UP_ARROW)) //fleche haut du clavier
    {
        posY = posY - nombreDePas;
    }
    // limitation de terrain
    if (posX < minPosX)//gauche 
    {
        posX = minPosX;// assignation d'une nouvelle valeur
        line(0, largeurPlateau, 0, 0);// creation d'une ligne a cette position
        stroke('blue'); // changement de couleur des traits 
        console.log("bord gauche toucher")
    }
    else if (posX > maxPosX)//droite 
    {
        posX = maxPosX;
        line(largeurPlateau, hauteurPlateau, largeurPlateau, 0);
        stroke('green');
        console.log("bord droit toucher")
    }
    else if (posY < minPosY) //haut 
    {
        posY = minPosY;
        line(0, 0.5, largeurPlateau, 0);
        stroke('yellow');
        console.log("bord haut toucher")
    }
    else if (posY > maxPosY)//bas 
    {
        posY = maxPosY;
        line(0, hauteurPlateau, largeurPlateau, hauteurPlateau);
        stroke('red');
        console.log("bord bas toucher")
    }
    else 
    {
        stroke(0, 0, 0)
    }
}

function affichageDistance() 
{
    strokeWeight(1)
    fill('white');
    let distance = dist(posX, posY, obstaclePosX, obstaclePosY) - (rayonCercle + rayonObstacle);
    translate((posX + obstaclePosX) / 2, (posY + obstaclePosY) / 2);
    atan();
    text(nfc(distance, 2), 0, 0);
}
function changementCouleur()
{
    if (   posX         < obstaclePosX  + rayonObstacle 
        && obstaclePosX < posX          + rayonCercle 
        && posY         < obstaclePosY  + rayonObstacle
        && obstaclePosY < posY          + rayonCercle )
        {
            fill('red');
            console.log('colision');            
            compteurImpact = compteurImpact + 1;
            console.log(compteurImpact); 
        }       
}
function bouger(){

    //déplacement auto de l'obstacle
    obstaclePosX = obstaclePosX + vitesseObstacleX * directionObstacleX; //horizontal
    obstaclePosY = obstaclePosY + vitesseObstacleY * directionObstacleY; //vertical
    //changement de direction de l'obstacle
    if (obstaclePosX > maxPosObstacleX ) { directionObstacleX *= - directionObstacleX;}          
    if (obstaclePosY > maxPosObstacleY ) { directionObstacleY *= - directionObstacleY;}
    if ( obstaclePosX < 0 + rayonObstacle) {directionObstacleX *= + directionObstacleX;}           
    if (  obstaclePosY < 0 + rayonObstacle ) {directionObstacleY *= + directionObstacleY;}
}

function aretDeJeu(){
 //condition d'arret de jeux
 if (compteurImpact >= maxCompteurImpact)
 {
    strokeWeight(4);
    textSize(20); 
    fill('white');  
    //timer
    let millisecond = millis(); 
    let timer = Math.trunc(millisecond/1000)  
    text('fin de partie \ntemp écoulé : \n'+ timer +' secondes ' , largeurPlateau/4 , hauteurPlateau/2);     
      
    window.alert('fin de partie \ntemp écoulé : '+ timer +' secondes \npress F5 ') ; 
    location.reload(true);     
 }
}
