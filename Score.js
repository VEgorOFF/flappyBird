class Score {
  constructor(cvs, ctx, current, getReady, game, over) {
    this.cvs = cvs;
    this.ctx = ctx;
    this.current = current;
    this.getReady = getReady;
    this.game = game;
    this.over = over;

    this.best = parseInt(localStorage.getItem("best")) || 0;
    this.value = 0;
  }

  draw() {
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";

    if (this.current == this.game) {
      this.ctx.lineWidth = 2;
      this.ctx.font = "35px Teko";
      this.ctx.fillText(this.value, this.cvs.width / 2, 50);
      this.ctx.strokeText(this.value, this.cvs.width / 2, 50);
    } else if (this.current == this.over) {
      //счет
      this.ctx.font = "25px Teko";
      this.ctx.fillText(this.value, 225, 186);
      this.ctx.strokeText(this.value, 225, 186);
      //лучший счет
      this.ctx.fillText(this.best, 225, 228);
      this.ctx.strokeText(this.best, 225, 228);
    }
  }

  reset() {
    this.value = 0;
  }
}

export default Score;
