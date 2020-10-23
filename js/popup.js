'use strict';

var pageMode = 'lightified';
let goDark = document.getElementById("goDark");
let alwaysDark = document.getElementById("alwaysDark");

goDark.onclick = function(event) {
  console.log("[Popup] Go dark: isCurrentPageDarkified: ", isCurrentPageDarkified());
  isCurrentPageDarkified() ? lightify() : darkify ();
}

alwaysDark.onclick = function(event) {
  event.target.checked ? darkify() : null;
  chrome.storage.sync.set({ alwaysDark: event.target.checked});
}

let darkify = function(){
  changePageMode({ setPageMode: 'darkified' });
  turnDarkModeOn();
}

let lightify = function(){
  changePageMode({ setPageMode: 'lightified' });

  goDark.textContent = "Become Darks";
  goDark.classList.remove('btn-pressed');
}

let turnDarkModeOn = function(){
  goDark.textContent = "You're Darks!";
  goDark.classList.add('btn-pressed');
}

let isCurrentPageDarkified = () => { return (pageMode === 'darkified'); }

let setPageMode = (mode) => { pageMode = mode; }

let changePageMode = function(message){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      setPageMode(response.pageMode);
    });
  });
}

let init = function(){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {getInitialPageMode: 'getInitialPageMode'},function(response) {
      setPageMode(response.pageMode);
      isCurrentPageDarkified() ? turnDarkModeOn() : null;
    });
  });

  chrome.storage.sync.get(['alwaysDark'], function(data) {
    alwaysDark.checked = (data.alwaysDark === true)
  });
}

init();
