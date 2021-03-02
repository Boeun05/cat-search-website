export const getItem = (key, defaultValue) => {
  try {
    const storedValue = window.sessionStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.log(e.message);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e.message);
  }
};
