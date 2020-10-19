'use strict';

var pageMode = 'lightified';
let goDark = document.getElementById("goDark");

goDark.onclick = function(event) {
  console.log("Go dark: isCurrentPageDarkified: ", isCurrentPageDarkified());
  isCurrentPageDarkified() ? lightify() : darkify ();
}


let darkify = function(){
  changePageMode({ setPageMode: 'darkified' });

  goDark.textContent = "You're Darks!";
  goDark.classList.add('btn-pressed');
}

let lightify = function(){
  changePageMode({ setPageMode: 'lightified' });

  goDark.textContent = "Become Darks";
  goDark.classList.remove('btn-pressed');
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

      console.log(" ------- Opening popup -------- ");

      console.log("1. setPageMode", response, response.pageMode);
      setPageMode(response.pageMode);
      console.log("2. isCurrentPageDarkified", isCurrentPageDarkified());

      console.log(" ----------------- ");

      if (isCurrentPageDarkified()) {
        goDark.classList.add('btn-pressed');
        goDark.textContent = "You're Darks!"
      }
    });
  });
}

init();
