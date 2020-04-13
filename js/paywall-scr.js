var paywall = new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
	{ id: 96126, options: { noPreview: true, noInject: true } },
]);



$('.buy-96126').on('click', () => {
	paywall.showPaywall({
		asset: {
			assetId: 96126
		}
	});
})





$(function () {


	var donateButtons = $('.inplayer-donate-button');

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
