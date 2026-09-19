(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function effective() {
    if (root.dataset.theme === "dark") return "dark";
    if (root.dataset.theme === "light") return "light";
    return mq.matches ? "dark" : "light";
  }
  function refreshLabel() {
    btn.textContent = effective() === "dark" ? "Light" : "Dark";
  }
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (e) { /* storage unavailable — follow system theme */ }
  refreshLabel();

  btn.addEventListener("click", function () {
    var next = effective() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* fine */ }
    refreshLabel();
  });
  mq.addEventListener("change", refreshLabel);
})();
