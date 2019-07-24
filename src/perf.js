const {performance, PerformanceObserver} = require("perf_hooks");

module.exports = (fn) => {
    const timerified = performance.timerify(fn);

    const perf = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log(entry.name, entry.duration);
        });
    });

    perf.observe({entryTypes: ["measure"]});

    return timerified;
}