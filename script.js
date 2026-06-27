const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

// メニュー開閉
function toggleMenu() {
  nav.classList.toggle("show");
  overlay.classList.toggle("show");
}

// ボタンで開閉
menuBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// メニューリンククリック時
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // #移動を無効化

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // URLから #を消す（プロっぽい挙動）
    history.replaceState(null, "", location.pathname);

    // メニュー閉じる
    nav.classList.remove("show");
    overlay.classList.remove("show");
  });
});

// スクロール位置リセット（リロード対策）
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
