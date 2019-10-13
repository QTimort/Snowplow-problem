const Solver = require("./solver");
const Map = require('./map.js');
const Graph = require('./graph.js');

const reset = document.getElementById('reset');
const score = document.getElementById('score');
const customSolution = document.getElementById('customsolution');
const houses = document.getElementById('houses');
const solutionToUse = document.getElementById('solutionId');
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const solutions = {
    "greedy": Solver.greedySolve,
    "split": Solver.splitSolve,
    "stupid": Solver.stupidSolve,
    "custom": useCustomSolution,
};
let map = new Map(1000);
let graph = new Graph(canvas, map);
let activeSolution;
let activeSolutionName;
let frame;

function init() {
    map.reset();
    frame = 0;
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

function changeSolution(solutionId) {
    let s = solutions[solutionId](map);
    if (isValidSolution(s)) {
        activeSolution = s;
        activeSolutionName = solutionId;
        init();
    }
}

function useCustomSolution(map) {
    setSolution(JSON.parse(customSolution.value));
}

reset.onclick = function() {init();};
customSolution.oninput = function() {if (activeSolutionName === 'custom') {useCustomSolution(); init()}};
houses.oninput = function() {map.setCustomHouses(Float32Array.from(JSON.parse(houses.value))); init()};
houses.value = JSON.stringify(Array.from(map.houses));
solutionToUse.onchange = function() {changeSolution(solutionToUse.options[solutionToUse.selectedIndex].value)};

for (let solutionsKey in solutions) {
    let opt = document.createElement("option");
    opt.value = solutionsKey;
    opt.text = solutionsKey;
    solutionToUse.add(opt);
}

solutionToUse.value = 'greedy';
solutionToUse.onchange(null);

init();
animate();
