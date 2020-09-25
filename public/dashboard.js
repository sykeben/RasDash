// Default gauge options.

// Dashboard gauges.
let gauges = {

    cpu: {

        load: new Gauge(document.querySelector('#cpu-load-gauge')).setOptions({ limitMax: 100 }),
        temp: new Gauge(document.querySelector('#cpu-temp-gauge')).setOptions({})

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
window.onload = periodicUpdate;