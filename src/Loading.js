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
    // this.$showLoading.innerHTML = `<img src="./untitled-5.gif" alt="로딩"/>`;

    this.isLoading
      ? (this.$showLoading.style.display = "block")
      : (this.$showLoading.style.display = "none");
  }
}
