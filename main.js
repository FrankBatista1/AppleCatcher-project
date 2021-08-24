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

const apple = {
  x: 130,
  y: -10,
  widht: 32,
  height: 32,
  speed: 5,
}

class Apples{
  constructor(x){
    this.x = x;
  }
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}



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
function appleFalling(){
    return apple.y = apple.y + 4
}
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


let fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
  fpsInterval = 1000/fps
  then = Date.now()
  startTime = then;
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
    appleFalling()
    requestAnimationFrame(animate);
    movePlayer()
    walkingAnimation()

  }
 
}
startAnimating(30)
