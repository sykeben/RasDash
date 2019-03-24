/////////////////////////////////////////////////
// RASDASH DASH SCRIPT (C)2019: Benjamin Sykes //
/////////////////////////////////////////////////

// Global constants and variables.
const ROOT = location.protocol + '//' + location.host;
const API = ROOT + '/api/';
var online = true;

// Dash updater script, meant to be run periodically.
function periodicUpdate() {
  if (serverOnline()) {
    // Server is online, update dash.
    
    getData('hw/model', function(data) { updateElement('device-model', data.toString()); });
    
    $('#connection-online').removeClass('hidden');
    $('#connection-offline').addClass('hidden');
    
    getData('cpu/temp', function(data) { updateElement('cpu-temp', Math.round(parseInt(data))); });
    
    getData('cpu/usage', function(data) { updateElement('cpu-usage', Math.round(parseInt(data))); });
    
    getData('ram/usage', function(data) { updateElement('ram-usage', Math.round(parseInt(data))); });
    getData('ram/used', function(data) { updateElement('ram-used', Math.round(parseInt(data))); });
    getData('ram/total', function(data) { updateElement('ram-total', Math.round(parseInt(data))); });
    
    getData('fs/0/usage', function(data) { updateElement('disk-usage', Math.round(parseInt(data))); });
    getData('fs/0/used', function(data) { updateElement('disk-used', Math.round(parseInt(data))); });
    getData('fs/0/total', function(data) { updateElement('disk-total', Math.round(parseInt(data))); });
    
  } else {
    // Server is offline, clear dash.
    
    $('#connection-online').addClass('hidden');
    $('#connection-offline').removeClass('hidden');
    
    updateElement('cpu-temp', 0);
    updateElement('cpu-usage', 0);
    updateElement('disk-usage', 0);
    
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
    url: (API + 'online'),
    dataType: 'json',
    success: function(data) { setOnline(true); },
    error : function(data) { setOnline(false); }
  });
  return online;
}
function setOnline(value) {
  online = value;
}

// Make dash periodically update every 5 seconds.
window.setInterval(periodicUpdate, 5000);

// Have dash update upon loading.
window.onload = periodicUpdate;
