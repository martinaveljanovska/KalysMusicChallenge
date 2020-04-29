import paywall from './paywall.mjs';

const languages = { en, mk };

const setLang = lang => {
    const all = document.querySelectorAll('[data-lang]');

    all.forEach(element => {
        const textKey = element.getAttribute('data-lang');
        element.textContent = languages[lang][textKey];
    });
};

// usage
$('.lang-select').on('click', e => {
    const lang = e.target.innerHTML.toLowerCase();
    // console.log('asdasdasd', lang)
    paywall.setLanguage(lang);
});

paywall.on('language', (e, data) => {
    const lang = (e.data || data).language;
    setLang(lang);
});