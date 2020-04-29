


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
	var output = `<div class="package-item" data-id="${id}"><div class="content" style="background-image:url(${image})"><a href="./item.html?id=${id}" class="overlay-link"></a></div><div class="item-label"><div class="name">${title}</div></div></div>`;

	// console.log(output)
	return output;

}

const createPreviewItem = (id, title, video, description) => {
	var output = `<div class="preview-video">
					<h3>${title}</h3>${video}<p>${description}</p>
					</div>`;
	return output;
}

const videos = [
	{
		'id': 1,
		'title': 'Video title one',
		'image': 'img/thumb/video-one.jpg',
		'video': `<iframe width="610" height="339" frameborder="0" allowfullscreen
        src="https://www.youtube.com/embed/LOgsQZYt8iI"></iframe>`,
		'descriptionEN': `MusaiQ entered the audience&#39;s sonic map in late 2015. A self- evident, mosaiq-like
		musicianship is the life force of this unusual collective. The music they create is an alloy of
		styles tied together by a specific thread that is actually the heart of this group, whether it be
		through interpretation / remakes of hits from different sides of the musical compass or in their
		original music.
		Еach member of this collective has a vast music portfolio:
		Kalina Velkovska – vocal (Steel Temple, The Lady Said No, Primordial Soup, La Colonie Volvox,
		Autmind, FIN-Project, KALY);
		Ivan Petrovski – guitar (Outlaw, ATOM, 3ject, FIN-Project, DSH);
		Nikola Bochvarov – bass (Бла, Бла, Бла; Калап, Атом, Bramha Trio, Antiart);
		Petar Lukic – piano &amp; keyboards (Јаболко за Даскалот, Примордијална Манџа, 3ject, Bramha
		Trio, Antiart);
		Aleksandar Vanchovski – drums (Hideout, Scriming For Change, ATOM, Bramha Trio, 3ject,
		Antiart);`,
		'descriptionMK': `Мјузаик егзистира на звучната мапа на публикумот од 2015 год. Мозаично музицирање е
		кредото според кое делува овој несекојдневен колектив. Музиката која ја креираат
		претставува легура од стилови поврзани со специфична нишка која всушност е срцето на
		овој состав, било тоа да е преку интерпретација на преработки на хитови од различни
		срани на компасот или пак во авторството.
		Секој од членовите на овој колектив има богат авторски опус зад себе:
		Калина Велковска – вокал (Steel Temple, The Lady Said No, Примордијална Манџа, La
		Colonie Volvox, Autmind, FIN-Project, KALY);
		Иван Петровски – гитара (Outlaw, ATOM, 3ject, FIN-Project, DSH);
		Никола Бочваров – бас (Бла, Бла, Бла; Калап, Атом, Bramha Trio, Antiart);
		Петар Лукиќ – клaвијатури (Јаболко за Даскалот, Примордијална Манџа, 3ject, Bramha Trio,
		Antiart);
		Александар Џигер Ванчовски – тапани (Hideout, Scriming For Change, ATOM, Bramha Trio,
		3ject, Antiart);`
	},
	{
		'id': 2,
		'title': 'Video title two',
		'image': 'img/thumb/video-one.jpg',
		'video': `<iframe width="610" height="339" frameborder="0" allowfullscreen
        src="https://www.youtube.com/embed/LOgsQZYt8iI"></iframe>`,
		'description': `Desc for video two`
	},
	{
		'id': 3,
		'title': 'Video title three',
		'image': 'img/thumb/video-one.jpg',
		'video': `<iframe width="610" height="339" frameborder="0" allowfullscreen
        src="https://www.youtube.com/embed/LOgsQZYt8iI"></iframe>`,
		'description': `Desc for video three`
	},
	{
		'id': 4,
		'title': 'Video title four',
		'image': 'img/thumb/video-one.jpg',
		'video': `<iframe width="610" height="339" frameborder="0" allowfullscreen
        src="https://www.youtube.com/embed/LOgsQZYt8iI"></iframe>`,
		'description': `Desc for video four`
	}
];

$(function () {

	// console.log(typeof lang + lang)

	//  LOAD DATA FOR PACKAGE ITEMS
	let result = "";
	// $.getJSON("bands.js", function (data) {
	// 	console.log('data is here: ' + data)
	// })
	videos.forEach(e => {

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


