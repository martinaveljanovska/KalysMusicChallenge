import { initializePaywall } from './paywall.js';
import en from './en.js';
import mk from './mk.js';

let paywall = initializePaywall();
const languages = { en, mk };
let lang = "";

const setLang = lang => {
  const all = document.querySelectorAll('[data-lang]');

  all.forEach(element => {
    const textKey = element.getAttribute('data-lang');
    element.textContent = languages[lang][textKey];
  });
};

// usage
$('.lang-select').on('click', e => {
  lang = e.target.innerHTML.toLowerCase();
  paywall.setLanguage(lang);

  window.location.reload()
  // let current_url = window.location.href.split('?')[0];
  // window.location.replace(`${current_url}?lang=${lang}`)
});

paywall.on('language', (e, data) => {
  lang = (e.data || data).language;
  setLang(lang);
});