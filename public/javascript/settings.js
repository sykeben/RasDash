/////////////////////////////////////////
// RASDASH SETTINGS (C)2019: Ben Sykes //
/////////////////////////////////////////

// Setting management.
function getSetting(key) {
  localStorage.getItem(key);
}
function setSetting(key, value) {
  localStorage.setItem(key, value);
}
function remSetting(key) {
  localStorage.removeItem(key);
}
function clrSettings() {
  localStorage.clear();
}

// Default loader.
function setDefaults() {
  setSetting('fsId', '0');
  setSetting('settingsPresent', 'true');
}

// Setting initialization.
function initSettings() {
  if (getSetting('settingsPresent') != 'true') {
	  setDefaults();
  }
}

// Init settings upon page load.
window.onload = initSettings;
