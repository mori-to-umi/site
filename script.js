const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  nav.classList.remove("show");
  overlay.classList.remove("show");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    overlay.classList.remove("show");
  });
});

/* スクロール位置リセット（スマホ引っ張り対策） */
window.onload = () => {
  window.scrollTo(0, 0);
};
