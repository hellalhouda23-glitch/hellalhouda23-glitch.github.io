// ============ Zakat Calculator App ============

// Constants for Hanafi madhab
const ZAKAT_RATE = 0.025; // 2.5%
const NISAB_GOLD_GRAMS = 85; // grams of gold for Nisab
const NISAB_SILVER_GRAMS = 595; // grams of silver for Nisab

// Currency symbols and default approximate prices (in local currency per gram)
// These are approximate - user should update with local market prices
const CURRENCIES = {
  DZD: { symbol: 'دج', goldApprox: 15000, silverApprox: 180 },
  SAR: { symbol: 'ر.س', goldApprox: 320, silverApprox: 4 },
  AED: { symbol: 'د.إ', goldApprox: 310, silverApprox: 4 },
  EGP: { symbol: 'ج.م', goldApprox: 4500, silverApprox: 55 },
  MAD: { symbol: 'د.م', goldApprox: 950, silverApprox: 12 },
  TND: { symbol: 'د.ت', goldApprox: 360, silverApprox: 4 },
  USD: { symbol: '$', goldApprox: 85, silverApprox: 1 },
  EUR: { symbol: '€', goldApprox: 78, silverApprox: 0.95 },
  GBP: { symbol: '£', goldApprox: 67, silverApprox: 0.82 }
};

// Translation strings
const I18N = {
  ar: {
    appTitle: 'زكاتي',
    appTagline: 'حاسبة الزكاة الذكية',
    settingsTitle: 'الإعدادات الأساسية',
    currencyLabel: 'العملة',
    metalsTitle: 'أسعار المعادن اليوم',
    goldPriceLabel: 'سعر جرام الذهب',
    goldPricePlaceholder: 'مثال: 8500',
    silverPriceLabel: 'سعر جرام الفضة (اختياري)',
    silverPricePlaceholder: 'مثال: 95',
    useDefaultPrices: '⚡ استخدام أسعار تقريبية',
    metalsHint: '💡 يمكنك تعديل الأسعار حسب السوق المحلي. النصاب يحسب بأقل قيمة بين الذهب والفضة.',
    wealthTitle: 'الثروة التي تملكها لمدة حول',
    cashLabel: 'النقود (في البنك، في البيت)',
    goldGramsLabel: 'الذهب (بالجرامات)',
    silverGramsLabel: 'الفضة (بالجرامات)',
    investmentsLabel: 'الاستثمارات / الأسهم',
    debtsLabel: 'الديون المستحقة عليك (اختياري)',
    debtsHint: '💡 الديون المؤجلة (قروض، فواتير) تُخصم من الثروة قبل حساب الزكاة.',
    gram: 'جرام',
    zero: '0',
    calculateBtn: 'احسب الزكاة',
    resultTitle: 'نتيجة الحساب',
    totalWealth: 'إجمالي الثروة',
    nisabThreshold: 'نصاب الزكاة',
    zakatDue: 'الزكاة المستحقة (2.5%)',
    belowNisab: 'لم يبلغ النصاب',
    saveBtn: 'حفظ',
    shareBtn: 'مشاركة',
    resetBtn: 'جديد',
    disclaimer: '⚠️ هذه الأداة مساعدة فقط. يُرجى التحقق من أهل العلم.',
    historyTitle: 'سجل الحسابات',
    clearAll: 'مسح الكل',
    emptyHistory: 'لا توجد حسابات محفوظة',
    emptyHistorySub: 'ابدئي بحساب زكاتك من شاشة الحاسبة',
    confirmClear: 'هل أنت متأكدة من حذف كل السجل؟',
    confirmDelete: 'حذف هذا الحساب؟',
    saved: 'تم الحفظ في السجل',
    deleted: 'تم الحذف',
    cleared: 'تم مسح السجل',
    copied: 'تم النسخ',
    shared: 'تمت المشاركة',
    invalidInput: 'الرجاء إدخال البيانات الأساسية',
    navCalculator: 'الحاسبة',
    navHistory: 'السجل',
    navAbout: 'معلومات',
    aboutTitle: 'عن تطبيق زكاتي',
    aboutP1: 'تطبيق <strong>زكاتي</strong> يساعدك على حساب زكاتك بدقة وسهولة وفقاً لأحكام الشريعة الإسلامية، اعتماداً على المذهب الحنفي (الأكثر اتباعاً).',
    aboutP2: 'كل الحسابات تتم على جهازك فقط — لا نجمع أي بيانات شخصية.',
    featuresTitle: 'المميزات',
    feature1: '✅ حساب زكاة المال والذهب والفضة',
    feature2: '✅ يدعم 9 عملات مختلفة',
    feature3: '✅ يعمل بدون إنترنت',
    feature4: '✅ يحفظ سجل حساباتك محلياً',
    feature5: '✅ سهل الاستخدام بتصميم بسيط',
    howToTitle: 'كيفية الحساب',
    howTo1: 'أدخلي سعر جرام الذهب الحالي في بلدك',
    howTo2: 'أدخلي المبلغ الذي تملكينه لمدة حول (سنة قمرية)',
    howTo3: 'خصصي الديون المؤجلة (اختياري)',
    howTo4: 'اضغطي "احسب الزكاة" لمعرفة المبلغ المستحق',
    madhabTitle: 'المنهج الفقهي',
    madhabP: 'التطبيق يعتمد على <strong>المذهب الحنفي</strong>، وهو المذهب الأكثر انتشاراً. النصاب 85 جراماً من الذهب الخالص، ومقدار الزكاة 2.5% من الثروة التي تجاوزت النصاب.',
    disclaimerTitle: 'تنبيه مهم',
    disclaimerP: 'هذا التطبيق أداة مساعدة تقريبية. للتباين في المسائل الفقهية، يُرجى استشارة أهل العلم المتخصصين.',
    successIcon: '✅',
    infoIcon: 'ℹ️',
    wealthBreakdown: 'تفصيل الثروة:',
    totalLabel: 'المجموع:',
    cashBreakdown: 'نقد',
    goldBreakdown: 'ذهب',
    silverBreakdown: 'فضة',
    investBreakdown: 'استثمارات',
    debtsBreakdown: 'ديون',
    shareText: (data) => `💰 حساب الزكاة\nإجمالي الثروة: ${data.wealth}\nنصاب الزكاة: ${data.nisab}\nالزكاة المستحقة: ${data.zakat}`
  },
  en: {
    appTitle: 'Zakati',
    appTagline: 'Smart Zakat Calculator',
    settingsTitle: 'Basic Settings',
    currencyLabel: 'Currency',
    metalsTitle: 'Today\'s Metal Prices',
    goldPriceLabel: 'Gold price per gram',
    goldPricePlaceholder: 'e.g. 85',
    silverPriceLabel: 'Silver price per gram (optional)',
    silverPricePlaceholder: 'e.g. 1',
    useDefaultPrices: '⚡ Use approximate prices',
    metalsHint: '💡 Update prices to match your local market. Nisab is calculated using the lower of gold or silver.',
    wealthTitle: 'Wealth held for a full year (Hawl)',
    cashLabel: 'Cash (in bank, at home)',
    goldGramsLabel: 'Gold (in grams)',
    silverGramsLabel: 'Silver (in grams)',
    investmentsLabel: 'Investments / Stocks',
    debtsLabel: 'Debts you owe (optional)',
    debtsHint: '💡 Deferred debts (loans, bills) are deducted from wealth before calculating Zakat.',
    gram: 'g',
    zero: '0',
    calculateBtn: 'Calculate Zakat',
    resultTitle: 'Calculation Result',
    totalWealth: 'Total Wealth',
    nisabThreshold: 'Nisab Threshold',
    zakatDue: 'Zakat Due (2.5%)',
    belowNisab: 'Below Nisab',
    saveBtn: 'Save',
    shareBtn: 'Share',
    resetBtn: 'New',
    disclaimer: '⚠️ This tool is for assistance only. Please consult scholars for accuracy.',
    historyTitle: 'Calculation History',
    clearAll: 'Clear All',
    emptyHistory: 'No saved calculations',
    emptyHistorySub: 'Start by calculating your Zakat from the Calculator screen',
    confirmClear: 'Are you sure you want to clear all history?',
    confirmDelete: 'Delete this calculation?',
    saved: 'Saved to history',
    deleted: 'Deleted',
    cleared: 'History cleared',
    copied: 'Copied',
    shared: 'Shared',
    invalidInput: 'Please enter the basic data',
    navCalculator: 'Calculator',
    navHistory: 'History',
    navAbout: 'About',
    aboutTitle: 'About Zakati',
    aboutP1: '<strong>Zakati</strong> helps you calculate your Zakat accurately and easily according to Islamic Sharia, based on the Hanafi madhab (most widely followed).',
    aboutP2: 'All calculations happen on your device only — we don\'t collect any personal data.',
    featuresTitle: 'Features',
    feature1: '✅ Calculate Zakat on cash, gold, and silver',
    feature2: '✅ Supports 9 different currencies',
    feature3: '✅ Works offline',
    feature4: '✅ Saves calculation history locally',
    feature5: '✅ Easy-to-use clean design',
    howToTitle: 'How to Calculate',
    howTo1: 'Enter the current price of gold per gram in your country',
    howTo2: 'Enter the amount you\'ve held for a Hawl (lunar year)',
    howTo3: 'Deduct any deferred debts (optional)',
    howTo4: 'Press "Calculate Zakat" to see the amount due',
    madhabTitle: 'Fiqh Methodology',
    madhabP: 'The app uses the <strong>Hanafi madhab</strong>, the most widespread. Nisab is 85 grams of pure gold, and Zakat is 2.5% of wealth exceeding Nisab.',
    disclaimerTitle: 'Important Notice',
    disclaimerP: 'This app is an approximate assistance tool. For variations in fiqh matters, please consult specialized scholars.',
    successIcon: '✅',
    infoIcon: 'ℹ️',
    wealthBreakdown: 'Wealth breakdown:',
    totalLabel: 'Total:',
    cashBreakdown: 'Cash',
    goldBreakdown: 'Gold',
    silverBreakdown: 'Silver',
    investBreakdown: 'Investments',
    debtsBreakdown: 'Debts',
    shareText: (data) => `💰 Zakat Calculation\nTotal Wealth: ${data.wealth}\nNisab Threshold: ${data.nisab}\nZakat Due: ${data.zakat}`
  }
};

// State
let state = {
  lang: localStorage.getItem('zakati-lang') || 'ar',
  currency: localStorage.getItem('zakati-currency') || 'DZD',
  history: JSON.parse(localStorage.getItem('zakati-history') || '[]'),
  lastResult: null
};

// ============ Initialization ============
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
  applyCurrency();
  bindEvents();
  registerServiceWorker();
});

// ============ Language ============
function applyLanguage() {
  const t = I18N[state.lang];
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', state.lang === 'en');
  document.getElementById('lang-flag').textContent = state.lang === 'ar' ? 'EN' : 'عر';

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerHTML = t[key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  // Update currency suffixes
  updateCurrencySuffixes();
}

function toggleLanguage() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('zakati-lang', state.lang);
  applyLanguage();
}

// ============ Currency ============
function applyCurrency() {
  document.getElementById('currency').value = state.currency;
  updateCurrencySuffixes();
}

function updateCurrencySuffixes() {
  const sym = CURRENCIES[state.currency].symbol;
  ['gold', 'silver', 'cash', 'invest', 'debts'].forEach(id => {
    const el = document.getElementById('currency-suffix-' + id);
    if (el) el.textContent = sym;
  });
}

function changeCurrency(newCurrency) {
  state.currency = newCurrency;
  localStorage.setItem('zakati-currency', state.currency);
  updateCurrencySuffixes();
}

function useDefaultPrices() {
  const c = CURRENCIES[state.currency];
  document.getElementById('gold-price').value = c.goldApprox;
  document.getElementById('silver-price').value = c.silverApprox;
  showToast(state.lang === 'ar' ? 'تم استخدام الأسعار التقريبية' : 'Approximate prices applied', 'success');
}

function formatNumber(num) {
  const t = state.lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(t, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

function getCurrencySymbol() {
  return CURRENCIES[state.currency].symbol;
}

// ============ Calculation ============
function calculateZakat() {
  const goldPrice = parseFloat(document.getElementById('gold-price').value) || 0;
  const silverPrice = parseFloat(document.getElementById('silver-price').value) || 0;
  const cash = parseFloat(document.getElementById('cash').value) || 0;
  const goldGrams = parseFloat(document.getElementById('gold-grams').value) || 0;
  const silverGrams = parseFloat(document.getElementById('silver-grams').value) || 0;
  const investments = parseFloat(document.getElementById('investments').value) || 0;
  const debts = parseFloat(document.getElementById('debts').value) || 0;

  if (goldPrice <= 0 && silverPrice <= 0) {
    showToast(I18N[state.lang].invalidInput, 'error');
    return;
  }

  // Calculate values
  const goldValue = goldGrams * goldPrice;
  const silverValue = silverGrams * silverPrice;
  const totalWealth = cash + goldValue + silverValue + investments - debts;

  // Calculate Nisab (use whichever metal has a price provided; default to gold)
  let nisabValue;
  if (goldPrice > 0 && silverPrice > 0) {
    const goldNisab = NISAB_GOLD_GRAMS * goldPrice;
    const silverNisab = NISAB_SILVER_GRAMS * silverPrice;
    nisabValue = Math.min(goldNisab, silverNisab); // Use the lower (more conservative)
  } else if (goldPrice > 0) {
    nisabValue = NISAB_GOLD_GRAMS * goldPrice;
  } else {
    nisabValue = NISAB_SILVER_GRAMS * silverPrice;
  }

  const isAboveNisab = totalWealth >= nisabValue;
  const zakatDue = isAboveNisab ? totalWealth * ZAKAT_RATE : 0;

  state.lastResult = {
    currency: state.currency,
    goldPrice, silverPrice,
    cash, goldGrams, silverGrams, investments, debts,
    goldValue, silverValue,
    totalWealth, nisabValue, isAboveNisab, zakatDue,
    timestamp: Date.now()
  };

  displayResult(state.lastResult);
}

function displayResult(result) {
  const t = I18N[state.lang];
  const sym = getCurrencySymbol();

  document.getElementById('total-wealth').textContent = formatNumber(result.totalWealth) + ' ' + sym;
  document.getElementById('nisab-value').textContent = formatNumber(result.nisabValue) + ' ' + sym;
  document.getElementById('zakat-due').textContent = (result.isAboveNisab ? formatNumber(result.zakatDue) : t.belowNisab) + (result.isAboveNisab ? ' ' + sym : '');

  // Update icon and title based on result
  document.getElementById('result-icon').textContent = result.isAboveNisab ? t.successIcon : t.infoIcon;

  // Breakdown
  const breakdown = document.getElementById('result-breakdown');
  const items = [];
  if (result.cash > 0) items.push({ label: t.cashBreakdown, value: formatNumber(result.cash) + ' ' + sym });
  if (result.goldValue > 0) items.push({ label: t.goldBreakdown + ' (' + result.goldGrams + ' ' + t.gram + ')', value: formatNumber(result.goldValue) + ' ' + sym });
  if (result.silverValue > 0) items.push({ label: t.silverBreakdown + ' (' + result.silverGrams + ' ' + t.gram + ')', value: formatNumber(result.silverValue) + ' ' + sym });
  if (result.investments > 0) items.push({ label: t.investBreakdown, value: formatNumber(result.investments) + ' ' + sym });
  if (result.debts > 0) items.push({ label: '− ' + t.debtsBreakdown, value: formatNumber(result.debts) + ' ' + sym });

  breakdown.innerHTML = items.length > 0
    ? '<strong>' + t.wealthBreakdown + '</strong>' + items.map(i => `<div class="breakdown-item"><span>${i.label}</span><span>${i.value}</span></div>`).join('')
    : '';

  // Show result card
  document.getElementById('result-card').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ============ History ============
function saveToHistory() {
  if (!state.lastResult) return;
  state.history.unshift({ ...state.lastResult });
  if (state.history.length > 50) state.history = state.history.slice(0, 50);
  localStorage.setItem('zakati-history', JSON.stringify(state.history));
  showToast(I18N[state.lang].saved, 'success');
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (state.history.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <p>${I18N[state.lang].emptyHistory}</p>
        <p class="empty-sub">${I18N[state.lang].emptyHistorySub}</p>
      </div>`;
    return;
  }

  const t = I18N[state.lang];
  const locale = state.lang === 'ar' ? 'ar-EG' : 'en-US';
  const sym = getCurrencySymbol();

  list.innerHTML = state.history.map((item, i) => {
    const date = new Date(item.timestamp);
    const dateStr = date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    const timeStr = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="history-item">
        <div class="history-info">
          <div class="history-date">📅 ${dateStr} • ${timeStr}</div>
          <div class="history-wealth">${t.totalLabel} ${formatNumber(item.totalWealth)} ${sym}</div>
        </div>
        <div class="history-zakat">${item.isAboveNisab ? formatNumber(item.zakatDue) + ' ' + sym : '—'}</div>
        <button class="history-delete" data-index="${i}" aria-label="Delete">🗑️</button>
      </div>`;
  }).join('');

  list.querySelectorAll('.history-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index);
      if (confirm(t.confirmDelete)) {
        state.history.splice(idx, 1);
        localStorage.setItem('zakati-history', JSON.stringify(state.history));
        renderHistory();
        showToast(t.deleted, 'info');
      }
    });
  });
}

function clearHistory() {
  if (state.history.length === 0) return;
  if (confirm(I18N[state.lang].confirmClear)) {
    state.history = [];
    localStorage.setItem('zakati-history', '[]');
    renderHistory();
    showToast(I18N[state.lang].cleared, 'info');
  }
}

// ============ Reset ============
function resetCalculator() {
  ['gold-price', 'silver-price', 'cash', 'gold-grams', 'silver-grams', 'investments', 'debts'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('result-card').classList.add('hidden');
  state.lastResult = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ Share ============
async function shareResult() {
  if (!state.lastResult) return;
  const t = I18N[state.lang];
  const sym = getCurrencySymbol();
  const data = {
    wealth: formatNumber(state.lastResult.totalWealth) + ' ' + sym,
    nisab: formatNumber(state.lastResult.nisabValue) + ' ' + sym,
    zakat: state.lastResult.isAboveNisab ? formatNumber(state.lastResult.zakatDue) + ' ' + sym : t.belowNisab
  };
  const text = t.shareText(data);

  if (navigator.share) {
    try {
      await navigator.share({ text, title: t.appTitle });
      showToast(t.shared, 'success');
    } catch (err) {
      if (err.name !== 'AbortError') copyToClipboard(text);
    }
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast(I18N[state.lang].copied, 'success'),
      () => showToast(I18N[state.lang].copied, 'success')
    );
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    showToast(I18N[state.lang].copied, 'success');
  }
}

// ============ Navigation ============
function switchScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenName).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === screenName);
  });
  if (screenName === 'history') renderHistory();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ Toast ============
let toastTimeout;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ============ Event Binding ============
function bindEvents() {
  document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
  document.getElementById('currency').addEventListener('change', (e) => changeCurrency(e.target.value));
  document.getElementById('use-default-prices').addEventListener('click', useDefaultPrices);
  document.getElementById('calculate-btn').addEventListener('click', calculateZakat);
  document.getElementById('save-btn').addEventListener('click', saveToHistory);
  document.getElementById('share-btn').addEventListener('click', shareResult);
  document.getElementById('reset-btn').addEventListener('click', resetCalculator);
  document.getElementById('clear-history').addEventListener('click', clearHistory);

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchScreen(btn.dataset.screen));
  });
}

// ============ Service Worker ============
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
           .catch(err => console.warn('SW failed:', err));
    });
  }
}
