class Graph {

  constructor(canvas, map) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._width = canvas.width;
    this._width = 300;
    this._height = canvas.height;
    this._map = map;
    this._snowPlowSize = 10;
  }

  draw() {
    const step = (this._map.max - this._map.min) / this._width;
    let max = this._map.min;
    let lastIndex = 0;
    let snowplotAtX = -1;
    for (let i = 0; i < this._width; ++i) {
      max += step;
      const houses = this._map.getHouseBetween(lastIndex, max);
      this._ctx.fillStyle = "rgba(120,120,120,0.62)";
      this._ctx.fillRect(i, this._height / 2, 1, -(houses.length * 10 + 1));
      let avgTime = 0;
      for (let j = 0; j < houses.length; ++j) {
        avgTime += (this._map.lastClean[houses[j]]);
      }
      //avgTime /= houses.length;
      avgTime /= 1000;
      if (avgTime > 200) {
        avgTime = 200;
      }
      this._ctx.fillStyle = "#FF0000";
      this._ctx.fillRect(i, this._height / 2, 1, avgTime);
      if (houses.length > 0) {
        lastIndex = houses[houses.length - 1] + 1;
      }
      if (snowplotAtX < 0 && this._map.houses[lastIndex] >= this._map.snowPlowX && this._map.snowPlowX <= max) {
        snowplotAtX = i;
      }
    }
    if (snowplotAtX >= 0) {
      this._ctx.fillStyle = "rgb(0,255,11)";
      this._ctx.fillRect(snowplotAtX - this._snowPlowSize, this._height / 2 - this._snowPlowSize, 20, 20);
    }
  }

  clear() {
    this._ctx.rect(0 - this._snowPlowSize, 0, this._width + this._snowPlowSize, this._height);
    this._ctx.fillStyle = 'rgb(255, 255, 255)';
    this._ctx.fill();
  }
}

module.exports = Graph;

