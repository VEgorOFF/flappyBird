import Config from "./Config.js";

const config = new Config();

const soundDie = new Audio();
soundDie.src = "/audio/sfx_die.wav";

class Bird {
  constructor(sprite, cvs, ctx, x, y, w, h, radius, frame, gravity, jump, speed, current, getReady, game, over) {
    this.frames = config.frames;
    this.degree = config.bird.degree;
    this.rotation = config.bird.rotation;

    this.sprite = sprite;
    this.cvs = cvs;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.frame = frame;
    this.gravity = gravity;
    this.jump = jump;
    this.speed = speed;

    this.current = current;
    this.getReady = getReady;
    this.game = game;
    this.over = over;

    this.animation = [
      { sX: 276, sY: 112 },
      { sX: 276, sY: 139 },
      { sX: 276, sY: 164 },
      { sX: 276, sY: 139 },
    ];
  }

  draw() {
    this.bird = this.animation[this.frame];

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);

    this.ctx.drawImage(this.sprite, this.bird.sX, this.bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

    this.ctx.restore();
  }

  flap() {
    this.speed = -this.jump;
  }

  update() {
    this.frames++;
    this.period = this.current == this.getReady ? 10 : 5;
    this.frame += this.frames % this.period == 0 ? 1 : 0;
    this.frame = this.frame % this.animation.length;

    if (this.current == this.getReady) {
      this.y = 150;
      this.rotation = 0 * this.degree;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;
      if (this.y + this.h / 2 >= this.cvs.height - config.fg.h) {
        this.y = this.cvs.height - config.fg.h - this.h / 2;

        if (this.current == this.game) {
          this.current = this.over;
          soundDie.play();
        }
      }

      if (this.speed >= this.jump) {
        this.rotation = 90 * this.degree;
        this.frame = 1;
      } else {
        this.rotation = -25 * this.degree;
      }
    }
  }

  speedReset() {
    this.speed = 0;
  }
}

export default Bird;
