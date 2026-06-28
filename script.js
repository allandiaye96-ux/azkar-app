// Sélection des éléments HTML pour mettre à jour l'affichage.
const countdownValueElement = document.getElementById('countdownValue');
const cycleValueElement = document.getElementById('cycleValue');
const decrementButton = document.getElementById('decrementButton');
const resetButton = document.getElementById('resetButton');
const resetAllButton = document.getElementById('resetAllButton');
const categorySelect = document.getElementById('categorySelect');
const zikrSelect = document.getElementById('zikrSelect');
const zikrTitleElement = document.getElementById('zikrTitle');
const zikrArabicElement = document.getElementById('zikrArabic');
const zikrPhoneticElement = document.getElementById('zikrPhonetic');
const zikrTextElement = document.getElementById('zikrText');
const zikrMetaElement = document.getElementById('zikrMeta');
const zikrDetailsElement = document.getElementById('zikrDetails');
const zikrImage = document.getElementById('zikrImage');
const sourcesButton = document.getElementById('sourcesButton');
const sourcesModal = document.getElementById('sourcesModal');
const modalBody = document.getElementById('modalBody');
const modalSearch = document.getElementById('modalSearch');
const closeModal = document.getElementById('closeModal');
const totalCompletedElem = document.getElementById('totalCompleted');
const todayCountElem = document.getElementById('todayCount');
const percentCompleteElem = document.getElementById('percentComplete');

import { azkar_apres_priere, azkar_matin_soir } from './azkar-data.js';

// Construire catégories et liste unifiée à partir des données importées
const categories = [
  { id: 'apres-priere', label: 'Après la prière' },
  { id: 'matin-soir', label: 'Azkar du jour (matin et soir)' }
];

const azkar = [
  ...azkar_apres_priere.map((z) => ({
    id: z.id,
    category: 'apres-priere',
    title: z.title,
    arabic: z.arabe,
    phonetic: z.phonetique,
    text: z.traduction,
    count: `${z.compteur} fois`,
    startCount: z.compteur,
    benefit: z.bienfait || '',
    proof: z.preuve || '',
    source: z.source || '',
    image: ''
  })),
  ...azkar_matin_soir.map((z) => ({
    id: z.id,
    category: 'matin-soir',
    title: z.title,
    arabic: z.arabe,
    phonetic: z.phonetique,
    text: z.traduction,
    count: `${z.compteur} fois`,
    startCount: z.compteur,
    benefit: z.bienfait || '',
    proof: z.preuve || '',
    source: z.source || '',
    image: ''
  }))
];

let currentCategory = categories[0].id;
let currentZikr = azkar.find((z) => z.category === currentCategory) || azkar[0];
let currentValue = currentZikr.startCount; // Compteur principal.
let cycleCount = 0; // Compteur secondaire.

// Stats per zikr
let totalCompleted = 0;
let history = []; // array of ISO timestamps

// Fonction pour actualiser l'affichage des deux compteurs.
function updateDisplay() {
  countdownValueElement.textContent = currentValue;
  cycleValueElement.textContent = cycleCount;

  zikrTitleElement.textContent = currentZikr.title;
  zikrArabicElement.textContent = currentZikr.arabic;
  zikrPhoneticElement.textContent = currentZikr.phonetic;
  zikrTextElement.textContent = currentZikr.text || currentZikr.title;
  zikrMetaElement.textContent = `Compter : ${currentZikr.count}`;
  zikrDetailsElement.innerHTML = `
    <p><strong>Bienfait :</strong> ${currentZikr.benefit}</p>
    <p><strong>Source :</strong> ${currentZikr.source}</p>
  `;

  if (currentZikr.image) {
    zikrImage.src = currentZikr.image;
    zikrImage.style.display = 'block';
  } else {
    zikrImage.style.display = 'none';
  }

  // Update stats display
  totalCompletedElem.textContent = totalCompleted;
  todayCountElem.textContent = computeTodayCount();
  const pct = Math.round(((currentZikr.startCount - currentValue) / currentZikr.startCount) * 100);
  percentCompleteElem.textContent = `${Math.max(0, Math.min(100, pct))}%`;

  saveStateFor(currentZikr.id);
}

function openSources() {
  const parts = [];
  if (currentZikr.source) parts.push(`<strong>Source:</strong> ${currentZikr.source}`);
  if (currentZikr.hadith_ref) parts.push(`<strong>Référence:</strong> ${currentZikr.hadith_ref}`);
  if (currentZikr.source_url) {
    parts.push(`<div><a href="${currentZikr.source_url}" target="_blank" rel="noopener">Ouvrir la référence</a></div>`);
  }
  modalBody.innerHTML = parts.length ? parts.join('<br/>') : 'Aucune référence disponible.';
  // Prepare a web search link combining hadith ref and title
  const query = encodeURIComponent((currentZikr.hadith_ref || '') + ' ' + currentZikr.title + ' hadith');
  modalSearch.href = `https://www.google.com/search?q=${query}`;
  sourcesModal.classList.remove('hidden');
}

function closeSources() {
  sourcesModal.classList.add('hidden');
}

sourcesButton.addEventListener('click', openSources);
closeModal.addEventListener('click', closeSources);
sourcesModal.addEventListener('click', (e) => {
  if (e.target === sourcesModal) closeSources();
});

// Fonction appelée à chaque clic sur le bouton principal.
function handleDecrement() {
  // Si le compteur principal est à 0, on repart à 100 et on incrémente le deuxième compteur.
  if (currentValue <= 0) {
    currentValue = currentZikr.startCount;
    cycleCount += 1;
  } else {
    currentValue -= 1;
  }

  // record this recitation
  totalCompleted += 1;
  try { history.push(new Date().toISOString()); } catch (e) {}

  updateDisplay();
}

// Fonction appelée à chaque clic sur le bouton reset.
// On demande d'abord une confirmation pour éviter les erreurs de clic.
function handleReset() {
  const confirmReset = window.confirm(
    'Voulez-vous vraiment réinitialiser cet azkar ?'
  );

  if (!confirmReset) {
    return;
  }

  currentValue = currentZikr.startCount;
  cycleCount = 0;
  totalCompleted = 0;
  history = [];
  try { localStorage.removeItem(storageKey(currentZikr.id)); } catch (e) {}
  updateDisplay();
}

function handleResetAll() {
  const confirmResetAll = window.confirm(
    'Voulez-vous vraiment réinitialiser tous les azkar ?'
  );

  if (!confirmResetAll) {
    return;
  }

  azkar.forEach((z) => {
    try { localStorage.removeItem(storageKey(z.id)); } catch (e) {}
  });

  currentValue = currentZikr.startCount;
  cycleCount = 0;
  updateDisplay();
}

// Persistance: enregistre l'état du zikr courant dans localStorage.
function storageKey(id) {
  return `azkar_state_${id}`;
}

function saveStateFor(id) {
  const payload = { currentValue, cycleCount, totalCompleted, history };
  try {
    localStorage.setItem(storageKey(id), JSON.stringify(payload));
  } catch (e) {
    // ignore storage errors
  }
}

function loadStateFor(id) {
  try {
    const raw = localStorage.getItem(storageKey(id));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function populateCategorySelect() {
  categorySelect.innerHTML = '';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.label;
    categorySelect.appendChild(option);
  });
}

function populateZikrSelect() {
  const filtered = azkar.filter((z) => z.category === currentCategory);
  zikrSelect.innerHTML = '';
  filtered.forEach((z) => {
    const opt = document.createElement('option');
    opt.value = z.id;
    opt.textContent = z.title;
    zikrSelect.appendChild(opt);
  });

  const exists = filtered.some((z) => z.id === currentZikr.id);
  if (!exists) {
    currentZikr = filtered[0] || azkar[0];
  }
  zikrSelect.value = currentZikr.id;
}

function switchToCategory(id) {
  currentCategory = id;
  populateZikrSelect();
  switchToZikr(currentZikr.id);
}

function switchToZikr(id) {
  const filtered = azkar.filter((z) => z.category === currentCategory);
  const found = filtered.find((z) => z.id === id) || filtered[0] || azkar[0];
  if (!found) return;

  currentZikr = found;
  const state = loadStateFor(id);
  if (state && typeof state.currentValue === 'number') {
    currentValue = state.currentValue;
    cycleCount = state.cycleCount || 0;
    totalCompleted = state.totalCompleted || 0;
    history = state.history || [];
  } else {
    currentValue = currentZikr.startCount;
    cycleCount = 0;
    totalCompleted = 0;
    history = [];
  }
  updateDisplay();
}

categorySelect.addEventListener('change', (e) => {
  switchToCategory(e.target.value);
});

zikrSelect.addEventListener('change', (e) => {
  switchToZikr(e.target.value);
});

// Initialisation
populateCategorySelect();
categorySelect.value = currentCategory;
populateZikrSelect();

const initialState = loadStateFor(currentZikr.id);
if (initialState) {
  currentValue = initialState.currentValue;
  cycleCount = initialState.cycleCount || 0;
  totalCompleted = initialState.totalCompleted || 0;
  history = initialState.history || [];
}
updateDisplay();

// Mise en place des écouteurs d'événements sur les boutons.
decrementButton.addEventListener('click', handleDecrement);
resetButton.addEventListener('click', handleReset);
resetAllButton.addEventListener('click', handleResetAll);

// Affichage initial au chargement de la page.
updateDisplay();
