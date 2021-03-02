export default class SearchHistory {
  // searches = null;

  constructor({ $target, searches, onSearch }) {
    const $searchHistory = document.createElement("ul");
    this.$searchHistory = $searchHistory;

    $searchHistory.className = "SearchHistory";
    $searchHistory.classList.add("clearfix");
    $target.appendChild($searchHistory);

    this.onSearch = onSearch;

    this.searches = searches;

    this.render();
  }

  setState(nextSearches) {
    this.searches = nextSearches;
    this.render();
  }

  render() {
    if (this.searches.length === 0) {
      return;
    }
    const newestSearches = this.searches.slice(-5);
    const HTMLString = `<span>최근검색어:</span>${newestSearches
      .map((keyword) => `<li>${keyword}</li>`)
      .join("")}`;
    this.$searchHistory.innerHTML = HTMLString;

    this.$searchHistory.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        this.onSearch(e.target.textContent);
      }
    });
  }
}
