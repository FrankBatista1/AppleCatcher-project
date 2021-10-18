//Music and sound effects

let appleEaten = new Audio("./Sound/AppleEaten2.wav");
let soundTrack = new Audio("./Sound/02 Title.mp3");
let click = new Audio("./Sound/multimedia_rollover_017.mp3");
let loseSoundEffect = new Audio("./Sound/lose.wav");
let winSoundEffect = new Audio("./Sound/win.wav");
let winnerSoundEffect = new Audio(
  "./Sound/495005__evretro__win-video-game-sound.wav"
);
let looserSoundEffect = new Audio(
  "./Sound/533034__evretro__8-bit-game-over-sound-tune.wav"
);

//Variables

let apples = [];
let applesCatched = [];
let keys = [];
let timesLost = 0;
let timesWon = 0;

//Number of apples rendered on each difficult level

let easyMode = 8;
let normalMode = 13;
let hardMode = 16;
let imposibleMode = 1000;

//Initial number of apples (Not playing)

let numberOfApples = 0;

//Function to be trigger to start the canvas animation

function start() {
  //Canvas setup
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 400;
  canvas.widht = 400;

  //Tracks keys the player is pressing

  let player = {
    x: 130,
    y: 250,
    widht: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
  };

  //Images saved in a variable to draw on canvas

  const playerSprite = new Image();
  playerSprite.src = "./Images/adam.png";

  const applesImg = new Image();
  applesImg.src = "./Images/apple.png";

  const background = new Image();
  background.src = "./Images/Forest1.jpeg";

  //Apple class with random changes whenever created a new one and functions

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
  //Render apples (creates new apple objects with no name)

  for (let i = 0; i < numberOfApples; i++) {
    apples.push(new Apples());
  }

  //Player movement setup

  window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
    player.moving = true;
  });

  window.addEventListener("keyup", (e) => {
    delete keys[e.key];
    player.moving = false;
  });
  /*
  Sums or adds the speed variable number when key pressed
  If arrowup => y - speed && change the sprite view
  If arrowdown => y + speed && change the sprite view
  If arrowleft => x - speed && change the sprite view
  If arrowright => x + speed && change the sprite view
  */

  function movePlayer() {
    if (keys["ArrowUp"] && player.y > 220) {
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

  //Changes the spritesheet view when moving every frame 

  function walkingAnimation() {
    if (player.frameX < 3 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }

  let fpsInterval, now, then, elapsed;

  function getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.hypot(xDist, yDist);
  }

  //Win conditional function

  function checkIfWin() {
    if (timesWon === 3) {
      winner();
    } else if (applesCatched.length === numberOfApples) {
      winSoundEffect.play();
      alert("Wave passed");
      apples = [];
      applesCatched = [];
      keys = [];
      timesWon++;
      for (let i = 0; i < numberOfApples; i++) {
        apples.push(new Apples());
      }
    }
  }

  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
  }

  //Animation recursion

  function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.widht, canvas.height);
      ctx.drawImage(background, 0, 0, canvas.widht, canvas.height);
      ctx.fillText(`Waves Won: ${timesWon}`, 220, 361);
      ctx.fillText(`Waves Lost: ${timesLost}`, 220, 376);
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
          appleEaten.play();
          applesCatched.push(apples[i]);
          apples.splice(i, 1);
        }
        if (timesLost === 3) {
          looser();
        } else if (apples[i].y > 400) {
          loseSoundEffect.play();
          alert("You missed an apple");
          apples = [];
          applesCatched = [];
          keys = [];
          timesLost++;
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

/*
Functions that hides and shows views depending on button pressed

Default:
# Start view: Show
# Canvas view: Hide
# Reset view: Hide
*/

//Starts the canvas depending in what difficutly you choose

function startEasy() {
  click.play();
  soundTrack.play();
  numberOfApples = easyMode;
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block";
  start();
}
function startNormal() {
  click.play();
  soundTrack.play();
  numberOfApples = easyMode;
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block";
  start();
}
function startHard() {
  click.play();
  soundTrack.play();
  numberOfApples = hardMode;
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block";
  start();
}
function startImposible() {
  click.play();
  soundTrack.play();
  numberOfApples = imposibleMode;
  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block";
  start();
}

//Hides the canvas while setting the varibles to the default value

function reset() {
  click.play();
  soundTrack.pause();
  apples = [];
  applesCatched = [];
  keys = [];
  timesLost = 0;
  timesWon = 0;

  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  let chooseDifficulty = document.getElementById("choose-difficulty");
  let gameWinner = document.getElementById("won");
  let gameLooser = document.getElementById("lost");

  startDiv.style.display = "none";
  gameCanvas.style.display = "none";
  resetGame.style.display = "none";
  chooseDifficulty.style.display = "block";
  gameLooser.style.display = "none";
  gameWinner.style.display = "none";
}

//Render the new apples with the new level you chose

function rerenderApples(numberOfApplesRerendered) {
  click.play();
  soundTrack.play();
  numberOfApples = numberOfApplesRerendered;

  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  let chooseDifficulty = document.getElementById("choose-difficulty");
  const ctx = gameCanvas.getContext("2d");

  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  resetGame.style.display = "block";
  chooseDifficulty.style.display = "none";

  const applesImg = new Image();
  applesImg.src = "./Images/apple.png";

  class Apples {
    constructor() {
      (this.x = Math.floor(Math.random() * 250)),
        (this.y = -400),
        (this.width = 32),
        (this.height = 32);
      this.speed = Math.random() * 3.1 + 1.5;
    }
    draw() {
      ctx.drawImage(applesImg, this.x, this.y);
    }
    fall() {
      this.y += this.speed;
    }
    pushOut() {}
  }
  for (let i = 0; i < numberOfApplesRerendered; i++) {
    apples.push(new Apples());
  }
}

// Winner screen

function winner() {
  soundTrack.pause();
  winnerSoundEffect.play();
  apples = [];
  applesCatched = [];
  keys = [];
  timesLost = 0;
  timesWon = 0;

  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  let chooseDifficulty = document.getElementById("choose-difficulty");
  let gameWinner = document.getElementById("won");
  let gameLooser = document.getElementById("lost");

  startDiv.style.display = "none";
  gameCanvas.style.display = "none";
  resetGame.style.display = "none";
  chooseDifficulty.style.display = "none";
  gameLooser.style.display = "none";
  gameWinner.style.display = "block";
}

// Looser screen

function looser() {
  soundTrack.pause();
  looserSoundEffect.play();
  apples = [];
  applesCatched = [];
  keys = [];
  timesLost = 0;
  timesWon = 0;

  let startDiv = document.getElementById("start");
  let gameCanvas = document.getElementById("canvas");
  let resetGame = document.getElementById("reset");
  let chooseDifficulty = document.getElementById("choose-difficulty");
  let gameWinner = document.getElementById("won");
  let gameLooser = document.getElementById("lost");

  startDiv.style.display = "none";
  gameCanvas.style.display = "none";
  resetGame.style.display = "none";
  chooseDifficulty.style.display = "none";
  gameWinner.style.display = "none";
  gameLooser.style.display = "block";
}
