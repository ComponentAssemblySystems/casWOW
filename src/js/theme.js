/* Restore the library theme before the page paints. */
(() => {
  const saved = localStorage.getItem("caswow-theme");
  const theme = saved === "dark" || saved === "light" ? saved : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.bsTheme = theme;
  document.documentElement.style.setProperty("--dashboard-background", theme === "dark" ? "var(--cas-bgColor-muted)" : "#F4F6F7");
})();
