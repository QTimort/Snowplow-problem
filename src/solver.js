class Solver {
    static stupidSolve(map) {
        const houses = map.houses;
        let steps = [];
        for (let i = 0; i < houses.length; ++i) {
            steps.push(houses[i]);
        }
        return steps;
    }

    static greedySolve(map) {
        const list = Array.from(map.houses);
        let newList = [];
        let snowplowPos = 0;
        let closestPos = list[0];
        let closestIndex = 0;

        while (list.length > 0) {
            closestPos = list[0];
            closestIndex = 0;
            for (let i = 0; i< list.length; ++i) {
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
        return (newList)
    }
}

module.exports = Solver;
