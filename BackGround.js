class BackGround {
  constructor(sprite, cvs, ctx, sX, sY, w, h, x, y) {
    this.sprite = sprite;
    this.canvas = cvs;
    this.ctx = ctx;
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }
}

export default BackGround;
