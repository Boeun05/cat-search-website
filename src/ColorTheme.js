import { getColorTheme } from "./utils/getColorTheme.js";

export default class ColorTheme {
  constructor({ $target }) {
    this.$target = $target;

    this.render();
  }

  render() {
    this.$target.innerHTML = `<label class="switch">
        <input type="checkbox" class = "checkbox"/>
        <span class="slider round"></span>
    </label>`;

    const $checkBox = document.querySelector(".checkbox");

    window.onload = () => {
      if (getColorTheme() === "dark") {
        localStorage.setItem("color-theme", "dark");
        document.documentElement.setAttribute("color-theme", "dark");
        $checkBox.setAttribute("checked", true);
      } else {
        localStorage.setItem("color-theme", "light");
        document.documentElement.setAttribute("color-theme", "light");
      }
    };

    $checkBox.addEventListener("click", (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("color-theme", "dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.setAttribute("color-theme", "light");
        localStorage.setItem("color-theme", "light");
      }
    });
  }
}
