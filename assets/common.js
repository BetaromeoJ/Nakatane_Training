// ============================================================
// 共通スクリプト: 中種子町情報教育部会研修会サイト
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- スプラッシュ演出 ----
  const splash = document.getElementById('splash');
  if (splash) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => splash.classList.add('show'));
    });
    setTimeout(() => splash.classList.add('hide'), 1100);
    setTimeout(() => splash.remove(), 1650);
  }

  // ---- ドロワーメニュー ----
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  if (menuBtn && drawer && overlay) {
    const openDrawer = () => { drawer.classList.remove('translate-x-full'); overlay.classList.remove('hidden'); };
    const closeDrawer = () => { drawer.classList.add('translate-x-full'); overlay.classList.add('hidden'); };
    menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  // ---- ボタンの「タップで浮き上がる」エフェクト ----
  document.querySelectorAll('.btn-tap').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('lift');
      setTimeout(() => btn.classList.remove('lift'), 260);
    });
    btn.addEventListener('touchstart', () => {
      btn.classList.add('lift');
    }, { passive: true });
    btn.addEventListener('touchend', () => {
      setTimeout(() => btn.classList.remove('lift'), 260);
    });
  });

});
