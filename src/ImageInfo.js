export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <h2 class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </h2>
            <img src="${url}" alt="${name}"/>        
            <ul class="description">
              <li>성격: ${temperament}</li>
              <li>태생: ${origin}</li>
            </ul>
          </div>`;
      this.$imageInfo.style.display = "block";

      const $closeButton = document.querySelector(".close");
      $closeButton.addEventListener("click", () => {
        this.$imageInfo.style.display = "none";
      });

      document.addEventListener("click", (e) => {
        if (e.target === document.querySelector(".ImageInfo")) {
          this.$imageInfo.style.display = "none";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          this.$imageInfo.style.display = "none";
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
