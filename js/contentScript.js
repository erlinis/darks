
chrome.runtime.onMessage.addListener(function(request){
  darkify();
});

function darkify(){
  let darkModeStyle = document.createElement('style');
  darkModeStyle.dataset.darkified = true;

  darkModeStyle.innerHTML =`
    html, img:not([src$=".svg"]), span[role='img'] {
       transition: color 500ms, background-color 500ms;
       filter: invert(95%);
    }

    video {
      filter: invert(95%);
    }
  `;

  const firstScriptTag = document.querySelector('script');
  firstScriptTag.parentNode.insertBefore(darkModeStyle, firstScriptTag);
};
