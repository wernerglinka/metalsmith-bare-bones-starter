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

  const isHome = () => {
    if (location.pathname === "/") {
      HOME_CLASS_SELECTOR.classList.add(HOME_CLASS)
    } else {
      HOME_CLASS_SELECTOR.classList.remove(HOME_CLASS)
    }
  }

  return {
    menu,
    isHome
  }
})()

module.exports = Current
