import BackGround from "./BackGround.js";
import DownGround from "./DownGround.js";
import Bird from "./Bird.js";
import Pipes from "./Pipes.js";
import Config from "./Config.js";
import GetReady from "./GetReady.js";
import GameOver from "./GameOver.js";
import Score from "./Score.js";
import Medal from "./Medal.js";

let sprite, backGround, downGround, bird, pipes, getReady, gameOver, score, medalWhite, medalBronze, medalSilver, medalGold;

const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

ctx.fillStyle = "#70c5ce";
ctx.fillRect(0, 0, cvs.width, cvs.height);

const soundFlap = new Audio();
soundFlap.src = "audio/sfx_flap.wav";
const soundHit = new Audio();
soundHit.src = "audio/sfx_hit.wav";
const soundPoint = new Audio();
soundPoint.src = "audio/sfx_point.wav";
const soundSwooshing = new Audio();
soundSwooshing.src = "audio/sfx_swooshing.wav";

const config = new Config();

cvs.addEventListener("click", function (evt) {
  switch (bird.current) {
    case bird.getReady:
      bird.current = bird.game;
      pipes.current = pipes.game;
      score.current = score.game;
      soundSwooshing.play();
      break;
    case bird.game:
      bird.flap();
      soundFlap.play();
      break;
    case bird.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;

      //если нажимаем на кнопку start
      if (clickX >= config.startBtn.x && clickX <= config.startBtn.x + config.startBtn.w && clickY >= config.startBtn.y && clickY <= config.startBtn.y + config.startBtn.h) {
        pipes.reset();
        bird.speedReset();
        score.reset();
        bird.current = bird.getReady;
        pipes.current = pipes.getReady;
        score.current = score.getReady;
      }

      break;
  }
});

function collisionPipes() {
  config.frames++;
  if (pipes.current !== pipes.game) return;
  if (config.frames % 100 == 0) {
    pipes.position.push({
      x: pipes.cvs.width,
      y: pipes.maxYPos * (Math.random() + 1),
    });
  }

  for (let i = 0; i < pipes.position.length; i++) {
    let p = pipes.position[i];
    p.x -= pipes.dx * 1.2;
    let bottomPipeYPos = p.y + pipes.h + pipes.gap;

    if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + pipes.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + pipes.h) {
      bird.current = bird.over;
      pipes.current = pipes.over;
      soundHit.play();
    }
    if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + pipes.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + pipes.h) {
      bird.current = bird.over;
      pipes.current = pipes.over;
      soundHit.play();
    }

    if (p.x + pipes.w <= 0) {
      pipes.position.shift();

      score.value += 1;
      soundPoint.play();
      score.best = Math.max(score.value, score.best);
      localStorage.setItem("best", score.best);
    }
  }
}

//отрисовка всех объектов
function draw() {
  backGround.draw();
  downGround.draw();
  bird.draw();

  if (bird.current == bird.getReady) {
    gameOver.clear();
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    backGround.draw();
    downGround.draw();
    bird.draw();

    getReady.draw();
  } else {
    getReady.clear();

    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    backGround.draw();

    bird.draw();
    pipes.draw();
    downGround.draw();
  }

  if (bird.current == bird.over) {
    gameOver.draw();
    if (score.value == 0) {
      medalWhite.draw();
    }
    if (score.value >= 1 && score.value <= 3) {
      medalBronze.draw();
    }
    if (score.value >= 4 && score.value <= 6) {
      medalSilver.draw();
    }
    if (score.value >= 7) {
      medalGold.draw();
    }
    score.current = score.over;
  }
  score.draw();
}

//обновление всех объектов
function update() {
  bird.update();

  if (bird.current == bird.game) {
    downGround.update();
    collisionPipes();
  }
}

//цикл
function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`));
  });
}

function loadAudio(src) {
  return new Promise((resolve, reject) => {
    const soundFlap = new Audio();
    soundFlap.src = src;
    soundFlap.onload = () => resolve(soundFlap);
    soundFlap.onerror = () => reject(new Error(`Не удалось загрузить аудио: ${src}`));
  });
}

async function startGame() {
  try {
    const sprite = await loadImage("img/sprite.png");

    backGround = new BackGround(sprite, cvs, ctx, config.bg.sX, config.bg.sY, config.bg.w, config.bg.h, config.bg.x, config.bg.y);
    downGround = new DownGround(sprite, cvs, ctx, config.fg.sX, config.fg.sY, config.fg.w, config.fg.h, config.fg.x, config.fg.y, config.fg.dx);
    bird = new Bird(sprite, cvs, ctx, config.bird.x, config.bird.y, config.bird.w, config.bird.h, config.bird.radius, config.bird.frame, config.bird.gravity, config.bird.jump, config.bird.speed, config.state.current, config.state.getReady, config.state.game, config.state.over);
    pipes = new Pipes(sprite, cvs, ctx, config.pipes.w, config.pipes.h, config.pipes.gap, config.pipes.maxYPos, config.pipes.dx, config.state.current, config.state.getReady, config.state.game, config.state.over);
    getReady = new GetReady(sprite, cvs, ctx, config.getReady.sX, config.getReady.sY, config.getReady.w, config.getReady.h, config.getReady.x, config.getReady.y);
    gameOver = new GameOver(sprite, cvs, ctx, config.gameOver.sX, config.gameOver.sY, config.gameOver.w, config.gameOver.h, config.gameOver.x, config.gameOver.y);
    score = new Score(cvs, ctx, config.state.current, config.state.getReady, config.state.game, config.state.over);
    medalWhite = new Medal(sprite, cvs, ctx, config.medalWhite.sX, config.medalWhite.sY, config.medalWhite.w, config.medalWhite.h, config.medalWhite.x, config.medalWhite.y);
    medalBronze = new Medal(sprite, cvs, ctx, config.medalBronze.sX, config.medalBronze.sY, config.medalBronze.w, config.medalBronze.h, config.medalBronze.x, config.medalBronze.y);
    medalSilver = new Medal(sprite, cvs, ctx, config.medalSilver.sX, config.medalSilver.sY, config.medalSilver.w, config.medalSilver.h, config.medalSilver.x, config.medalSilver.y);
    medalGold = new Medal(sprite, cvs, ctx, config.medalGold.sX, config.medalGold.sY, config.medalGold.w, config.medalGold.h, config.medalGold.x, config.medalGold.y);
    // Инициализация и запуск игры
    loop();
  } catch (error) {
    console.error(error);
  }
}

startGame();
