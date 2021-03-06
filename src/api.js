import { request } from "./utils/Request.js";

const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: (keyword) =>
    request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`),
  fetchInfo: (id) => request(`${API_ENDPOINT}/api/cats/${id}`),
  fetchRandomCats: () => request(`${API_ENDPOINT}/api/cats/random50`),
};
