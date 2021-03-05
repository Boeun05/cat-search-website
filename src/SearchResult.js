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
        (cat) => `
            <div class="item itemList">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
      )
      .join("");

    this.$searchResult.addEventListener("click", (e) => {
      if ((e.target.className = "item")) {
        const itemList = document.querySelectorAll(".itemList");
        let index = Array.prototype.indexOf.call(itemList, e.target.parentNode);

        this.onClick(this.data[index]);
      }
    });
  }
}
