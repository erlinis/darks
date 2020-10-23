'use strict';

const DARK_MODE = 'darkified';
const LIGTH_MODE = 'lightified';

let pageMode = LIGTH_MODE;
let switchBtn = document.getElementById("switch");
let alwaysDark = document.getElementById("alwaysDark");

switchBtn.onclick = () => isCurrentPageDarkified() ? darkeModeOff() : darkModeOn ();

alwaysDark.onclick = (event) => {
  event.target.checked ? darkModeOn() : null;
  chrome.storage.sync.set({ alwaysDark: event.target.checked});
}

let darkModeOn = () => changePageMode({ setPageMode: DARK_MODE });

let darkeModeOff = () => changePageMode({ setPageMode: LIGTH_MODE })

let isCurrentPageDarkified = () => pageMode === DARK_MODE;

let setPageMode = (mode) => pageMode = mode;

let toggleSwitch = () => {
  switchBtn.textContent = isCurrentPageDarkified() ? "You're Darks!" : "Become Darks";
  switchBtn.classList.toggle('btn-pressed', isCurrentPageDarkified());
}

let changePageMode = (message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      setPageMode(response.pageMode);
      toggleSwitch();
    });
  });
}

let init = () => {
  changePageMode({ getInitialPageMode: 'getInitialPageMode' });

  chrome.storage.sync.get(['alwaysDark'], (data) => {
    alwaysDark.checked = (data.alwaysDark === true)
  });
}

init();
