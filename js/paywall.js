import { getParameterByName } from "./helpers.js";

var currentAssetId = getParameterByName("asset");
let paywall = null;

export function initializePaywall() {
  if (currentAssetId) {
    return new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
      {
        id: currentAssetId,
        options: {
          noPreview: true,
          noInject: true
        }
      }
    ]);
  } else {
    return new InplayerPaywall("1f4cfc0e-7bfb-4aeb-badb-0197da2eba6b", [
      {
        id: 97121,
        options: {
          noPreview: true,
          noInject: true
        }
      }
    ]);
  }
}

const checkAccess = a => {
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

$(function() {
  // add dynamic asset div, on item page
  if (currentAssetId) {
    $("body").append(
      `<div class="inplayer-paywall" id="inplayer-${currentAssetId}"></div>`
    );
  }
  paywall = initializePaywall();
  paywall.on("access", (e, a) => {
    checkAccess(a);
    setTimeout(() => {
      reloadAccess(a);
    }, 60000);
  });

  // dynamic on click
  $("body").on("click", ".js-inplayer-donate-button", e => {
    let currentAssetId = $(e.target).data("id");
    // console.log($(e.target).data('id'))
    paywall.showPaywall({
      asset: {
        assetId: currentAssetId
      }
    });
  });

  $(".inplayer-paywall-logout")
    .parent()
    .hide();
  paywall.on("authenticated", function() {
    $(".inplayer-paywall-login")
      .parent()
      .hide();
    $(".inplayer-paywall-logout")
      .parent()
      .show();
  });
}); // end
