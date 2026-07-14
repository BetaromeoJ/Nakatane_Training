// ============================================================
// 共通スクリプト: 中種子町情報教育部会研修会サイト
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- スプラッシュ演出 ----
  const splash = document.getElementById('splash');
  if (splash) {
    if (prefersReducedMotion) {
      splash.remove();
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => splash.classList.add('show'));
      });
      setTimeout(() => splash.classList.add('hide'), 1100);
      setTimeout(() => splash.remove(), 1650);
    }
  }

  // ---- ドロワーメニュー ----
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  if (menuBtn && drawer && overlay) {
    const openDrawer = () => {
      drawer.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    };
    const closeDrawer = () => {
      drawer.classList.add('translate-x-full');
      overlay.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
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

  // ---- ページ内スムーススクロール(通常のアンカーリンクとしても機能する) ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return; // 対象が無い場合(プレースホルダー等)は通常のリンク動作に任せる
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // ---- プロンプトのコピー機能(外部ライブラリ不使用) ----
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    const targetSel = btn.getAttribute('data-copy-target');
    const source = targetSel ? document.querySelector(targetSel) : null;
    if (!source) return;

    const defaultLabel = btn.querySelector('.copy-label');
    const liveRegion = document.getElementById('copy-announcer');

    btn.addEventListener('click', () => {
      const text = source.innerText || source.textContent || '';

      const onSuccess = () => {
        btn.classList.add('copied');
        if (defaultLabel) defaultLabel.textContent = 'コピーしました';
        if (liveRegion) liveRegion.textContent = 'プロンプトをコピーしました';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (defaultLabel) defaultLabel.textContent = 'コピー';
        }, 2000);
      };

      const fallbackCopy = () => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          onSuccess();
        } catch (err) {
          if (liveRegion) liveRegion.textContent = 'コピーに失敗しました。テキストを選択して手動でコピーしてください。';
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });

  // ---- アコーディオン ----
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('open', !expanded);
    });
  });

});
