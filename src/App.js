import ColorTheme from "./ColorTheme.js";
import SearchHistory from "./SearchHistory.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import ImageInfo from "./ImageInfo.js";
import InfiniteScroll from "./InfiniteScroll.js";
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
      searchRandom: async () => {
        const response = await this.randomSearch();
        this.setState(response.data);
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
      onClick: async (image) => {
        const response = await api.fetchInfo(image.id);
        this.imageInfo.setState({
          visible: true,
          image: response.data,
        });
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
        const response = await this.randomSearch();
        this.data = [...this.data, ...response.data];
        this.setState(this.data);
      },
    });
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
    console.log(response.data);
  }

  async randomSearch() {
    this.handleLoading(true);
    const response = await api.fetchRandomCats();
    this.handleLoading(false);
    return response;
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
