
export function initializePaywall() {
  return new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
    {
      id: 97121,
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
    {
      id: 96335,
      options: {
        noPreview: true,
        noInject: true,
      },
    }
  ]);
};

let paywall = initializePaywall();

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

  $('body').click('.js-inplayer-donate-button', e => {
    let currentAssetId = $(e.target).data('id');
    // console.log($(e.target).data('id'))
    paywall.showPaywall({
      asset: {
        assetId: currentAssetId,
      },
    });
  });

  // $(".js-inplayer-donate-button").on('click', function () {
  //   let currentAssetId = $(this).data('id');
  //   paywall.showPaywall({
  //     asset: {
  //       assetId: currentAssetId,
  //     },
  //   });
  // });

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



