const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, searchRandom }) {
    const $searchInputContainer = document.createElement("div");
    $searchInputContainer.className = "SearchInputContainer";
    this.$searchInputContainer = $searchInputContainer;

    this.onSearch = onSearch;
    this.searchRandom = searchRandom;
    $target.appendChild($searchInputContainer);

    this.render();
  }
  render() {
    this.$searchInputContainer.innerHTML = `
        <input placeholder="고양이를 검색해보세요.|" class="SearchInput">
        <button class="SearchRandomImg">랜덤이미지</button>
      `;

    console.log("SearchInput created.", this);
    const $searchInput = document.querySelector(".SearchInput");
    const $searchRandomImg = document.querySelector(".SearchRandomImg");

    $searchInput.focus();
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener("click", (e) => {
      if (e.target.value.length > 0) {
        e.target.value = "";
      }
    });

    $searchRandomImg.addEventListener("click", () => {
      console.log("searchRandomImg.");
      this.searchRandom();
    });
  }
}
