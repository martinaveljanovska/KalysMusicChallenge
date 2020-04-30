
// var paywall = new InplayerPaywall('1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b', [{
// 	id: 97121, options: {
// 		noPreview: true,
// 		noInject: true
// 	}
// }]);

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




$(function () {


	// dynamic on click
	$(".js-inplayer-donate-button").on('click', function () {
		let currentAssetId = $(this).data('id');
		paywall.showPaywall({
			asset: {
				assetId: currentAssetId,
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


}); // end


