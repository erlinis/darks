chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if (message.getInitialPageMode) {
    sendResponse({ pageMode: getInitialPageMode() });
  } else if (message.setPageMode) {
    message.setPageMode === 'darkified' ? darkify() : lightify();
    sendResponse({ pageMode: message.setPageMode });
  }
});


const DARK_MODE_STYLE_HTML = `
  html, img:not([src$=".svg"]), span[role='img'] {
    transition: color 500ms, background-color 500ms;
    filter: invert(95%);
  }

  video {
    filter: invert(95%);
  }
`;

let darkify = function (){
  console.log("ContentScript:  darkify");

  let darkModeStyle = document.createElement('style');
  darkModeStyle.dataset.darkified = true;
  darkModeStyle.innerHTML = DARK_MODE_STYLE_HTML;

  const firstScriptTag = document.querySelector('script');
  firstScriptTag.parentNode.insertBefore(darkModeStyle, firstScriptTag);
};

let lightify = function(){ darkStyle().remove(); }

let darkStyle = function(){ return document.querySelector("style[data-darkified='true']") }

let getInitialPageMode = function(){ return (darkStyle() !== null) ? 'darkified' : 'lightified'; }

