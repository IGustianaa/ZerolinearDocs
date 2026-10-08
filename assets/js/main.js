// =============================================
// MftrferdinandDocs v8 — Interactions
// Dark/Light toggle. Mega-menu. Search. Progress. Translate.
// =============================================

// --- Theme toggle (dark/light) ---
(function() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    btn.classList.add('active');
  }
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      btn.classList.remove('active');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      btn.classList.add('active');
      localStorage.setItem('theme', 'light');
    }
  });
})();

// --- Translate toggle (ID/EN) ---
(function() {
  const btn = document.getElementById('translate-btn');
  if (!btn) return;
  const style = document.createElement('style');
  style.textContent = `
    .lang-en .lang-id { display: none !important; }
    .lang-en .lang-en-text { display: block !important; }
    .lang-id { display: block; }
    .lang-en-text { display: none; }
    .lang-en .lang-id-inline { display: none !important; }
    .lang-en .lang-en-inline { display: inline !important; }
    .lang-id-inline { display: inline; }
    .lang-en-inline { display: none; }
  `;
  document.head.appendChild(style);
  const saved = localStorage.getItem('translate-lang');
  if (saved === 'en') {
    document.documentElement.classList.add('lang-en');
    btn.querySelector('.lang-label').textContent = 'ID';
    btn.classList.add('active');
  }
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('lang-en');
    const isEN = document.documentElement.classList.contains('lang-en');
    btn.querySelector('.lang-label').textContent = isEN ? 'ID' : 'EN';
    btn.classList.toggle('active', isEN);
    localStorage.setItem('translate-lang', isEN ? 'en' : 'id');
  });
})();

// --- Mega-menu toggle ---
(function() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const megaMenu = document.querySelector('.mega-menu');
  const closeBtn = document.querySelector('.mega-menu-close');
  if (!menuBtn || !megaMenu) return;
  menuBtn.addEventListener('click', () => megaMenu.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => megaMenu.classList.remove('open'));
  megaMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => megaMenu.classList.remove('open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') megaMenu.classList.remove('open');
  });
})();

// --- Search overlay ---
(function() {
  const searchBtn = document.querySelector('.nav-search');
  const overlay = document.querySelector('.search-overlay');
  if (!searchBtn || !overlay) return;
  searchBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => overlay.querySelector('input')?.focus(), 100);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.add('open');
      setTimeout(() => overlay.querySelector('input')?.focus(), 100);
    }
  });
  // Simple search
  const input = overlay.querySelector('input');
  const results = overlay.querySelector('.search-results');
  if (!input || !results) return;
  const PAGES = [
    { title: 'Apa itu AI Agent', url: 'agents/what-is.html', desc: 'Definisi, karakteristik, perbedaan dengan chatbot' },
    { title: 'Arsitektur Agent', url: 'agents/architecture.html', desc: 'Memory, planning, tools, reasoning loop' },
    { title: 'Apa itu LLM', url: 'llm/what-is.html', desc: 'Transformer, training, tokenization' },
    { title: 'Vendor & Model', url: 'llm/vendors.html', desc: 'OpenAI, Anthropic, Google, Meta' },
    { title: 'Prompt Engineering', url: 'prompt/what-is.html', desc: 'Anatomi prompt, teknik, best practice' },
    { title: 'Automation', url: 'automation/what-is.html', desc: 'Workflow, tools, use cases' },
    { title: 'API Providers', url: 'api/what-is.html', desc: 'Vendor, aggregator, comparison' },
    { title: 'Coding', url: 'coding/ai-coding.html', desc: 'AI-assisted coding, tools, stack' },
    { title: 'Hermes Setup', url: 'hermes/setup.html', desc: 'Instalasi dan konfigurasi Hermes' },
    { title: '9Router', url: 'hermes/9router.html', desc: 'LLM gateway, combo, token saver' },
    { title: 'Combo & Strategy', url: 'hermes/combo.html', desc: 'Strategi rotasi, judge model' },
    { title: 'Termux Setup', url: 'hermes/termux.html', desc: 'Setup Hermes di Android Termux' },
    { title: 'Windows Setup', url: 'hermes/windows.html', desc: 'Setup Hermes di Windows WSL' },
    { title: 'Konsep SOUL', url: 'konsep/apa-itu-soul.html', desc: 'System Of Unified Logic' },
    { title: 'Filosofi', url: 'konsep/filosofi.html', desc: 'Agent sebagai asisten atau perpanjangan diri' },
    { title: 'Arsitektur Agent', url: 'konsep/arsitektur.html', desc: 'Blueprint struktur kode' },
    { title: 'Identity', url: 'pilar/identity.html', desc: 'Siapa agent. Nama, peran, owner' },
    { title: 'Communication', url: 'pilar/communication.html', desc: 'Gaya bahasa, tone, format' },
    { title: 'Capabilities', url: 'pilar/capabilities.html', desc: 'Apa yang agent bisa' },
    { title: 'Autonomy', url: 'pilar/autonomy.html', desc: 'Kapan auto, kapan konfirmasi' },
    { title: 'Boundaries', url: 'pilar/boundaries.html', desc: 'Garis merah agent' },
    { title: 'Bikin SOUL.md', url: 'praktik/soul-md.html', desc: 'Step-by-step dari nol' },
    { title: 'Setup dari Nol', url: 'tutorial/setup.html', desc: 'VPS sampai bot 24/7' },
    { title: '9Router Backend', url: 'backend/9router.html', desc: 'LLM gateway self-hosted' },
    { title: 'Pilih Infra', url: 'infra/pilih.html', desc: 'Decision tree hosting' },
    { title: 'Contoh SOUL.md', url: 'lampiran/contoh-soul.html', desc: 'Template lengkap' },
  ];
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; return; }
    const filtered = PAGES.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    results.innerHTML = filtered.map(p => `<a href="${p.url}" class="search-result"><div class="title">${p.title}</div><div class="desc">${p.desc}</div></a>`).join('') || '<div style="padding:1rem;color:var(--text-dim);">Tidak ditemukan</div>';
  });
})();

// --- Nav scroll ---
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// --- Reveal on scroll ---
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// --- Stat counter ---
(function() {
  const stats = document.querySelectorAll('.stat-num[data-count]');
  if (!stats.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 25);
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target + suffix; return; }
        el.textContent = current + suffix;
        requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(s => obs.observe(s));
})();

// --- Code copy ---
(function() {
  const blocks = document.querySelectorAll('.code-block');
  if (!blocks.length) return;
  blocks.forEach(block => {
    const btn = block.querySelector('.copy-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const code = block.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      });
    });
  });
})();

// --- Progress bar (tutorial pages) ---
(function() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;
  const fill = bar.querySelector('.progress-fill');
  if (!fill) return;
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    fill.style.width = Math.min(progress, 100) + '%';
  }, { passive: true });
})();

// --- Feedback widget ---
(function() {
  const btns = document.querySelectorAll('.feedback-btn');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const widget = btn.closest('.feedback-widget');
      if (!widget) return;
      const isYes = btn.classList.contains('yes');
      widget.innerHTML = `<p style="color: var(--text-dim);">Terima kasih atas feedback ${isYes ? 'positif' : 'negatif'} Anda!</p>`;
    });
  });
})();
