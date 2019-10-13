const Solver = require("./solver");
const Map = require('./map.js');
const Graph = require('./graph.js');

const reset = document.getElementById('reset');
const score = document.getElementById('score');
const customSolution = document.getElementById('customsolution');
const copyMap = document.getElementById('copymap');
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

let map = new Map(1000);
let graph = new Graph(canvas, map);
let activeSolution;
let frame;

function init() {
    map.reset();
    frame = 0;
}

function copyMapValuesToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(Array.from(map.houses))).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function isValidSolution(solution) {
    const sortedSolution = new Float32Array(solution).sort();
    if (solution.length !== map.houses.length) {
        console.error("Solution cleans too few / much houses! Expected " + map.houses.length + " houses but got " + solution.length);
        return false;
    }
    for (let i = 0; i < solution.length; ++i) {
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

reset.onclick = function() {init();};
copyMap.onclick = function() {copyMapValuesToClipboard();};
customSolution.oninput = function() {setSolution(JSON.parse(customSolution.value));};

setSolution(Solver.splitSolve(map));
animate();
