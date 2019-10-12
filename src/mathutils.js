class MathUtils {
    static gaussianRandom(mean, stdev) {
        let y1;
        let y2;
        let x1;
        let x2;
        let w;

        do {
            x1 = 2.0 * Math.random() - 1.0;
            x2 = 2.0 * Math.random() - 1.0;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;

        return mean + stdev * y1;
    }
}

module.exports = MathUtils;
