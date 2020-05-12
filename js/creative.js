
$(function () {
	// accordion
	$(".toggle").click(function (e) {
		e.preventDefault();
		let inner = $(this).next(".inner");

		if ($(this).hasClass("active")) {
			inner.slideUp(350);
			$(this).removeClass("active");
		} else {
			$(this).closest(".accordion").find("a.active").removeClass("active");
			$(this)
				.closest(".accordion")
				.find(".inner")
				.not(inner)
				.slideUp(350);
			inner.slideDown(350);
			$(this).addClass("active");
		}
	});

	// languages picker
	$('#languageSelect-btn').click((e) => {
		e.stopPropagation();
		$('#dropdown').slideToggle('fast')

	});
	// close dropdown on click outside of it
	$(document).click(e => {
		let trigger = document.getElementById('languageSelect-btn');
		if (trigger !== e.target) {
			$('#dropdown').slideUp('fast');
		}
	})

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	// $(".page-scroll").bind("click", function (event) {
	// 	var $anchor = $(this);
	// 	$("html, body")
	// 		.stop()
	// 		.animate(
	// 			{
	// 				scrollTop: $($anchor.attr("href")).offset().top - 50,
	// 			},
	// 			250,
	// 			"easeOutSine"
	// 		);
	// 	event.preventDefault();
	// });

	// BACK TO TOP BUTTON
	var offset = 550;
	var duration = 300;

	$(window).scroll(function () {
		if ($(this).scrollTop() > offset) {
			$(".back-to-top").fadeIn(duration);
		} else {
			$(".back-to-top").fadeOut(duration);
		}
	});

	$(".back-to-top").click(function (event) {
		event.preventDefault();

		$("html, body").animate({ scrollTop: 0 }, duration);
		return false;
	});

	// MOBILE MENU
	var toggle = $("#toggle");

	if ($(window).width() < 790) {
		$("#menu a").not('#languageSelect-btn').on("click", function () {
			$("#toggle").click();

		});
	}

	toggle.on("click", function () {
		$(this).toggleClass("is-active");
		$("#menu").addClass("flex");
		$("#menu").toggleClass("slideInDown slideOutUp");
		$("body").toggleClass("overflow");
	});
});
