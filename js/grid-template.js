
import bandsData from './bands.js';
import { getParameterByName } from "./helpers.js"


// CREATE ASSET
const createCard = (id, image, title) => {
    var output = `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}" class="overlay-link"></a></div><h3 class="name">${title}</h3></div>`;

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

    if (currentId != null) {
        let result = "",
            base = bandsData[currentId],
            title = base.title,
            id = base.assetId,
            video = base.video,
            desc = "",
            buttonLabel = "";

        if (current_lang === 'en') {
            desc = base.descriptionEN;
            buttonLabel = base.btnEN;
        } else if (current_lang === 'mk') {
            desc = base.descriptionMK;
            buttonLabel = base.btnMK;
        }
        result = createPreviewItem(id, title, video, desc, buttonLabel);
        $('#preview-item').html(result);
        console.log(`current asset: ${id} and label is: ${buttonLabel}`)



    }

})