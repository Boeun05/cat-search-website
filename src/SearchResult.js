export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length === 0) {
      this.$searchResult.innerHTML = "검색 결과가 없어요.━ ";
      return;
    }
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
            <div class="item" data-id=${index}>
              <img src=${cat.url} data-id=${index} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.addEventListener("click", (e) => {
      if ((e.target.className = "item")) {
        this.onClick(this.data[e.target.dataset.id]);
      }
    });
  }
}
