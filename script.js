import { categories, azkar } from './azkar-data.js?v=2';

const $ = (id) => document.getElementById(id);
const els = {
  catNav: $('catNav'), listView: $('listView'), readerView: $('readerView'), backBtn: $('backBtn'),
  pageTitle: $('pageTitle'), catTitle: $('catTitle'), catProgress: $('catProgress'), zikrList: $('zikrList'),
  periodSwitch: $('periodSwitch'), rPos: $('rPos'), rTitle: $('rTitle'), rWarn: $('rWarn'), rArabic: $('rArabic'),
  rTranslit: $('rTranslit'), rFr: $('rFr'), rNote: $('rNote'), rBenefit: $('rBenefit'), tapBtn: $('tapBtn'),
  tapCount: $('tapCount'), tapTotal: $('tapTotal'), ringFill: $('ringFill'), beads: $('beads'),
  prevBtn: $('prevBtn'), nextBtn: $('nextBtn'), undoBtn: $('undoBtn'), resetOne: $('resetOne'),
  srcDialog: $('srcDialog'), srcBody: $('srcBody'), sourcesBtn: $('sourcesBtn'), toast: $('toast'),
  themeBtn: $('themeBtn'), sizeUp: $('sizeUp'), sizeDown: $('sizeDown'), resetDay: $('resetDay')
};

// ---------- Stockage (tolérant aux erreurs) ----------
const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* stockage indisponible */ } }
};
const todayKey = () => {
  const d = new Date();
  return `azkar.v2.progress.${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
let progress = store.get(todayKey(), {});
const saveProgress = () => store.set(todayKey(), progress);

// ---------- État ----------
const prefs = store.get('azkar.v2.prefs', {});
let state = {
  cat: prefs.cat || categories[0].id,
  period: prefs.period || (new Date().getHours() >= 15 ? 'soir' : 'matin'),
  index: 0,
  arSize: prefs.arSize || 1.85
};
const savePrefs = () => store.set('azkar.v2.prefs', { cat: state.cat, period: state.period, arSize: state.arSize, theme: prefs.theme });

// ---------- Thème et taille ----------
function applyTheme(theme) {
  const t = theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = t;
}
applyTheme(prefs.theme);
els.themeBtn.addEventListener('click', () => {
  prefs.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(prefs.theme); savePrefs();
});
function applySize() { document.documentElement.style.setProperty('--ar-size', `${state.arSize}rem`); }
applySize();
els.sizeUp.addEventListener('click', () => { state.arSize = Math.min(3.2, +(state.arSize + 0.15).toFixed(2)); applySize(); savePrefs(); });
els.sizeDown.addEventListener('click', () => { state.arSize = Math.max(1.2, +(state.arSize - 0.15).toFixed(2)); applySize(); savePrefs(); });

// ---------- Données dérivées ----------
const isMatinSoir = () => state.cat === 'matin_soir';
function visibleAzkar() {
  return azkar.filter((z) => {
    if (z.cat !== state.cat) return false;
    if (!isMatinSoir()) return true;
    return !z.when || z.when === 'matin-soir' || z.when === state.period;
  });
}
const progressKey = (z) => (isMatinSoir() && z.when === 'matin-soir' ? `${z.id}@${state.period}` : z.id);
const doneCount = (z) => progress[progressKey(z)] || 0;
const isDone = (z) => doneCount(z) >= z.count;
const arabicFor = (z) => (isMatinSoir() && state.period === 'soir' && z.arabicSoir ? z.arabicSoir : z.arabic);

function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => els.toast.classList.remove('show'), 1600);
}

// ---------- Catégories ----------
function renderCats() {
  els.catNav.replaceChildren(...categories.map((c) => {
    const b = document.createElement('button');
    b.className = 'cat-chip';
    b.textContent = c.label;
    b.setAttribute('aria-current', String(c.id === state.cat));
    b.addEventListener('click', () => { state.cat = c.id; state.index = 0; savePrefs(); showList(); b.scrollIntoView({ inline: 'center', block: 'nearest' }); });
    return b;
  }));
}

// ---------- Liste ----------
function renderList() {
  const cat = categories.find((c) => c.id === state.cat);
  const list = visibleAzkar();
  const done = list.filter(isDone).length;
  els.catTitle.textContent = cat.label;
  els.catProgress.textContent = done === list.length && list.length
    ? `Tout est fait aujourd'hui (${list.length} azkar).`
    : `${done} sur ${list.length} faits aujourd'hui`;
  els.periodSwitch.hidden = !isMatinSoir();
  els.periodSwitch.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.period === state.period)));

  els.zikrList.replaceChildren(...list.map((z, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.className = 'zrow' + (isDone(z) ? ' is-done' : '');
    const t = document.createElement('span'); t.className = 'zrow-title'; t.textContent = z.title;
    const ar = document.createElement('span'); ar.className = 'zrow-ar'; ar.lang = 'ar'; ar.textContent = arabicFor(z);
    const c = document.createElement('span'); c.className = 'zrow-count';
    const pill = document.createElement('span'); pill.className = 'pill';
    pill.textContent = z.count > 1 ? `${doneCount(z)}/${z.count}` : (isDone(z) ? 'fait' : '1 fois');
    pill.setAttribute('aria-label', `${doneCount(z)} sur ${z.count}`);
    c.append(pill);
    if (z.warn) { const f = document.createElement('span'); f.className = 'flag'; f.textContent = 'à lire'; f.title = 'Une remarque sur la fiabilité accompagne ce texte'; c.append(f); }
    b.append(t, c, ar);
    b.addEventListener('click', () => openReader(i));
    li.append(b);
    return li;
  }));
}

els.periodSwitch.addEventListener('click', (e) => {
  const p = e.target.closest('button')?.dataset.period;
  if (!p) return;
  state.period = p; savePrefs(); renderList();
});

// ---------- Lecteur ----------
const R = 52, CIRC = 2 * Math.PI * R;
els.ringFill.style.strokeDasharray = `${CIRC}`;

function drawBeads(z) {
  els.beads.replaceChildren();
  if (z.count < 2 || z.count > 40) return; // au-delà, l'anneau seul suffit
  const ns = 'http://www.w3.org/2000/svg';
  for (let i = 0; i < z.count; i++) {
    const a = (i / z.count) * 2 * Math.PI;
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', 60 + R * Math.cos(a)); c.setAttribute('cy', 60 + R * Math.sin(a));
    c.setAttribute('r', z.count > 20 ? 2.4 : 3.6);
    c.setAttribute('class', 'bead');
    els.beads.append(c);
  }
}

function updateCounter(z) {
  const n = Math.min(doneCount(z), z.count);
  els.tapCount.textContent = n;
  els.tapTotal.textContent = `sur ${z.count}`;
  els.ringFill.style.strokeDashoffset = `${CIRC * (1 - n / z.count)}`;
  els.beads.querySelectorAll('.bead').forEach((b, i) => b.classList.toggle('on', i < n));
  els.tapBtn.classList.toggle('complete', n >= z.count);
  els.tapBtn.setAttribute('aria-label', n >= z.count ? `Terminé : ${z.count} sur ${z.count}` : `Compter : ${n} sur ${z.count}`);
}

function setOpt(el, text) { el.textContent = text || ''; el.hidden = !text; }

function renderReader() {
  const list = visibleAzkar();
  const z = list[state.index];
  if (!z) { showList(); return; }
  const whenLabel = { matin: 'le matin', soir: 'le soir', 'matin-soir': state.period === 'soir' ? 'le soir' : 'le matin' }[z.when];
  els.rPos.textContent = `${state.index + 1} sur ${list.length}` + (z.count > 1 ? `, à répéter ${z.count} fois` : '') + (isMatinSoir() && whenLabel ? `, ${whenLabel}` : '');
  els.rTitle.textContent = z.title;
  setOpt(els.rWarn, z.warn ? `Fiabilité : ${z.warn}` : '');
  els.rArabic.textContent = arabicFor(z);
  els.rTranslit.textContent = z.translit;
  els.rFr.textContent = z.fr;
  setOpt(els.rNote, z.note);
  setOpt(els.rBenefit, z.benefit ? `Mérite rapporté : ${z.benefit}` : '');
  els.prevBtn.disabled = state.index === 0;
  els.nextBtn.disabled = state.index >= list.length - 1;
  drawBeads(z);
  updateCounter(z);
}

function count() {
  const list = visibleAzkar();
  const z = list[state.index];
  if (!z) return;
  const n = doneCount(z);
  if (n >= z.count) { if (state.index < list.length - 1) go(1); return; }
  progress[progressKey(z)] = n + 1;
  saveProgress();
  updateCounter(z);
  if (n + 1 >= z.count) {
    navigator.vibrate?.([30, 60, 30]);
    const allDone = list.every(isDone);
    toast(allDone ? 'Catégorie terminée pour aujourd\'hui.' : state.index < list.length - 1 ? 'Terminé. Touchez encore pour passer au suivant.' : 'Terminé.');
  } else {
    navigator.vibrate?.(12);
  }
}

function go(delta) {
  const len = visibleAzkar().length;
  state.index = Math.max(0, Math.min(len - 1, state.index + delta));
  renderReader();
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

els.tapBtn.addEventListener('click', count);
els.prevBtn.addEventListener('click', () => go(-1));
els.nextBtn.addEventListener('click', () => go(1));
els.undoBtn.addEventListener('click', () => {
  const z = visibleAzkar()[state.index];
  if (!z || !doneCount(z)) return;
  progress[progressKey(z)] = doneCount(z) - 1; saveProgress(); updateCounter(z);
});
els.resetOne.addEventListener('click', () => {
  const z = visibleAzkar()[state.index];
  if (!z) return;
  delete progress[progressKey(z)]; saveProgress(); updateCounter(z); toast('Compteur remis à zéro.');
});
els.resetDay.addEventListener('click', () => {
  if (els.resetDay.dataset.armed) {
    progress = {}; saveProgress(); renderList(); toast('Progression du jour effacée.');
    delete els.resetDay.dataset.armed; els.resetDay.textContent = 'Remettre la journée à zéro';
  } else {
    els.resetDay.dataset.armed = '1'; els.resetDay.textContent = 'Confirmer : tout effacer pour aujourd\'hui';
    setTimeout(() => { delete els.resetDay.dataset.armed; els.resetDay.textContent = 'Remettre la journée à zéro'; }, 4000);
  }
});

document.addEventListener('keydown', (e) => {
  if (els.readerView.hidden || els.srcDialog.open) return;
  if (e.target.closest('button') && e.target !== els.tapBtn && (e.key === ' ' || e.key === 'Enter')) return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); count(); }
  else if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
  else if (e.key === 'Escape') showList();
});

// ---------- Sources ----------
function li(html) { const l = document.createElement('li'); l.append(...html); return l; }
function link(href, text) { const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = text; return a; }
function h4(t) { const h = document.createElement('h4'); h.textContent = t; return h; }

els.sourcesBtn.addEventListener('click', () => {
  const z = visibleAzkar()[state.index];
  const parts = [];
  if (z.verified.length) {
    parts.push(h4('Numéros de hadith vérifiés'));
    const ul = document.createElement('ul');
    z.verified.forEach((v) => ul.append(li([link(v.url, v.label), document.createTextNode(' — sunnah.com')])));
    parts.push(ul);
  }
  parts.push(h4('Référence dans Hisn al-Muslim'));
  const ul2 = document.createElement('ul');
  ul2.append(li([link(z.hisnUrl, `Hisn al-Muslim n°${z.hisn}`), document.createTextNode(' (texte arabe et renvois de l\'ouvrage)')]));
  if (z.quran) ul2.append(li([document.createTextNode('Texte coranique repris de l\'édition Tanzil (texte « simple »), vérifié verset par verset.')]));
  if (z.refs.length) ul2.append(li([document.createTextNode('Recueils cités par l\'ouvrage (tome/page) : ' + z.refs.join(' ; '))]));
  parts.push(ul2);
  if (z.warn) { parts.push(h4('Remarque sur la fiabilité')); const p = document.createElement('p'); p.textContent = z.warn; parts.push(p); }
  if (z.refNote) {
    const d = document.createElement('details'); const s = document.createElement('summary'); s.textContent = 'Note de référence de l\'ouvrage (en anglais)';
    const p = document.createElement('p'); p.className = 'raw'; p.textContent = z.refNote; d.append(s, p); parts.push(d);
  }
  const p = document.createElement('p'); p.className = 'raw';
  p.textContent = 'La traduction française est une traduction du sens rédigée pour cette application ; elle ne remplace pas le texte arabe.';
  parts.push(p);
  els.srcBody.replaceChildren(...parts);
  els.srcDialog.showModal();
});

// ---------- Navigation ----------
function showList() {
  els.readerView.hidden = true; els.listView.hidden = false; els.backBtn.hidden = true;
  els.pageTitle.textContent = 'Azkar';
  renderCats(); renderList();
}
function openReader(i) {
  state.index = i;
  els.listView.hidden = true; els.readerView.hidden = false; els.backBtn.hidden = false;
  els.pageTitle.textContent = categories.find((c) => c.id === state.cat).label;
  renderReader();
  window.scrollTo(0, 0);
  els.tapBtn.focus({ preventScroll: true });
}
els.backBtn.addEventListener('click', showList);

// Nouveau jour : recharger la progression quand l'onglet redevient visible.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { progress = store.get(todayKey(), {}); els.readerView.hidden ? renderList() : renderReader(); }
});

if (!categories.some((c) => c.id === state.cat)) state.cat = categories[0].id;
showList();
