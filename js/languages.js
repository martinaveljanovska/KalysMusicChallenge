
/*const en = {
    music: 'Music',
    faq: 'FAQ',
}

const mk = {
    music: "Музика",
    faq: 'Помош'
}
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
    const lang = e.target.value;
    console.log('asgasg', lang);
    paywall.setLanguage(lang);
});

paywall.on('language', (e, data) => {
    const lang = (e.data || data).language;
    setLang(lang);
});*/