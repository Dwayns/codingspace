$( document ).ready(function() {
    /* ********************* LOAD FOUNDATION JS ********************* */
    $(document).foundation();

    /* ********** IF BROWSER BACK BUTTON DETECTED > RELOAD PAGE *********** */
    if ($('#refreshed').val() == 'true') {
        $('#refreshed').val('false');
    } else {
        deliveryReload('', '', '');
    }

    /* ********************* Bind event for tracking ********************* */
    $('body').on('changeAddress listAddress changeDeliveryMode markerClick', function(e, elem) {
        initMdmRender(elem);
    });

    /* ********************* LOAD / ORIENTATION / RESIZE ********************* */
    if($("html").is(".lt-ie10")) { /* ****** IE9 FIX ****** */
        $(window).on('load', function () {
            mobileDetect();
            iosDetect();
            placeholderFormDisplay();
            errorDisableSubmitBtn();
            keyboardTabFix();
            columnEqualizer();
            initStoreCheckbox();
        });
    } else { /* ****** OTHERS BROWSERS ****** */
        $(window).on('load resize orientationchange', function () {
            mobileDetect();
            iosDetect();
            placeholderFormDisplay();
            errorDisableSubmitBtn();
            keyboardTabFix();
            columnEqualizer();
            initStoreCheckbox();
        });
    }

    activeRecapSticky();

    /*------------- ORDER DELIVERY ADDRESS ------------*/
    orderDeliveryAddress();

    /*------------- ORDER DELIVERY CARRIER ------------*/
    choiceDeliveryMode();

    /*------------- ORDER DELIVERY PRM ------------*/
    changeRelayAddress();
    bindCurrentUserGeolocation();

    /*------------- USER WITHOUT ADDRESS --------------*/
    checkListAddress();
    bindCapForm();

    /*------------- DELIVERY SUBMIT ---------------------*/
    bindSubmitBtn();

    /*------------- ORDER DELIVERY SPLIT ---------------------*/
    choiceDeliverySplitMode();


}); // END $(document).ready