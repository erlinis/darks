'use strict';

let goDark = document.getElementById("goDark");

goDark.onclick = function(element) {
  sendMessageToMainPage('darkify');

  goDark.textContent = "You are Darks!"
  goDark.classList.add('btn-pressed');
}

let sendMessageToMainPage = function(message){
  // Query all tabs opened in the browser
  chrome.tabs.query({ active: true, currentWindow: true},
    function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message)
    }
  );
}
