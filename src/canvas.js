const Solver = require("./solver");
const Map = require('./map.js');
const Graph = require('./graph.js');

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const map = new Map(1000);
const graph = new Graph(canvas, map);
const solution = Solver.greedySolve(map);
let frame = 0;

function animate() {
    requestAnimationFrame(animate);
    map.moveSnowPlow(solution[frame % solution.length], frame);
    graph.clear();
    graph.draw(frame);
    ++frame;
}

animate();
