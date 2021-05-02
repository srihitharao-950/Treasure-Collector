var path,boy,cash,diamonds,jwellery,sword,car;
var Gameover,GameoverImg
var catch1,catchImg
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,carImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("police_man.png");
  GameoverImg=loadImage("gameOver.png");
  carImg = loadImage("car.png");
  catchImg = loadImage("catch.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(windowWidth/2,windowHeight/2,windowWidth, windowHeight);
path.addImage(pathImg);



//creating boy running
boy = createSprite(width/2,height/2,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
Gameover= createSprite(windowWidth/2,windowHeight/2,10,10)
Gameover.addImage(GameoverImg)
  Gameover.scale=0.8
Gameover.visible=false;
  
car = createSprite(width/2,height/1,20,20);
car.addImage(carImg);
car.scale=0.8;
  
  
catch1 = createSprite(windowWidth/1.5,windowHeight/1.5,20,20);
catch1.addImage(catchImg);
catch1.scale=0.8;
catch1.visible=false;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  boy.setCollider("circle",0,0,650)
  boy.debug = false;

}

function draw() {
  boy.velocityX=0;

  if(gameState===PLAY){
  background(0);
if( keyDown("RIGHT_ARROW")){
boy.velocityX=5
}
if(keyDown("LEFT_ARROW")){
boy.velocityX=-5
}
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > windowHeight ){
    path.y = height/2;
  }
    
    path.velocityY = 4;
    path.scale=1.2
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+200;

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;

      
    }else{
      if(swordGroup.isTouching(boy)) {

    }
      if(boy.isTouching(swordGroup)){
        gameState=END
       Gameover.visible=true;
        catch1.addImage(catchImg)
        catch1.visible=true;
        boy.destroy();
        cashG.destroyEach()
    diamondsG.destroyEach()
    jwelleryG.destroyEach()
    swordGroup.destroyEach()
        
        
      }
  }
  
  drawSprites();
  stroke(5)
  textSize(20);
  fill(0);
  text("Treasure: "+ treasureCollection,width/2.15,30);
  }
  
  else if(gameState===END){
   path.velocityY=0 
   cashG.setVelocityXEach(0)
    diamondsG.setVelocityXEach(0)
    jwelleryG.setVelocityXEach(0)
    swordGroup.setVelocityXEach(0)
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(windowWidth),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(windowWidth),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(windowWidth),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(windowWidth),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.2;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}