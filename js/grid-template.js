
import artistsData from './artists.js';
import { getParameterByName } from "./helpers.js"


// CREATE ASSET
const createCard = (id, assetId, image, title) => {
    var output = `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}&asset=${assetId}" class="overlay-link"></a></div><h3 class="name">${title}</h3></div>`;

    return output;
}

const createPreviewItem = (id, video, description, label) => {
    var output = `<div class="video-wrap"><div class="responsive-iframe">${video}</div>
    <a class="black-btn button js-inplayer-donate-button" data-id="${id}">${label}</a></div>
    <div class="preview-video-info">
        <p>${description}</p>
    </div>`;
    return output;
}

export function initCreatePreviewItem(lang) {
    let currentId = getParameterByName('id');
    if (currentId != null) {
        let result = "",
            base = artistsData[currentId],
            title = base.title,
            id = base.assetId,
            video = base.video,
            desc = "",
            buttonLabel = "";
        $('#bandName').html(title);

        if (lang === 'en') {
            desc = base.descriptionEN;
            buttonLabel = base.btnEN;
        } else if (lang === 'mk') {
            desc = base.descriptionMK;
            buttonLabel = base.btnMK;
        }
        result = createPreviewItem(id, video, desc, buttonLabel);
        $('#preview-item').html(result);

    }
}


$(function () {

    //  CREATE CARDS FROM DATA
    let result = "";
    artistsData.forEach(e => {
        let id = e.id - 1,
            assetId = e.assetId,
            title = e.title,
            image = e.image;
        result += createCard(id, assetId, image, title);
        $('#package-items').html(result)
    });

})
