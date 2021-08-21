
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var level;
var beeImage;
var gameMusic,hitBananan
var instructions,storyline;
var bear,bear_running;
var deer,deerImg
var gameOverMusic;
function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  jungleImg = loadImage("jungle.png");
  groundImg = loadAnimation("ground.jpg") 
  
  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
  snakeImg = loadAnimation("snake.png");

  beeImage = loadAnimation("bee.png","bee.png","bee1.png","bee1.png",);

  gameMusic = loadSound("gameMusic.mp3");
  hitBananan = loadSound("hit.mp3")
  bear_running = loadAnimation("bear1.png","bear2.png");
  deerImg = loadImage("deer.png");
  gameOverMusic = loadSound("gameOver.mp3");
}
function setup(){
 createCanvas(600,300);
 gameMusic.loop();
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
 
 
  monkey = createSprite(200,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  bear = createSprite(150,100);
  bear.scale = 0.1;
  bear.addAnimation("bear",bear_running);
  bear.rotaion = -180;
    bear.velocityX = 1;

deer = createSprite(50,40);
deer.scale = 0.1;
deer.addImage(deerImg);

  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
  level = 0;
  instructions = "Press space to jump";
  storyline = "I am looking for my friend have you seen him?";
}

function draw(){

  background(jungleImg);
  fill("red");
  textSize(15)
  text("Level: "+level, 470, 20);
  text("Score: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    spawnBirds();
    score = score + Math.round(getFrameRate()/60);
    level = Math.round(score/100);


    if(level <2){
      text(instructions,30,15); 
      text(storyline,30,80); 
    }else if( level >2){
      storyline = " ";
      instructions = " ";
    }
    if(level >5){
     
      obstacleImage = loadImage("snake2.png");
      jungleImg = loadImage("waterfall background.png");
      deer.destroy();
    }
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -16; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      hitBananan.play();
      bananaScore = bananaScore + Math.round(random(1,6));  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameOverMusic.play();
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER!!!", 220, 170);
    fill("red");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      obstacleImage = loadImage("obstacle.png");
      jungleImg = loadImage("jungle.png");
      obstacle.scale = 0.13 ; 
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.tint = rgb(random(0,255),random(0,255),random(0,255));
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana); 
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    if(level>5){
      obstacle.scale = 0.05;
    }
  }
  
  
}

function spawnBirds(){
  if(frameCount%60===0){
   
    var bird = createSprite(300,Math.round(random(20,100)),40,10);
    bird.velocityX = 3;
    bird.addAnimation("flying",beeImage); 
    bird.scale = 0.3;
    monkey.depth = bird.depth +1;
    bird.lifetime = 80;
  }
}