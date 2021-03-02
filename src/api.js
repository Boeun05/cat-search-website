const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("api를 가져오는데 문제가 발생하였습니다.");
    }
    return response.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  fetchCats: (keyword) =>
    request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`),
  fetchInfo: (id) => request(`${API_ENDPOINT}/api/cats/${id}`),
};
