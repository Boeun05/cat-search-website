export default class ColorTheme {
  constructor({ $target }) {
    this.$target = $target;

    this.userColorTheme = localStorage.getItem("color-theme");
    this.osColorTheme = () => {
      console.log("osColorTheme");
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    this.getColorTheme = () => {
      console.log("getColorTheme");
      return this.userColorTheme ? this.userColorTheme : this.osColorTheme();
    };

    this.render();
  }

  render() {
    this.$target.innerHTML = `<label class="switch">
        <input type="checkbox" class = "checkbox"/>
        <span class="slider round"></span>
    </label>`;

    const $checkBox = document.querySelector(".checkbox");

    window.onload = () => {
      if (this.getColorTheme() === "dark") {
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
