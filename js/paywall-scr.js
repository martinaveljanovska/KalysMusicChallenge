var paywall = new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
	{
		id: 96335,
		options: {
			noPreview: true,
			noInject: true,
		},
	},
	{
		id: 96126,
		options: {
			noPreview: true,
			noInject: true,
		},
	},
]);

const checkAccess = (a) => {
	// console.log("inside checkAccess");
	// console.log(a)

	if (a.hasAccess) {
		// console.log("inside checkAccess hasAccess");

		let assetId = a.asset.id;
		let accessedAsset = $("body").find(`[data-id="${assetId}"]`);
		// console.log(`${assetId} has access and button is hidden`);
		accessedAsset.hide();
	}
};

const reloadAccess = a => {
	if (a.hasAccess === false) {
		let assetId = a.asset.id;
		let accessedAsset = $("body").find(`[data-id="${assetId}"]`);
		console.log(
			// `${assetId} doesn't have access and button is shown once again`
		);
		accessedAsset.show();
	}
};

<<<<<<< HEAD
// $('.js-buy-96126').on('click', () => {
// 	paywall.showPaywall({
// 		asset: {
// 			assetId: 96126
// 		}
// 	});
// })

// $('.js-buy-96335').on('click', () => {
// 	paywall.showPaywall({
// 		asset: {
// 			assetId: 96335
// 		}
// 	});
// })

$(".js-buy").on("click", () => {
	let assetId = $(this).data("id");

	console.log(typeof assetId);
	paywall.showPaywall({
		asset: {
			assetId: assetId,
		},
	});
});
=======
>>>>>>> 2c31ea91283904538013079cba892c4faff76d23

paywall.on("access", (e, a) => {
	checkAccess(a);
	setTimeout(() => {
		reloadAccess(a);
	}, 60000);
});

$(function () {

	// dynamic on click
	$(".js-inplayer-donate-button").on('click', function () {
		let assetId = $(this).data('id');

		console.log(assetId);

		paywall.showPaywall({
			asset: {
				assetId: assetId,
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
});
