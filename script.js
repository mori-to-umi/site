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

// ===== PC版：画像スライダーの上でホイールを回したら1枚ずつピタッと切り替える機能（完全版） =====
const sliders = document.querySelectorAll('.js-slider');

sliders.forEach((slider) => {
  let isScrolling = false;

  slider.addEventListener('wheel', (e) => {
    e.preventDefault(); // 通常の縦スクロールを止める

    if (isScrolling) return;

    // 💡 Beholdの要素、または普通の子要素から最初の「カード1枚」を自動で探す
    const slideItem = slider.querySelector('behold-widget a') || 
                      slider.querySelector('behold-widget div') || 
                      (slider.firstElementChild ? slider.firstElementChild.children[0] : null);
                      
    if (!slideItem) return;
    
    // スライダーの隙間（gap）の数値をCSSから自動で取得（なければ16pxをデフォルトに）
    const style = window.getComputedStyle(slider.querySelector('behold-widget') || slider);
    const gap = parseInt(style.gap) || 16;

    // 1回分の正確な移動量を計算（カードの横幅 ＋ 隙間）
    const moveAmount = slideItem.offsetWidth + gap; 

    isScrolling = true;

    // 💡 実際にスクロールさせる対象（Beholdの内部か、slider自体か）を自動判定
    const targetScroll = slider.querySelector('behold-widget') || slider;

    if (e.deltaY > 0) {
      // 下ホイール（右へ1枚進む）
      targetScroll.scrollBy({
        left: moveAmount,
        behavior: 'smooth'
      });
    } else {
      // 上ホイール（左へ1枚戻る）
      targetScroll.scrollBy({
        left: -moveAmount,
        behavior: 'smooth'
      });
    }

    // 連打防止（0.4秒後に次のスクロールを解禁）
    setTimeout(() => {
      isScrolling = false;
    }, 400);

  }, { passive: false });
});
