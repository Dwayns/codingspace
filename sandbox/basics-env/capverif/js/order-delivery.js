/* ********************* MOBILE DEVICE DETECTION  ********************* */
function mobileDetect() {
    var checkedBloc = $('input[name=delivery-choice-entry]:checked', '.delivery-choice-list');

    // use of undefined variables just pray
    if ((!isMobile) && (!$('div.cs-select').length)) {
        selectRender();
    }

    checkedBloc.parent().addClass('active');
    $('.submit-container').addClass('active');
}

function iosDetect() {
    if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
        var selects = document.querySelectorAll("select.address-list");
        for (var i = 0; i < selects.length; i++) {
            selects[i].appendChild(document.createElement("optgroup"));
        }
    }
}

/* ********************* CHECK IF MODAL IS OPEN ********************* */
function isOpenModal() {
    return $('.modal-container').hasClass('open');
};

/* ************************ COLUMN EQUALIZER *********************************** */
function columnEqualizer() {
    var firstCol = $('.js-recap-title'),
        firstColHeight = firstCol.outerHeight(),
        secondCol = $('.js-recap-more-info');

    secondCol.outerHeight(firstColHeight);
}

/* ********************* SCROLL TO [FORM] ********************* */
function scrolltoTarget(blocTarget) {
    if (blocTarget.offset() != undefined) {
        var inputTargetTop = blocTarget.offset().top;

        $('body,html').animate({
            scrollTop: inputTargetTop
        }, 800);
    }
}

/* ********************* LOADER / BTN ********************* */
var $loaderContainerTag = $('.js-loader-container'),
    $loaderContentTags = $('.js-loader-anim, .js-loader-message');

function showLoader() {
    $loaderContainerTag.css('position', 'fixed');
    $loaderContentTags.addClass('active');
}

function hideLoader() {
    $loaderContainerTag.css('position', '');
    $loaderContentTags.removeClass('active');
}

function disableStoreCheckbox() {
    $('#js-isoBilling').prop('checked', true);
    $('#js-isoBilling-row').hide();
    $('.js-storeForm').hide();
}

function hideStoreCheckbox() {
    $('#js-isoBilling-row').hide();
}

function errorDisableSubmitBtn() {
    if ($('.js-error').length) {
        scrolltoTarget($('.msg-modifier--error:first'));
        disableSubmitBtn();
    }
}

function disableSubmitBtn() {
    $('.btn-form--submit').removeClass('btn-form--submit').addClass('btn-form--submit-disable');
}

function enableSubmitBtn() {
    if (!$('.js-error').length) {
        $(".btn-form--submit-disable").removeClass("btn-form--submit-disable").addClass('btn-form--submit');
    }
}

function redirectToDeliveryPage(market, language) {
    window.location.href = Routing.generate('mdm_order_delivery', {
        market: market,
        language: language
    });
}

/* ********************* TOGGLE INFO PANEL ********************* */
function infoToggle() {
    var blInfoItems = [].slice.call(document.querySelectorAll('.js-bl-info-item')),
        toogleInfoItems = [].slice.call(document.querySelectorAll('.js-toogle-infos'));

    blInfoItems.forEach(function (blInfoItem) {
        blInfoItem.addEventListener('click', function (e) {
            var target = e.target;
            var infoItems = [].slice.call(this.querySelectorAll('.js-more-infos, .js-less-infos'));

            toogleInfoItems.forEach(function (toogleInfoItem) {
                if (target == toogleInfoItem) {
                    infoItems.forEach(function (infoItem) {
                        infoItem.classList.toggle('switch-off');
                    });
                }
            });
        });
    });
}

function emptyFieldSearchAddress() {
    $('.js-erase-search-address').on('click', function () {
        var searchAddressVal = isOpenModal() ? $('.js-search-address').val('') : $('.js-dp-search-address').val('');
        $('input[type=search]').focus();
    });
}

/*------------- STICKY RECAP ------------*/
function activeRecapSticky() {
    var stickyBlock = $('#sticky-recap');

    if (typeof stickyBlock != "undefined") {
        stickyBlock.affix({
            offset: {
                top: stickyBlock.offset().top
            }
        });
    }
}

/* ********* RELOAD DELIVERY PAGE BASED ON PARAMETERS ******** */
function deliveryReload(carrierId, addressId, deliveryPointId, searchAddress, orderParams) {
    var splitChoice = null;
    searchAddress = typeof searchAddress !== 'undefined' ? searchAddress : null;
    if (typeof orderParams !== 'undefined') {
        splitChoice = typeof orderParams.splitChoice !== 'undefined' ? orderParams.splitChoice : null;
    }

    showLoader();
    $.ajax({
        type: "GET",
        url: Routing.generate('mdm_order_delivery', {
            market: market,
            language: language,
            shippingAddressId: addressId,
            carrierId: carrierId,
            deliveryPointId: deliveryPointId,
            searchAddress: searchAddress,
            splitChoice: splitChoice
        }),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.success) {
                $(".js-delivery_content").html(data.content);

                mobileDetect();
                iosDetect();
                columnEqualizer();
                choiceDeliveryMode();
                changeRelayAddress();
                checkListAddress();
                bindCapForm();
                bindSubmitBtn();
                initStoreCheckbox();
                currentSearchAddress = $('.js-search-address').val();
                choiceDeliverySplitMode();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            redirectToDeliveryPage(market, language);
        },
        complete: function () {
            var formContainer = $('.js-forms-container');
            var checkMobilePhone = $('.js-form-create-address').parent('#js-billing-address-component').prev('.js-mobile-phone-container').length;
            var mobilePhonecontainer = $('.js-mobile-phone-container');
            var formAddress = checkMobilePhone ? mobilePhonecontainer : formContainer;
            stateCloseModal = false;

            errorDisableSubmitBtn();
            activeRecapSticky();
            $('#js-isoBilling-row').hide();
            hideLoader();
            columnEqualizer();
            initStoreCheckbox();

            if (splitChoice !== null) {
                $('#bl-pan-date-split').prop('checked', true);
                scrolltoTarget($('.js-bl-info-item'));
                return false;
            }

            scrolltoTarget(formAddress);
        }
    })
}

/***************** DELIVERY SUBMIT ***************************/
function deliverySubmit(addressId, refresh) {
    refresh = (refresh === true) ? 1 : 0;
    showLoader();
    var mobilePhone = $('.js-mobile-phone').val(),
        mobilePhoneError = $(".js-mobile-phone-error");
    var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
    $.ajax({
        type: "GET",
        url: Routing.generate('mdm_order_delivery_submit', {
            'addressId': addressId,
            'mobilePhone': mobilePhone,
            'market': market,
            'language': language,
            'refresh': refresh,
            'carrierId': carrierId
        }),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.redirect) {
                if ('store' == context
                    && $('.js-form-address').is(':visible')
                    && $('#mdm_order_address_type').val() != 2
                ) {
                    window.location.reload();
                } else {
                    window.location.href = data.url;
                }
            } else {
                $(".js-mobile-phone-error.error-msg").html(data.error);
                if (typeof mobilePhoneError != "undefined") {
                    mobilePhoneError.show();
                    placeholderFormDisplay();
                    mobilePhoneError.siblings(".input").addClass('error');
                }
                hideLoader();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            redirectToDeliveryPage(market, language);
        },
        complete: function () {
            scrolltoTarget($('.error:first'));
        }
    });
}

function bindSubmitBtn() {
    $('.js-btn-form-validate').on('click', function (e) {
        console.log('.js-btn-form-validate');
        e.preventDefault();
        var isCreateAddressFormOn = $('.js-form-create-address').length && $('.js-form-create-address').css('display') !== 'none';
        var isUpdateAddressFormOn = $('.js-form-update-address').length && $('.js-form-update-address').css('display') !== 'none';

        if ($('.js-dp-search-address-form').length) {
            $(".js-btn-search-address").trigger("click");
        } else if (isCreateAddressFormOn) {
            showLoader();
            processAddress($('.js-form-create-address'), true);
        } else if (isUpdateAddressFormOn) {
            showLoader();
            processAddress($('.js-form-update-address'), true);
        } else {
            var selector = $("#mdm_order_selected_shippingAddress_id");
            var addressId = selector.attr('data-shippingAddress-id');

            if (!addressId) {
                addressId = selector.attr('data-billing-address-id');
            }

            deliverySubmit(addressId, false);
        }
    });
}

/***************** POPIN MANAGEMENT ***************************/
var stateCloseModal;

/**
 * Manage popin type/context
 */
var popinParams = {
    type: {
        map: 'map',
        suggest: "suggest-adress"
    }
}

function modalDisplay(type) {
    var modalContainer = $('.modal-container');
    var modalOpen = $('.modal-container').hasClass('open');

    if (modalContainer.length && !modalOpen) {
        hideLoader();
        $('html, body').addClass('no-overflow');
        modalContainer.addClass('open ' + type);
    } else {
        $('html, body').removeClass('no-overflow');
        modalContainer.removeClass('open ' + type);
    }

}

/***************** cap Verif ***************************/
function fillSuggestAddressList(number, street, zipcode, city) {
    var itemInfo = number + ' ' + street + ' ' + zipcode + ' ' + city;
    return itemInfo;
}

function updateAddressFields(number, street, zipcode, city, addressId) {
    var zipcodeField = document.querySelector('.js-cap-zipcode');
    var cityField = document.getElementById('city');
    var addressField = document.getElementById('address');

    zipcodeField.value = zipcode;
    cityField.value = city;
    addressField.value = number + ' ' + street;

    forceCapAddress = true;
    console.log('forceCapAddress', forceCapAddress);
    
    // bindSubmitBtn();
    deliverySubmit(addressId, false);
    console.log('deliverySubmit', addressId);

    bindCloseModal();
}
