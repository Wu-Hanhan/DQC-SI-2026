// Tab switcher. Works on .nav-btn elements with data-page="<id>".
// Pages must be <article class="page" id="page-<id>">. The active page has class "active".
(function () {
  function show(id) {
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + id);
    });
    document.querySelectorAll('.nav-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.page === id);
    });
    // jump to top of content
    var c = document.querySelector('.container');
    if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bind() {
    document.querySelectorAll('[data-page]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        show(el.dataset.page);
        try { history.replaceState(null, '', '#' + el.dataset.page); } catch (_) {}
      });
    });
    // Honour hash on load
    var h = (location.hash || '').replace('#', '');
    if (h) show(h);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
