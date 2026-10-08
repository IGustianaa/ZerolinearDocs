document.querySelectorAll('.copy').forEach(function (button) {
  button.addEventListener('click', async function () {
    var code = button.closest('.code').querySelector('code').innerText;
    var label = button.querySelector('span') || button;
    var isIndonesian = document.documentElement.lang === 'id';
    try {
      await navigator.clipboard.writeText(code);
      label.textContent = isIndonesian ? 'Tersalin' : 'Copied';
      button.classList.add('copied');
      setTimeout(function () {
        label.textContent = isIndonesian ? 'Salin' : 'Copy';
        button.classList.remove('copied');
      }, 1600);
    } catch (error) {
      label.textContent = isIndonesian ? 'Pilih teks' : 'Select text';
    }
  });
});

var menuButton = document.querySelector('.menu-toggle');
var backdrop = document.querySelector('.sidebar-backdrop');
var themeButton = document.querySelector('.theme-toggle');
function syncThemeButton() {
  if (!themeButton) return;
  var dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
if (themeButton) {
  themeButton.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('mfdocs-theme', next);
    syncThemeButton();
  });
  syncThemeButton();
}
function closeMenu() {
  document.body.classList.remove('menu-open');
  if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
}
if (menuButton) {
  menuButton.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
if (backdrop) backdrop.addEventListener('click', closeMenu);

var progressBar = document.querySelector('.progress i');
window.addEventListener('scroll', function () {
  var height = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (height ? scrollY / height * 100 : 0) + '%';
}, { passive: true });

var sidebarLinks = Array.from(document.querySelectorAll('.sidebar a'));
sidebarLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    sidebarLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-25% 0px -65%' });
document.querySelectorAll('main section[id]').forEach(function (section) { observer.observe(section); });
