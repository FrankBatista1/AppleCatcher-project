

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 400
canvas.widht = 400  

//tracks keys the player is pressing
const keys = []

const player = {
  x: 130,
  y: 250,
  widht: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 7,  //fps
  moving: false
};

const numberOfApples = 10
const apples = [];

class Apples{
  constructor(){
    this.x = 130,
    this.y = -400,
    this.width = 32,
    this.height = 32
    this.speed = 5
  }
  
  appleRandomized(){
    this.x = Math.floor(Math.random() * 250)
  }
}
const apple = new Apples
const apple2 = new Apples
const apple3 = new Apples
const apple4 = new Apples
const apple5 = new Apples
const apple6 = new Apples
const apple7 = new Apples
const apple8 = new Apples
const apple9 = new Apples
const apple10 = new Apples
apple.appleRandomized()
apple2.appleRandomized()
apple3.appleRandomized()
apple4.appleRandomized()
apple5.appleRandomized()
apple6.appleRandomized()
apple7.appleRandomized()
apple8.appleRandomized()
apple9.appleRandomized()
apple10.appleRandomized()

function appleFalling(){
  apple10.y += 2.3
  apple9.y += 4.1
  apple8.y += 3.9
  apple7.y += 2.5
  apple6.y += 2.1
  apple5.y += 1.8
  apple4.y += 3
  apple3.y += 1.9
  apple2.y += 3.2
  apple.y += 4
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

// function drawApples(img, sX, sY,count){
//   count++;
//   if(count % 40 == 0){
//   ctx.drawImage(img, sX, sY)
//     console.log('yei')
//   } else{
//     console.log('hey')
//   }
// }



// hight of spritesheet 63
// widht of spritesheet 63
const playerSprite = new Image();
playerSprite.src = './Images/gau.png'

const applesImg = new Image();
applesImg.src = './Images/apple.png'

const background = new Image()
background.src = './Images/ce4f9092-606e-48d6-a6a8-cad7e0b6e21d.jpeg' 

// let counter = 0;
// function drawTheApple(){
//     let randomNumber = (Math.floor(Math.random * 200))
//     ctx.drawImage(applesImg, -10,randomNumber)
//     return counter++;
// }
// const drawApples = setInterval(drawTheApple,6000)
// function stopInterval() {
//   if(counter === 20){
//     clearInterval(drawApples)
//     }
//   } 
// drawTheApple()
// stopInterval()





window.addEventListener('keydown',function(e){
    keys[e.key] = true;
    player.moving = true;
})

window.addEventListener('keyup', (e) => {
   delete keys[e.key];
   player.moving = false
})

function movePlayer(){
  if(keys['ArrowUp'] && player.y > 210){
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys['ArrowDown'] && player.y < 350){
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys['ArrowLeft'] && player.x > -3){
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keys['ArrowRight'] &&  player.x < 270){
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

function walkingAnimation(){
  if(player.frameX < 3 && player.moving === true){
    player.frameX++;
  } else{
    player.frameX = 0;
  }
}


let fpsInterval, now, then, elapsed;

function startAnimating(fps){
  fpsInterval = 1000/fps
  then = Date.now()
  animate();
}

function animate(){
  requestAnimationFrame(animate)
  now = Date.now()
  elapsed = now - then;
  if (elapsed > fpsInterval){
    then = now - (elapsed % fpsInterval)
    ctx.clearRect(0,0,canvas.widht, canvas.height)
    ctx.drawImage(background,0,0,canvas.widht,canvas.height)
    drawSprite(playerSprite, player.widht * player.frameX, player.height * player.frameY, player.widht, player.height, player.x, player.y, player.widht, player.height)
    ctx.drawImage(applesImg,apple.x,apple.y)
    ctx.drawImage(applesImg,apple2.x,apple2.y)
    ctx.drawImage(applesImg,apple3.x,apple3.y)
    ctx.drawImage(applesImg,apple4.x,apple4.y)
    ctx.drawImage(applesImg,apple5.x,apple5.y)
    ctx.drawImage(applesImg,apple6.x,apple6.y)
    ctx.drawImage(applesImg,apple7.x,apple7.y)
    ctx.drawImage(applesImg,apple8.x,apple8.y)
    ctx.drawImage(applesImg,apple9.x,apple9.y)
    ctx.drawImage(applesImg,apple10.x,apple10.y)
  
    appleFalling()
    movePlayer()
    // console.log((Number(then.toFixed(0))))
    walkingAnimation()

  }
 
}
startAnimating(30)
