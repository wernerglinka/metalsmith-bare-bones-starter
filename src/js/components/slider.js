class Slider extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    super();
    this.backgroundColours = ["#A0B882", "#B648F1", "#E8AD00", "#1D1D1B"]
    this.attrDataImageClicked = "data-image-clicked"
  }

  connectedCallback() {
    console.log("Custom element added to page.");
    this.thumbnailNav();
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  thumbnailNav() {
    this.querySelectorAll("nav > span").forEach((el) => {
      el.addEventListener("click", () => {
        this.switchImage(el)
      })
    })
  }

  switchImage(el) {
    const img = el.getAttribute("data-image")
    const img2x = el.getAttribute("data-image2x")
    const imgDesc = el.getAttribute("data-image-title")
    let imgClick = el.getAttribute(this.attrDataImageClicked)

    if (!imgClick || imgClick === this.backgroundColours.length) {
      imgClick = 0
    }

    imgClick++
    el.setAttribute(this.attrDataImageClicked, imgClick % this.backgroundColours.length)
    el.style.backgroundColor = this.backgroundColours[imgClick - 1]

    el.classList.add("active")

    this.querySelector("img").src = img
    this.querySelector("img").srcset = `${img2x} 2x`
    this.querySelector("h3").innerHTML = imgDesc
  }
}

customElements.define("ak-slider", Slider)
