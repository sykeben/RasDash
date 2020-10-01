// Gauge creator.
function newGauge(target, additionalOpts) {
    return new Gauge(
        document.querySelector(target)
    ).setOptions($.extend(additionalOpts, {
        angle: -0.15, lineWidth: 0.25,
        pointer: {
            strokeWidth: 0.01,
            length: 0.5,
            color: "#e0e0e0"
        },
        strokeColor: "#2b2b2b"
    }));
}

// Setup temp gauge.
let cpuTempGauge = newGauge('#cpu-temp-gauge', {
    percentColors: [[0.0, "#a9d70b"], [0.85, "#f9c802"], [1.0, "#ff5511"]],
});

// Setup load gauge.
let cpuLoadGauge = newGauge('#cpu-load-gauge', {
    percentColors: [[0.0, "#00ff00"], [0.0, "#31e342"], [0.5, "#a9d70b"], [0.85, "#f9c802"], [1.0, "#ff0000"]]
});

// Dashboard updater.
function periodicUpdate() {$.getJSON('/api/get', function(data) {

    cpuTempGauge.set(data.cpu.temp);
    $('#cpu-temp-label').text(data.cpu.temp);
    $('#cpu-temp-units').text(data.units.temp);

    cpuLoadGauge.set(data.cpu.load);
    $('#cpu-load-label').text(data.cpu.load);

})};

// Async interval function.
const setIntervalAsync = (fn, ms) => {
    fn().then(() => {
        setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
};

// Async delay function.
const delay = deplayMs => new Promise((resolve) => {
    setTimeout(resolve, deplayMs);
});

setIntervalAsync(async () => {
    periodicUpdate();
    await delay(1500);
}, 1500);

// Start upon load.
window.onload = function() {

    periodicUpdate();

}