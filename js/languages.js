import { initializePaywall } from './paywall.js';
import { initCreatePreviewItem } from './grid-template.js';
import en from './en.js';
import mk from './mk.js';

let paywall = initializePaywall();
const languages = { en, mk };

const handleLangChange = lang => {
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

const setCurrentLanguage = (language) => {
  if (language === "en" || language === "mk") {
    return language;
  } else {
    // return english as default language
    return 'en';
  }
}

paywall.on('language', (e, { language }) => {
  let currentLang = setCurrentLanguage(language);

  handleLangChange(currentLang);
  initCreatePreviewItem(currentLang);

  // ADD CURRENT LANG TO LANGUAGE SELECT BUTTON
  $('#languageSelect-btn').html(currentLang.toUpperCase());

  // change logo depending on the lang chosen
  if (currentLang === 'en') {
    $('img.logo').attr('src', 'img/logo_en_light.png');
  }

  if (currentLang === 'mk') {
    $('img.logo').attr('src', 'img/logo_mk_light.png');
  }
});