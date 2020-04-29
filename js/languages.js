
const languages = { en, mk };
var lang = "";

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
    console.log(`current lang is: ${lang}`)
    let current_url = window.location.href.split('?')[0];

    // console.log(current_url)
    window.location.replace(`${current_url}?lang=${lang}`)

    setLang(lang);
});
