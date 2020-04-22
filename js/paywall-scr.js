var paywall = new InplayerPaywall('1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b', [
	{
		id: 96335,
		options:
		{
			noPreview: true,
			noInject: true
		}
	},
	{
		id: 96126,
		options:
		{
			noPreview: true,
			noInject: true
		}
	}
]);


const checkAccess = function (a) {
	if (a.hasAccess) {
		let assetId = a.asset.id;
		let accessedAsset = $('body').find(`[data-id="${assetId}"]`);
		alert(`${assetId} has access`)
		accessedAsset.addClass('hide');
	}
}

// const reloadAccess = function (a) {
// 	if (a.hasAccess === false) {
// 		let assetId = a.asset.id;
// 		let accessedAsset = $('body').find(`[data-id="${assetId}"]`);
// 		alert(`${assetId} doesn't have access`)
// 		accessedAsset.addClass('show');
// 	}
// }

const reloadAccess = function (a) {
	return function () {
		if (a.hasAccess === false) {
			let assetId = a.asset.id;
			let accessedAsset = $('body').find(`[data-id="${assetId}"]`);
			alert(`${assetId} doesn't have access`)
			accessedAsset.addClass('show');
		}
	}
}

const alertJs = () => {
	alert('10 seconds later.')
}

$('.js-buy-96126').on('click', () => {
	paywall.showPaywall({
		asset: {
			assetId: 96126
		}
	});
})


$('.js-buy-96335').on('click', () => {
	paywall.showPaywall({
		asset: {
			assetId: 96335
		}
	});
})

paywall.on('access', (e, a) => {
	// console.log(a)
	checkAccess(a);
	// setTimeout(reloadAccess(a), 60000);
	setTimeout(reloadAccess(a), 10000);

});




$(function () {


	var donateButtons = $('.js-inplayer-donate-button');

	donateButtons.each(function () {

		var currentButton = $(this);

		let assetId = currentButton.data('id');

		$.ajax({
			url: `https://services.inplayer.com/items/${assetId}`,
			success: function (resp) {

				let buttonLabel = resp.metahash.preview_button_label;
				currentButton.html(buttonLabel);
			}
		});
	})



	$(".inplayer-paywall-logout").parent().hide();
	paywall.on("authenticated", function () {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", function () {
		location.reload();
	});
});
