'use strict';

const DARK_MODE = 'darkified';
const LIGTH_MODE = 'lightified';
const DARK_MODE_STYLE_HTML = `
  html, img:not([src$="*.svg"]), span[role='img'] {
    transition: color 500ms, background-color 500ms;
    filter: invert(98%);
  }

  video, svg {
    filter: invert(98%);
  }
`;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.getInitialPageMode) {
    sendResponse({ pageMode: getInitialPageMode() });
  } else if (message.setPageMode) {
    message.setPageMode === DARK_MODE ? darkify() : lightify();
    sendResponse({ pageMode: message.setPageMode });
  }
});

chrome.storage.sync.get(['alwaysDark'], (data) => { data.alwaysDark ? darkify() : null });

let darkify = () => {
  let darkModeStyle = document.createElement('style');
  darkModeStyle.dataset.darkified = true;
  darkModeStyle.innerHTML = DARK_MODE_STYLE_HTML;

  const firstScriptTag = document.querySelector('script');
  firstScriptTag.parentNode.insertBefore(darkModeStyle, firstScriptTag);
};

let lightify = () => darkStyle().remove();

let darkStyle = () => document.querySelector("style[data-darkified='true']");

let getInitialPageMode = () => (darkStyle() !== null) ? DARK_MODE : LIGTH_MODE;

