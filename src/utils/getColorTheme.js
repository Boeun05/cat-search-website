const userColorTheme = localStorage.getItem("color-theme");
const osColorTheme = () => {
  console.log("osColorTheme");
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getColorTheme = () => {
  console.log("getColorTheme");
  return userColorTheme ? userColorTheme : osColorTheme();
};
