const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 800
canvas.widht = 800

//tracks keys the player is pressing
const keys = []

const player = {
  x: 0,
  y: 0,
  widht: 63,
  height: 63,
  frameX: 0,
  frameY: 0,
  speed: 9,  //fps
  moving: false
};

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

// hight of spritesheet 63
// widht of spritesheet 63
const playerSprite = new Image();
playerSprite.src = './Images/Rhinoceros sprite sheet needed _ OpenGameArt.org_files/behomath.png'

const background = new Image()
background.src = './Images/Hd-2048x2048-A-Visitors-Guide-to-Dantes-Nine-Circles-of-Hell.jpeg'

function animate(){
  ctx.clearRect(0,0,canvas.widht, canvas.height)
  ctx.drawImage(background,0,0,canvas.widht,canvas.height)
  drawSprite(playerSprite, 0, 0, player.widht, player.height, 200, 300, player.widht, player.height)
  requestAnimationFrame(animate);
}
animate();