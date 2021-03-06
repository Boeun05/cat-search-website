export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 500) {
        alert(`데이터를 가져오지 못했습니다. 다시 시도해 주세요`);
      }
      throw new Error("api를 가져오는데 문제가 발생하였습니다.");
    }

    return response.json();
  } catch (e) {
    console.warn(e);
  }
};
