import { initializePaywall } from './paywall.js';
import { initCreatePreviewItem } from './grid-template.js';
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
});

paywall.on('language', (e, data) => {
  lang = (e.data || data).language;
  setLang(lang);

  initCreatePreviewItem(lang);

  // ADD CURRENT LANG TO LANGUAGE SELECT BUTTON
  var current_lang = window.localStorage.getItem('inplayer_language') || 'en';
  $('#languageSelect-btn').html(current_lang.toUpperCase());

  // change logo depending on the lang chosen
  if (current_lang === 'en') {
    $('img.logo').attr('src', 'img/logo_en_light.png');
  } else if (current_lang === 'mk') {
    $('img.logo').attr('src', 'img/logo_mk_light.png');
  }
});