export default class InfiniteScroll {
  constructor({ addListItem }) {
    this.addListItem = addListItem;
    this.render();
  }
  render() {
    console.log("domLoaded");
    let options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const getData = () => {
      this.addListItem();
      console.log("intersected");
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        getData();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector("footer"));
  }
}
