/* Sen Tailor — 共通スクリプト（メニューの開閉のみ） */
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.menu-btn__label').textContent = open ? '閉じる' : 'メニュー';
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });
})();
