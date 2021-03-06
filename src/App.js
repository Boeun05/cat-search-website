import ColorTheme from "./ColorTheme.js";
import SearchHistory from "./SearchHistory.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import ImageInfo from "./ImageInfo.js";
import InfiniteScroll from "./InfiniteScroll.js";
import { api } from "./api.js";
import { getItem, setItem } from "./utils/SessionStorage.js";

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
        this.setHistory(keyword);
      },
      searchRandom: async () => {
        this.randomSearch();
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
        this.showInfo(image);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.infiniteScroll = new InfiniteScroll({
      addListItem: async () => {
        const response = await api.fetchRandomCats();
        const newData = [...this.data, ...response.data];
        this.setState(newData);
      },
    });
  }

  handleLoading(loadStatus) {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  }

  setHistory(keyword) {
    this.searches = [...this.searches, keyword];
    setItem(SEARCH_SESSION_KEY, this.searches);
    this.searchHistory.setState(this.searches);
  }

  async showInfo(image) {
    this.handleLoading(true);
    const response = await api.fetchInfo(image.id);
    response &&
      this.imageInfo.setState({
        visible: true,
        image: response.data,
      });
    this.handleLoading(false);
  }

  async doSearch(keyword) {
    this.handleLoading(true);
    const response = await api.fetchCats(keyword);
    response && this.setState(response.data);
    this.handleLoading(false);
  }

  async randomSearch() {
    this.handleLoading(true);
    const response = await api.fetchRandomCats();
    response && this.setState(response.data);
    this.handleLoading(false);
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
