import { initializePaywall } from './paywall.js';
import { initCreatePreviewItem } from './grid-template.js';
import en from './en.js';
import mk from './mk.js';

let paywall = initializePaywall();
const languages = { en, mk };

const setLang = lang => {
  const allNodes = document.querySelectorAll('[data-lang]');

  allNodes.forEach(element => {
    const textKey = element.getAttribute('data-lang');
    element.textContent = languages[lang][textKey];
  });
};

// usage
$('.lang-select').on('click', e => {
  paywall.setLanguage(e.target.innerHTML.toLowerCase());
});

paywall.on('language', (e, { language }) => {
  setLang(language);
  initCreatePreviewItem(language);

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