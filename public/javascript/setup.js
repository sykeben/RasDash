//////////////////////////////////////
// RASDASH SETUP (C)2019: Ben Sykes //
//////////////////////////////////////

// Setup displayer.
function displaySetup() {
  setField('input-fsid', getSetting('fsId'));
}

// Setup saver.
function saveSetup() {
  setSetting('fsId', getField('input-fsid'));

  document.getElementById('save-status').innerHTML = 'Saved.';
}

// Field value getter.
function getField(id) {
  return document.getElementById(id).value;
}

// Field value setter.
function setField(id, data) {
  document.getElementById(id).value = data;
}

// Have browser display setup upon load.
window.onload = displaySetup;
