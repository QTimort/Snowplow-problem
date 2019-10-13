/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Solver = __webpack_require__(/*! ./solver */ "./src/solver.js");
var Map = __webpack_require__(/*! ./map.js */ "./src/map.js");
var Graph = __webpack_require__(/*! ./graph.js */ "./src/graph.js");

var reset = document.getElementById('reset');
var score = document.getElementById('score');
var customSolution = document.getElementById('customsolution');
var houses = document.getElementById('houses');
var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var map = new Map(1000);
var graph = new Graph(canvas, map);
var activeSolution = void 0;
var frame = void 0;

function init() {
    map.reset();
    frame = 0;
}

function isValidSolution(solution) {
    var sortedSolution = new Float32Array(solution).sort();
    if (solution.length !== map.houses.length) {
        console.error("Solution cleans too few / much houses! Expected " + map.houses.length + " houses but got " + solution.length);
        return false;
    }
    for (var i = 0; i < solution.length; ++i) {
        if (map.houses[i] !== sortedSolution[i]) {
            console.error("Solution does not clean house at " + map.houses[i]);
            return false;
        }
    }
    return true;
}

function setSolution(solution) {
    if (isValidSolution(solution)) {
        activeSolution = solution;
        init();
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (activeSolution === undefined || activeSolution === null) {
        return;
    }
    map.moveSnowPlow(activeSolution[frame]);
    graph.clear();
    graph.draw();
    if (frame < activeSolution.length) {
        ++frame;
    }
    score.value = Math.round(map.score);
}

reset.onclick = function () {
    init();
};
customSolution.oninput = function () {
    setSolution(JSON.parse(customSolution.value));
};

houses.value = JSON.stringify(Array.from(map.houses));
setSolution(Solver.splitSolve(map));
animate();

/***/ }),

/***/ "./src/graph.js":
/*!**********************!*\
  !*** ./src/graph.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph(canvas, map) {
    _classCallCheck(this, Graph);

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._width = canvas.width;
    this._width = 300;
    this._height = canvas.height;
    this._map = map;
    this._snowPlowSize = 10;
  }

  _createClass(Graph, [{
    key: "draw",
    value: function draw() {
      var step = (this._map.max - this._map.min) / this._width;
      var max = this._map.min;
      var lastIndex = 0;
      var snowplotAtX = -1;
      for (var i = 0; i < this._width; ++i) {
        max += step;
        var houses = this._map.getHouseBetween(lastIndex, max);
        this._ctx.fillStyle = "rgba(120,120,120,0.62)";
        this._ctx.fillRect(i, this._height / 2, 1, -(houses.length * 10 + 1));
        var avgTime = 0;
        for (var j = 0; j < houses.length; ++j) {
          avgTime += this._map.lastClean[houses[j]];
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
  }, {
    key: "clear",
    value: function clear() {
      this._ctx.rect(0 - this._snowPlowSize, 0, this._width + this._snowPlowSize, this._height);
      this._ctx.fillStyle = 'rgb(255, 255, 255)';
      this._ctx.fill();
    }
  }]);

  return Graph;
}();

module.exports = Graph;

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtils = __webpack_require__(/*! ./mathutils.js */ "./src/mathutils.js");

var Map = function () {
    function Map(size) {
        _classCallCheck(this, Map);

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

    _createClass(Map, [{
        key: 'reset',
        value: function reset() {
            this._snowPlowX = 0;
            this._time = 0;
            this._score = 0;
            this.initLastClean();
        }
    }, {
        key: 'initHouses',
        value: function initHouses() {
            for (var i = 0; i < this._size; ++i) {
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
    }, {
        key: 'initLastClean',
        value: function initLastClean() {
            for (var i = 0; i < this._size; ++i) {
                this._lastClean[i] = 0;
            }
        }
    }, {
        key: 'moveSnowPlow',
        value: function moveSnowPlow(x) {
            var prevSnowPlowX = this._snowPlowX;
            this._snowPlowX = x;
            for (var i = 0; i < this._size && this._houses[i] <= x; ++i) {
                if (this.houses[i] === x) {
                    this._time += Math.abs(prevSnowPlowX - this.snowPlowX);
                    if (this.lastClean[i] === 0) {
                        this._score += this._time;
                        this.lastClean[i] = this._time;
                    }
                }
            }
        }
    }, {
        key: 'getHouseBetween',
        value: function getHouseBetween(startIndex, maxValue) {
            var results = [];
            for (var i = startIndex; i < this._size && this._houses[i] <= maxValue; ++i) {
                results.push(i);
            }
            return results;
        }
    }, {
        key: 'lastClean',
        get: function get() {
            return this._lastClean;
        }
    }, {
        key: 'min',
        get: function get() {
            return this._min;
        }
    }, {
        key: 'max',
        get: function get() {
            return this._max;
        }
    }, {
        key: 'time',
        get: function get() {
            return this._time;
        }
    }, {
        key: 'size',
        get: function get() {
            return this._size;
        }
    }, {
        key: 'snowPlowX',
        get: function get() {
            return this._snowPlowX;
        }
    }, {
        key: 'score',
        get: function get() {
            return this._score;
        }
    }, {
        key: 'houses',
        get: function get() {
            return this._houses;
        }
    }]);

    return Map;
}();

module.exports = Map;

/***/ }),

/***/ "./src/mathutils.js":
/*!**************************!*\
  !*** ./src/mathutils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtils = function () {
    function MathUtils() {
        _classCallCheck(this, MathUtils);
    }

    _createClass(MathUtils, null, [{
        key: "gaussianRandom",
        value: function gaussianRandom(mean, stdev) {
            var y1 = void 0;
            var y2 = void 0;
            var x1 = void 0;
            var x2 = void 0;
            var w = void 0;

            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);
            w = Math.sqrt(-2.0 * Math.log(w) / w);
            y1 = x1 * w;
            y2 = x2 * w;

            return mean + stdev * y1;
        }
    }]);

    return MathUtils;
}();

module.exports = MathUtils;

/***/ }),

/***/ "./src/solver.js":
/*!***********************!*\
  !*** ./src/solver.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Solver = function () {
    function Solver() {
        _classCallCheck(this, Solver);
    }

    _createClass(Solver, null, [{
        key: "stupidSolve",
        value: function stupidSolve(map) {
            var houses = map.houses;
            var steps = [];
            for (var i = 0; i < houses.length; ++i) {
                steps.push(houses[i]);
            }
            return steps;
        }
    }, {
        key: "fillInterval",
        value: function fillInterval(arr, houses, begin, end) {
            if (begin > end) {
                for (var i = begin; i >= end; --i) {
                    arr.push(houses[i]);
                }
            } else {
                for (var _i = begin; _i <= end; ++_i) {
                    arr.push(houses[_i]);
                }
            }
        }
    }, {
        key: "splitSolve",
        value: function splitSolve(map) {
            var houses = map.houses;
            var steps = [];
            // todo make it not hard coded
            Solver.fillInterval(steps, houses, 500, 700);
            Solver.fillInterval(steps, houses, 499, 300);
            Solver.fillInterval(steps, houses, 701, 800);
            Solver.fillInterval(steps, houses, 299, 100);
            Solver.fillInterval(steps, houses, 801, 999);
            Solver.fillInterval(steps, houses, 99, 0);
            return steps;
        }
    }, {
        key: "greedySolve",
        value: function greedySolve(map) {
            var list = Array.from(map.houses);
            var newList = [];
            var snowplowPos = 0;
            var closestPos = list[0];
            var closestIndex = 0;

            while (list.length > 0) {
                closestPos = list[0];
                closestIndex = 0;
                for (var i = 0; i < list.length; ++i) {
                    if (Math.abs(closestPos - snowplowPos) > Math.abs(list[i] - snowplowPos)) {
                        closestPos = list[i];
                        closestIndex = i;
                    }
                    ++i;
                }
                snowplowPos = closestPos;
                newList.push(list[closestIndex]);
                list.splice(closestIndex, 1);
            }
            return newList;
        }
    }]);

    return Solver;
}();

module.exports = Solver;

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map