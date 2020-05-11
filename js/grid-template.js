
import bandsData from './bands.js';
import { getParameterByName } from "./helpers.js"


// CREATE ASSET
const createCard = (id, image, title) => {
    var output = `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}" class="overlay-link"></a></div><h3 class="name">${title}</h3></div>`;

    return output;
}

const createPreviewItem = (id, video, description, label) => {
    var output = `<div class="video-wrap"><div class="responsive-iframe">${video}</div>
    <button class="black-btn button js-inplayer-donate-button" data-id="${id}">${label}</button></div>
    <div class="preview-video-info">
        <p>${description}</p>
    </div>`;
    return output;
}


$(function () {

    //  CREATE CARDS FROM DATA
    let result = "";
    bandsData.forEach(e => {
        let id = e.id - 1,
            title = e.title,
            image = e.image;

        result += createCard(id, image, title);
        // console.log(result)
        $('#package-items').html(result)
    });

    // LOAD DATA FOR PREVIEW ITEM (ITEM PAGE)
    let currentId = getParameterByName('id');
    var current_lang = window.localStorage.getItem('inplayer_language') || 'en';

    // ADD CURRENT LANG TO LANGUAGE SELECT BUTTON
    $('#languageSelect-btn').html(current_lang.toUpperCase());

    // change logo depending on the lang chosen
    if (current_lang === 'en') {
        $('img.logo').attr('src', 'img/logo_en_light.png');
    } else if (current_lang === 'mk') {
        $('img.logo').attr('src', 'img/logo_mk_light.png');
    }

    if (currentId != null) {
        let result = "",
            base = bandsData[currentId],
            title = base.title,
            id = base.assetId,
            video = base.video,
            desc = "",
            buttonLabel = "";
        $('#bandName').html(title);

        if (current_lang === 'en') {
            $('img.logo').attr('src', 'img/logo_en_light.png');
            desc = base.descriptionEN;
            buttonLabel = base.btnEN;
        } else if (current_lang === 'mk') {
            $('img.logo').attr('src', 'img/logo_mk_light.png');
            desc = base.descriptionMK;
            buttonLabel = base.btnMK;
        }
        result = createPreviewItem(id, video, desc, buttonLabel);
        $('#preview-item').html(result);

    }

})