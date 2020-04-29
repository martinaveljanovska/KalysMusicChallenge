import bandsData from './bands.js';
import { getParameterByName } from "./helpers.js"

console.error("bands data:", bandsData);

let paywall = new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
	{
		id: 97121,
		options: {
			noPreview: true,
			noInject: true,
		},
	},
]);

export default paywall;

const checkAccess = (a) => {
	if (a.hasAccess) {
		let assetId = a.asset.id;
		let accessedAsset = $("body").find(`[data-id="${assetId}"]`);
		accessedAsset.hide();
	}
};

const reloadAccess = a => {
	if (a.hasAccess === false) {
		let assetId = a.asset.id;
		let accessedAsset = $("body").find(`[data-id="${assetId}"]`);
		accessedAsset.show();
	}
};

paywall.on("access", (e, a) => {
	checkAccess(a);
	setTimeout(() => {
		reloadAccess(a);
	}, 60000);
});

// CREATE ASSET
const createCard = (id, image, title) => {
  const current_lang = getParameterByName(lang)
  return `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}" class="overlay-link"></a></div><div class="item-label"><div class="name">${title}</div></div></div>`;
}

const createPreviewItem = (id, title, video, description) => {
  return `<div class="preview-video">
					  <h3>${title}</h3>${video}
					</div>`;
}

$(function () {
	// videos.forEach(e => {
	// LOAD DATA FOR PREVIEW ITEM
	let currentId = getParameterByName('id');
	if (currentId != null) {
		let result = "";

		let base = videos[currentId];
		// console.log(typeof currentId)

		let title = base.title,
			id = base.id,
			video = base.video;


		let desc = base.description;


		result += createPreviewItem(id, title, video, desc);
		$('#preview-item').html(result);
	}

	// dynamic on click
	$(".js-inplayer-donate-button").on('click', function () {
		let currentAssetId = $(this).data('id');
		paywall.showPaywall({
			asset: {
				assetId: currentAssetId,
			},
		});

	});

	// add labels to the buttons from dashboard
	var donateButtons = $(".js-inplayer-donate-button");

	donateButtons.each(function () {
		var currentButton = $(this);
		var assetId = currentButton.data("id");

		$.ajax({
			url: `https://services.inplayer.com/items/${assetId}`,
			success: function (resp) {
				let buttonLabel = resp.metahash.preview_button_label;
				currentButton.html(buttonLabel);
			},
		});
	});


	$(".inplayer-paywall-logout").parent().hide();
	paywall.on("authenticated", function () {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", function () {
		location.reload();
	});

	// TAKE ASSETS INFO

}); // end


