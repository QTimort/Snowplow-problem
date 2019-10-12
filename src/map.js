const MathUtils = require('./mathutils.js');

class Map {
    constructor(size) {
        this._size = size;
        this._houses = new Float32Array(size);
        this._lastClean = new Float32Array(size);
        this._snowPlowX = 0;
        this._min = 0;
        this._max = 0;
        this._time = 0;
        this.initHouses();
        this.initLastClean();
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

    moveSnowPlow(x, step) {
        this._snowPlowX = x;
        for (let i = 0; i < this._size && this._houses[i] <= x; ++i) {
            if (this.houses[i] === x) {
                this.lastClean[i] = step;
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

    get houses() {
        return this._houses;
    }
}

module.exports = Map;

