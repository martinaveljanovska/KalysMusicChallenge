var paywall = new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
	{ id: 96126, options: { noPreview: true, noInject: true } },
]);

document.getElementById("watch-btn").addEventListener("click", function () {
	paywall.showPaywall({
		asset: {
			assetId: 96126,
			// brandingId: 60,
			// preselectedFeeId: 2146
		},
	});
});

var config = {
	// package_id: "96126",
	service_url: "https://staging-v2.inplayer.com",
};

// CREATE ASSET
function createItemElement(assetId, assetPhoto, assetTitle, assetDesc) {
	var output = `<div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"><a href="./item.html?id=${assetId}" class="overlay-link"></a></div><div class="item-label"><div class="name">${assetTitle}</div></div><div class="description">${assetDesc}</div></div>`;
	return output;
}

$(function () {
	$(".inplayer-paywall-logout").parent().hide();
	paywall.on("authenticated", function () {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", function () {
		location.reload();
	});
});

// TAKE ASSETS INFO
$.get(
	config.service_url + `/items/packages/${config.package_id}/items?limit=500`,
	(response) => {
		// console.log($('#package-title-' + package))

		var output = "";
		// console.log(packageNumber)

		for (var i = 0; i < response.collection.length; i++) {
			var asset = response.collection[i];
			// console.log(asset.metahash.preview_title)

			var assetId = asset.id;
			var assetPhoto = asset.metahash.paywall_cover_photo;
			var assetTitle = asset.title;
			var assetDesc = asset.metahash.preview_description;
			output += createItemElement(assetId, assetPhoto, assetTitle, assetDesc);

			// console.log(`title is: "${assetTitle}" and desc is: "${assetDesc}"`)

			document.getElementById(
				`package-items-${config.package_id}`
			).innerHTML = output;
		} // for
	}
); // get items

$.ajax({
	url: "https://services.inplayer.com/items/96126",
	success: function (resp) {
		$("#watch-btn").html(resp.metahash.preview_button_label);
	},
});

// paywall.on("inject", function () {
// 	$(".inplayer-paywall").addClass("responsive-iframe");
// 	$.ajax({
// 		url: config.service_url + "/items/" + getParameterByName("id"),
// 		success: function (resp) {
// 			var asset_desc = resp.metahash.preview_description;
// 			$("#item-description").html(asset_desc);
// 		},
// 	});
// });
