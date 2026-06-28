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
    e.preventDefault(); 

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      // ヘッダーの高さ(70px)を考慮してスクロール位置を計算
      const headerHeight = 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }

    // URLから #を消す
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

// ===== PC版：画像スライダーの上でマウスホイールを回したら横スクロールさせる機能 =====
const sliders = document.querySelectorAll('.js-slider');

sliders.forEach((slider) => {
  slider.addEventListener('wheel', (e) => {
    // タッチパッドなどの誤作動を防ぐため、PCの通常スクロール（縦スクロールの動き）を横スクロールに変換
    if (e.deltaY !== 0) {
      e.preventDefault(); // 通常のブラウザの縦スクロールを止める
      slider.scrollLeft += e.deltaY; // ホイールの回転量（上下）の分だけ、左右にスクロールさせる
    }
  }, { passive: false }); // preventDefaultを効かせるためのお守り
});

