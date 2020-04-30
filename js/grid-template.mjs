
import bandsData from './bands.js';
import { getParameterByName } from "./helpers.js"


// CREATE ASSET
const createCard = (id, image, title) => {
    var output = `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}" class="overlay-link"></a></div><div class="item-label"><div class="name">${title}</div></div></div>`;

    return output;
}

const createPreviewItem = (id, title, video, description, label) => {
    var output = `${video}
    <div class="preview-video-info">
        <h2>${title}</h2>
        <p>${description}</p>
        <button class="black-btn button js-inplayer-donate-button" data-id="${id}">${label}</button>
    </div>`;
    return output;
}


$(function () {
    let result = "";
    bandsData.forEach(e => {
        let id = e.id - 1,
            title = e.title,
            image = e.image;

        result += createCard(id, image, title);
        // console.log(result)
        $('#package-items').html(result)
    });

    // LOAD DATA FOR PREVIEW ITEM
    let currentId = getParameterByName('id');
    if (currentId != null) {
        let result = "";

        let base = bandsData[currentId];
        // console.log(typeof currentId)

        let title = base.title,
            id = base.assetId,
            video = base.video,
            desc = "";

        var buttonLabel = "";

        $.ajax({
            url: `https://services.inplayer.com/items/${id}`,
            success: function (resp) {
                buttonLabel = resp.metahash.preview_button_label;
            }
        });
        console.log(`ova e label: ${buttonLabel}`)

        let current_lang = window.localStorage.getItem('inplayer_language') || 'en';

        if (current_lang === 'en') {
            desc = base.descriptionEN;
        } else if (current_lang === 'mk') {
            desc = base.descriptionMK;
        }
        result = createPreviewItem(id, title, video, desc, buttonLabel);
        $('#preview-item').html(result);

    }

})