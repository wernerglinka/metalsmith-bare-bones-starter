const faviconSelector = document.querySelector('link[rel="shortcut icon"]')
const faviconDefault = "favicon.ico";
const faviconInverted = "favicon-inv.ico";
window.onblur = () => {
  faviconSelector.href = faviconSelector.href.replace(faviconDefault, faviconInverted)
}
window.onfocus = () => {
  faviconSelector.href = faviconSelector.href.replace(faviconInverted, faviconDefault)
}
