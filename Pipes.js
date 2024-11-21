import Config from "./Config.js";

const config = new Config();

class Pipes {
  constructor(sprite, cvs, ctx, w, h, gap, maxYPos, dx, current, getReady, game, over) {
    this.frames = config.frames;

    this.sprite = sprite;
    this.cvs = cvs;
    this.ctx = ctx;
    this.position = [];
    this.top = {
      sX: 553,
      sY: 0,
    };
    this.bottom = {
      sX: 502,
      sY: 0,
    };

    this.w = w;
    this.h = h;
    this.gap = gap;
    this.maxYPos = maxYPos;
    this.dx = dx;

    this.current = current;
    this.getReady = getReady;
    this.game = game;
    this.over = over;
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;
      this.ctx.drawImage(this.sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
      this.ctx.drawImage(this.sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  }

  reset() {
    this.position = [];
  }
}

export default Pipes;
