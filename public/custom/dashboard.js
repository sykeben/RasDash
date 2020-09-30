// Gauge creator.
function newGauge(target, additionalOpts) {

    return new Gauge(

        document.querySelector(target)

    ).setOptions($.extend({

        pointer: { color: '#eeeeee' },
        strokeColor: '#5a5a5a'
        
    }), additionalOpts);

}

// Dashboard gauges.
let gauges = {

    cpu: {
        load: newGauge('#cpu-load-gauge'),
        temp: newGauge('#cpu-temp-gauge')
    }

};

// Dashboard updater.
function periodicUpdate() {$.getJSON('/api/get', function(data) {

    gauges.cpu.load.set(data.cpu.load);
    $('#cpu-load-label').text(data.cpu.load);

    gauges.cpu.temp.set(data.cpu.temp);
    $('#cpu-temp-label').text(data.cpu.temp);

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