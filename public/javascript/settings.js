/////////////////////////////////////////
// RASDASH SETTINGS (C)2019: Ben Sykes //
/////////////////////////////////////////

// Setting management.
export function getSetting(key) {
  localStorage.getItem(key.toString());
}
export function setSetting(key, value) {
  localStorage.setItem(key.toString(), value);
}
export function remSetting(key) {
  localStorage.removeItem(key.toString());
}
export function clrSettings() {
  localStorage.clear();
}

// Default loader.
export function setDefaults() {
  setSetting('fsId', '0');
  setSetting('settingsPresent', 'true');
}

// Conditional default loader.
export function setDefaultsIfNone() {
  if (getSetting('settingsPresent') != 'true') {
    setDefaults();
  }
}
