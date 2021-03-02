export default class Loading {
  constructor({ $target, isLoading }) {
    const $showLoading = document.createElement("div");
    $showLoading.className = "Loading";
    this.$showLoading = $showLoading;

    $target.appendChild(this.$showLoading);

    this.isLoading = isLoading;

    this.render();
  }

  setState(nextLoading) {
    this.isLoading = nextLoading;
    this.render();
  }

  render() {
    const HTMLString = "Loading...";
    this.$showLoading.innerHTML = HTMLString;

    this.isLoading
      ? (this.$showLoading.style.display = "block")
      : (this.$showLoading.style.display = "none");
  }
}
