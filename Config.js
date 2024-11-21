class Config {
  constructor() {
    this.frames = 0;
  }

  //состояние игры
  state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
  };

  //стартовая кнопка
  startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29,
  };

  //бэкграунд
  bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: 254, //this.cvs.height - 226
  };

  //земля
  fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: 368, //cvs.height - 112

    dx: 2,
  };

  //птица
  bird = {
    animation: [
      { sX: 276, sY: 112 },
      { sX: 276, sY: 139 },
      { sX: 276, sY: 164 },
      { sX: 276, sY: 139 },
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    radius: 12,

    frame: 0,

    gravity: 0.14,
    jump: 3.0,
    speed: 0,

    degree: Math.PI / 180,
    rotation: 0,
  };

  //готовность сообщение
  getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: 320 / 2 - 173 / 2, //cvs.width
    y: 80,
  };

  //конец игры сообщение
  gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: 320 / 2 - 225 / 2, //cvs.width
    y: 90,
  };

  //трубы
  pipes = {
    position: [],

    top: {
      sX: 553,
      sY: 0,
    },

    bottom: {
      sX: 502,
      sY: 0,
    },

    w: 53,
    h: 400,
    gap: 120,
    maxYPos: -150,
    dx: 2,
  };

  medalWhite = {
    sX: 311,
    sY: 112,
    w: 45,
    h: 45,
    x: 71,
    y: 177,
  };

  medalBronze = {
    sX: 359,
    sY: 112,
    w: 45,
    h: 45,
    x: 71,
    y: 177,
  };

  medalSilver = {
    sX: 311,
    sY: 157,
    w: 45,
    h: 45,
    x: 71,
    y: 177,
  };

  medalGold = {
    sX: 359,
    sY: 157,
    w: 45,
    h: 45,
    x: 71,
    y: 177,
  };
}

export default Config;
