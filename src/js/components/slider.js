const Slider = (() => {
  const backgroundColours = ["#A0B882", "#b648f1", "#E8AD00", "#1D1D1B"]
  const attrDataImageClicked = "data-image-clicked"
  // @todo: add settings with all the selectors and refactor them

  const init = () => {
    document.querySelectorAll("[data-slider]").forEach((el) => {
      _thumbnailNav(el)
    })
  }

  const _thumbnailNav = (el) => {
    const items = el.querySelectorAll("[data-image]")

    items.forEach((el) => {
      el.addEventListener("click", () => {
        _switchImage(el)
      })
    })
  }

  const _switchImage = (el) => {
    const img = el.getAttribute("data-image")
    const imgDesc = el.getAttribute("data-image-description")
    let imgClick = el.getAttribute(attrDataImageClicked)

    if (!imgClick || imgClick === backgroundColours.length) {
      imgClick = 0
    }

    imgClick++
    el.setAttribute(attrDataImageClicked, imgClick)
    el.style.backgroundColor = backgroundColours[imgClick - 1]

    el.classList.add("active")

    document.getElementById("image").src = img
    document.getElementById("imageDescription").innerHTML = imgDesc
  }

  return {
    init
  }
})()

Slider.init()

module.exports = Slider
