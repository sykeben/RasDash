/////////////////////////////////////////////
// RASDASH ABOUT PULLER (C)2019: Ben Sykes //
/////////////////////////////////////////////

// Global constants and variables.
const ROOT = location.protocol + '//' + location.host;
const API = ROOT + '/api/';
var online = true;

// Info puller.
function pullInfo() {
  if (serverOnline()) {
    // Server is online.
    
    $('#alert-offline').addClass('hidden');
    
    getData('info/version', function(data) { updateElement('app-version', data); });
    getData('sys/model', function(data) { updateElement('device-model', data.toString()); });
    getData('ram/total', function(data) { updateElement('ram-total', Math.round(parseInt(data))); });
    getData('fs/0/total', function(data) { updateElement('disk-total', Math.round(parseInt(data))); });
    
  } else {
    // Server is offline.
    
    $('#alert-offline').removeClass('hidden');
    
    updateElement('app-version', '?');
    updateElement('device-model', '?');
    updateElement('ram-total', '?');
    updateElement('disk-total', '?');
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

// Have page update every 5 seconds.
window.setInterval(pullInfo, 5000);

// Have page update upon loading.
window.onload = pullInfo;
