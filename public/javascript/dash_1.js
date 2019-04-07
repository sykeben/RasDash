/////////////////////////////////////////////////
// RASDASH DASH SCRIPT (C)2019: Benjamin Sykes //
/////////////////////////////////////////////////

// Global constants and variables.
const ROOT = location.protocol + '//' + location.host;
const API = ROOT + '/api/';
var online = true;
var updateCount = 0;

var uptimeInterval = undefined;

function toHHMMSS(sec) {
  var hours   = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - (hours * 3600)) / 60);
  var seconds = sec - (hours * 3600) - (minutes * 60);

  if(hours < 10) {
    hours = "0" + hours;
  }
  if(minutes < 10) {
    minutes = "0" + minutes;
  }
  if(seconds < 10) {
    seconds = "0" + seconds;
  }

  return hours + ':' + minutes + ':' + seconds;
}

function initUptimeInterval(sec) {
  if(uptimeInterval) {
    window.clearInterval(uptimeInterval);
  }

  var seconds = Math.round(parseInt(sec));
  
  uptimeInterval = setInterval(function() {
      updateElement('server-uptime', toHHMMSS(seconds));
      seconds++;
  }, 1000);
}

// Dash updater script, meant to be run periodically.
function periodicUpdate() {
  // Increment update counter.
  updateCount += 1;
  
  // If the page has been loaded recently, initialize.
  if (updateCount < 3) {
    getData('sys/model', function(data) { updateElement('device-model', data.toString()); });
    getData('sys/os', function(data) { updateElement('device-os', data.toString()); });
  }
  
  if (serverOnline()) {
    // Server is online, update dash.
    
    $('#connection-online').removeClass('hidden');
    $('#connection-offline').addClass('hidden');

    if(!uptimeInterval) {
      getData('uptime', function(data) { initUptimeInterval(data); });
    }

  } else {
    // Server is offline, clear dash.
    
    $('#connection-online').addClass('hidden');
    $('#connection-offline').removeClass('hidden');

    window.clearInterval(uptimeInterval);
    uptimeInterval = undefined;
    updateElement('server-uptime', '00:00:00');

  }
}

// Element updater.
function updateElement(id, content) {
  document.getElementById(id).innerHTML = content.toString();
}

// API data getter.
function getData(source, success) {
  $.getJSON(API + source, function(data) { success(data); });
}

// Server status checker.
function serverOnline() {
  $.ajax({
    url: (API + 'info/online'),
    dataType: 'json',
    success: function(data) { setOnline(true); },
    error : function(data) { setOnline(false); }
  });
  return online;
}
function setOnline(value) {
  online = value;
}

// Have dash update every second after finishing.
const setIntervalAsync = (fn, ms) => {
  fn().then(() => {
    setTimeout(() => setIntervalAsync(fn, ms), ms);
  });
};

const delay = deplayMs => new Promise((resolve) => {
    setTimeout(resolve, deplayMs);
});

setIntervalAsync(async () => { periodicUpdate(); await delay(1000); }, 1000);

// Make dash update upon load.
window.onload = periodicUpdate;