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

// ===== PC版：画像スライダーの上でホイールを回したら1枚ずつピタッと切り替える機能 =====
const sliders = document.querySelectorAll('.js-slider');

sliders.forEach((slider) => {
  let isScrolling = false; // 連続で回りすぎて超高速連打になるのを防ぐフラグ

  slider.addEventListener('wheel', (e) => {
    e.preventDefault(); // 通常の縦スクロールを止める

    // すでにアニメーション中の場合は、一瞬だけ入力を無視（操作感を安定させるため）
    if (isScrolling) return;

    // スライダー内の1枚あたりの横幅（画像＋隙間の合計値）を取得
    const slideItem = slider.querySelector('.slide-item');
    if (!slideItem) return;
    
    // 1回分の移動量を計算（画像の幅 ＋ 隣との隙間12px）
    const moveAmount = slideItem.offsetWidth + 12; 

    isScrolling = true;

    if (e.deltaY > 0) {
      // 下ホイール（右へ1枚進む）
      slider.scrollBy({
        left: moveAmount,
        behavior: 'smooth'
      });
    } else {
      // 上ホイール（左へ1枚戻る）
      slider.scrollBy({
        left: -moveAmount,
        behavior: 'smooth'
      });
    }

    // クルクルしすぎ防止：0.4秒後に次のスクロールを受け付ける
    setTimeout(() => {
      isScrolling = false;
    }, 400);

  }, { passive: false });
});
