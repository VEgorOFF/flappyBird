class DownGround {
  constructor(sprite, cvs, ctx, sX, sY, w, h, x, y, dx) {
    this.sprite = sprite;
    this.cvs = cvs;
    this.ctx = ctx;
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;

    this.dx = dx;
  }

  draw() {
    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }

  update() {
    this.x = (this.x - this.dx) % (this.w / 2);
  }
}

export default DownGround;
