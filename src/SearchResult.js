export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";

    this.$noData = document.createElement("div");
    this.$noData.className = "NoData";
    this.$noData.innerHTML = "검색 결과가 없어요.━ ";

    $target.appendChild(this.$noData);
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.$searchResult.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        const index = e.target.dataset.id;
        console.log(e.target);
        this.onClick(this.data[index]);
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length === 0) {
      this.$noData.style.display = "block";
      window.setTimeout(() => {
        this.$noData.style.display = "none";
      }, 2000);
      return;
    }
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
            <div class="item">
              <img src=${cat.url} data-id =${index} alt=${cat.name} />
            </div>
          `
      )
      .join("");
  }
}
