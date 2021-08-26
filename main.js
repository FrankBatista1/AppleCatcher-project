
function start(numberOfApples) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 400;
  canvas.widht = 400;
  let value = window.devicePixelRatio;
  value = 2

  //tracks keys the player is pressing
  let keys = [];

  let player = {
    x: 130,
    y: 250,
    widht: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,
  };

  const catched = new Image();
  catched.src = "./Images/apple eaten.png";
  const playerSprite = new Image();
  playerSprite.src = "./Images/gau.png";

  const applesImg = new Image();
  applesImg.src = "./Images/apple.png";

  const background = new Image();
  background.src = "./Images/ce4f9092-606e-48d6-a6a8-cad7e0b6e21d.jpeg";
  let apples = [];
  let applesCatched = [];

  class Apples {
    constructor() {
      (this.x = Math.floor(Math.random() * 250)),
        (this.y = -400),
        (this.width = 32),
        (this.height = 32);
      this.speed = Math.random() * 3.1 + 1.8;
    }
    draw() {
      ctx.drawImage(applesImg, this.x, this.y);
    }
    fall() {
      this.y += this.speed;
    }
    pushOut() {}
  }
  for (let i = 0; i < numberOfApples; i++) {
    apples.push(new Apples());
  }

  window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
    player.moving = true;
  });

  window.addEventListener("keyup", (e) => {
    delete keys[e.key];
    player.moving = false;
  });
 

  function movePlayer() {
    if (keys["ArrowUp"] && player.y > 210) {
      player.y -= player.speed;
      player.frameY = 3;
      player.moving = true;
    }
    if (keys["ArrowDown"] && player.y < 350) {
      player.y += player.speed;
      player.frameY = 0;
      player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x > -3) {
      player.x -= player.speed;
      player.frameY = 1;
      player.moving = true;
    }
    if (keys["ArrowRight"] && player.x < 270) {
      player.x += player.speed;
      player.frameY = 2;
      player.moving = true;
    }
  }

  function walkingAnimation() {
    if (player.frameX < 3 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }

  let fpsInterval, now, then, elapsed;
  let timesLost = 0
  let timesWon = 0
 

  function getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.hypot(xDist, yDist);
  }
  
  
  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
  }
  function checkIfWin(){
    if(applesCatched.length === numberOfApples){
      alert('You won')
      apples = [];
      applesCatched = [];
      keys = [];
      timesWon++
      for (let i = 0; i < numberOfApples; i++) {
        apples.push(new Apples());
        
      }
    }
}
  
  

  function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.widht, canvas.height);
      ctx.drawImage(background, 0, 0, canvas.widht, canvas.height);
      ctx.fillText(`Wins: ${timesWon}`, 250, 85)
      ctx.fillText(`Losses: ${timesLost}`, 250, 100)
      ctx.drawImage(
        playerSprite,
        player.widht * player.frameX,
        player.height * player.frameY,
        player.widht,
        player.height,
        player.x,
        player.y,
        player.widht,
        player.height
      );
      for (let i = 0; i < apples.length; i++) {
        apples[i].draw();
        apples[i].fall();
        if (getDistance(player.x, player.y, apples[i].x, apples[i].y) < 30) {
          applesCatched.push(apples[i]);
          apples.splice(i, 1);
        }
          if (apples[i].y > 400){
            alert('You lost')
            apples = [];
            applesCatched = [];
            keys = [];
            timesLost++
            for (let i = 0; i < numberOfApples; i++) {
              apples.push(new Apples());
            }
          }
          
          
      }
      
      movePlayer();
      walkingAnimation();
      checkIfWin();
      
     
    }
  }
    startAnimating(30);
  
}

function startGame(numberOfApples) {
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset")
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block"
  start(numberOfApples);
}

function reset(){

}




