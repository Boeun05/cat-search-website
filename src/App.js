import ColorTheme from "./ColorTheme.js";
import SearchHistory from "./SearchHistory.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import ImageInfo from "./ImageInfo.js";
import { api } from "./api.js";
import { getItem, setItem } from "./SessionStorage.js";

console.log("app is running!");

const SEARCH_SESSION_KEY = "searches";
export default class App {
  $target = null;
  data = [];
  searches = [];

  constructor($target) {
    this.$target = $target;
    this.isLoading = false;
    this.searches = getItem(SEARCH_SESSION_KEY, []);

    this.colorTheme = new ColorTheme({ $target });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.doSearch(keyword);
        this.createHistory(keyword);
        setItem(SEARCH_SESSION_KEY, this.searches);
        this.searchHistory.setState(this.searches);
      },
    });

    this.searchHistory = new SearchHistory({
      $target,
      searches: this.searches,
      onSearch: (keyword) => {
        this.doSearch(keyword);
      },
    });

    this.loading = new Loading({
      $target,
      isLoading: this.isLoading,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        api.fetchInfo(image.id).then((info) =>
          this.imageInfo.setState({
            visible: true,
            image: info.data,
          })
        );
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
    console.log(this.isLoading);
  }

  handleLoading(loadStatus) {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  }

  async doSearch(keyword) {
    this.handleLoading(true);
    const response = await api.fetchCats(keyword);
    this.setState(response.data);
    this.handleLoading(false);
  }

  createHistory(keyword) {
    this.searches = [...this.searches, keyword];
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
