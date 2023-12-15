const Current = (() => {
  const CURRENT_CLASS = "current"
  const HOME_CLASS_SELECTOR = document.querySelector("body")
  const HOME_CLASS = "homepage"

  const menu = (currentId, getId) => {
    document.querySelectorAll(`[${getId}]`).forEach((el) => {
      // console.log(el);
      el.classList.remove(CURRENT_CLASS)
      el.querySelector("a").blur()
      if (el.getAttribute(getId) === currentId) {
        el.classList.add(CURRENT_CLASS)
      }
    })
  }

  /**
   * Toggles the home CSS class on the home class selector based on the value of isHome.
   *
   * @param {boolean} isHome
   * @returns {void}
   */
  const toggleHomeCss = (isHome) => {
    if (isHome) {
      HOME_CLASS_SELECTOR.classList.add(HOME_CLASS)
    } else {
      HOME_CLASS_SELECTOR.classList.remove(HOME_CLASS)
    }
  }

  return {
    menu,
    toggleHomeCss
  }
})()

module.exports = Current
