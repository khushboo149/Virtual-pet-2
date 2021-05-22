var dog, happyDog, database, foodS, foodStock, stock
var fedTime,lastFed;
var foodObj;
var feed,addFood;

function preload()
{
  dogImg=loadImage("./images/dogImg.png");
  dogImg1=loadImage("./images/dogImg1.png");
  milkImg=loadImage("./images/milkImg.png");
}
function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj=new Food();
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}



function draw() {  
  
background(46, 139, 87);
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  
  //add styles here
  
  fill(255,255,254)
        textSize(15);
        if(lastFed>=12){
          text("Last Feed: " + lastFed % 12 + "PM",350,30);
        }
        else if(lastFed===0){
          text("Last Feed: 12 AM",350,30);
        
        }
        else{
          text("Last Feed: "+ lastFed + "AM",350,30);
        }
        foodObj.display();
        drawSprites();
      }
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}
function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}
