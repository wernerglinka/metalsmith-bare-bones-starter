const Current = (() => {
  const CURRENT_CLASS = "current"
  const HOME_CLASS_SELECTOR = document.body
  const HOME_CLASS = "homepage"
  const mainMenuSel = document.querySelector(".js-mainnav")

  /**
   * compares fetched url with url in menu and sets nav item current
   * before removes current state from all nav items
   */
  const menu = () => {
    const url = window.location.href;

    mainMenuSel.querySelectorAll("li").forEach((el) => {
      const link = el.querySelector("a");

      el.classList.remove(CURRENT_CLASS)
      link.blur()
      if (link.href === url) {
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
Current.menu()
module.exports = Current
