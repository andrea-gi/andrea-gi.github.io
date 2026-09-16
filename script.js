(function initializeTheme() {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var validThemes = ['light', 'dark'];

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncToggleLabel(theme) {
    var isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  var saved = localStorage.getItem('theme');
  var initialTheme = validThemes.indexOf(saved) !== -1 ? saved : systemTheme();
  root.setAttribute('data-theme', initialTheme);
  syncToggleLabel(initialTheme);

  toggle.addEventListener('click', function () {
    var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    syncToggleLabel(nextTheme);
  });
})();

(function initializeMobileNavigation() {
  var menuToggle = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');

  function closeMenu(restoreFocus) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuToggle.focus();
  }

  menuToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') closeMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) closeMenu(true);
  });
})();

(function initializeMailtoLink() {
  var link = document.getElementById('mailto-btn');
  if (!link) return;

  var user = ['a', 'n', 'd', 'r', 'e', 'a', '-', 'g', 'i'].join('');
  var domain = ['outlook', 'com'].join('.');
  var address = user + '@' + domain;

  link.href = 'mailto:' + address + '?subject=' + encodeURIComponent('Hello!');
  link.textContent = 'Say hello';
})();
