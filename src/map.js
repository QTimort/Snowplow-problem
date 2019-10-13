const MathUtils = require('./mathutils.js');

class Map {
    constructor(size) {
        this._size = size;
        this._houses = new Float32Array(size);
        this._lastClean = new Array(size);
        this._snowPlowX = 0;
        this._min = 0;
        this._max = 0;
        this._time = 0;
        this._score = 0;
        this.initHouses();
        this.initLastClean();
    }

    reset() {
        this._snowPlowX = 0;
        this._time = 0;
        this._score = 0;
        this.initLastClean();
    }

    setCustomHouses(houses) {
        this._size = houses.length;
        this._houses = houses.sort();
        this._min = houses[0];
        this._max = houses[houses.length - 1];
        this.reset();
    }

    initHouses() {
        for (let i = 0; i < this._size; ++i) {
            this._houses[i] = MathUtils.gaussianRandom(0, 1000);
            if (this._houses[i] > this._max || i === 0) {
                this._max = this._houses[i];
            }
            if (this._houses[i] < this._min || i === 0) {
                this._min = this._houses[i];
            }
        }
        this._houses.sort();
    }

    initLastClean() {
        for (let i = 0; i < this._size; ++i) {
            this._lastClean[i] = 0;
        }
    }

    moveSnowPlow(x) {
        const prevSnowPlowX = this._snowPlowX;
        let nbCleanAtPos = 0;
        this._snowPlowX = x;
        for (let i = 0; i < this._size && this._houses[i] <= x; ++i) {
            if (this.houses[i] === x) {
                this._time += Math.abs(prevSnowPlowX - this.snowPlowX);
                if (this.lastClean[i] === 0) {
                    if (nbCleanAtPos === 0) {
                        this._score += this._time;
                    } else {
                        console.log("multiple houses (" + nbCleanAtPos + ") at " + x);
                    }
                    this.lastClean[i] = this._time;
                }
                ++nbCleanAtPos;
            }
        }
    }

    getHouseBetween(startIndex, maxValue) {
        let results = [];
        for (let i = startIndex; i < this._size && this._houses[i] <= maxValue; ++i) {
            results.push(i);
        }
        return results;
    }

    get lastClean() {
        return this._lastClean;
    }

    get min() {
        return this._min;
    }

    get max() {
        return this._max;
    }

    get time() {
        return this._time;
    }

    get size() {
        return this._size;
    }

    get snowPlowX() {
        return this._snowPlowX;
    }

    get score() {
        return this._score;
    }

    get houses() {
        return this._houses;
    }
}

module.exports = Map;

