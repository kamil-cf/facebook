const {performance, PerformanceObserver} = require("perf_hooks");
const logger = require("../src/services/logger");

module.exports = (fn) => {
    const timerified = performance.timerify(fn);

    const perf = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            console.log(entry.name, entry.duration);
            logger.debug(entries);
        });
    });

    perf.observe({entryTypes: ["measure"]});

    return timerified;
}