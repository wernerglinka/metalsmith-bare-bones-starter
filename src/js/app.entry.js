// check for mouse activity to detect touch device
const MOUSE_OVER = "mouseover"
window.addEventListener(
  MOUSE_OVER,
  function onFirstPointer(e) {
    window.POINTER_SIZE = e.height
    document.body.classList.add("mouse-device")
    window.removeEventListener(MOUSE_OVER, onFirstPointer, false)
  },
  false
)
require("./components/slider.js")
require("./modules/current.js");
require("./modules/fetcher.js")
require("./modules/browsertab.js")
