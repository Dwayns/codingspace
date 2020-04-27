var btnModify = document.getElementById('js-update-address');
var btnClose = document.querySelector('.js-btn-close-modal');

(function() {
    btnModify.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('btnModify CLICK');
        modalDisplay('suggest-adress');
        // boucle();
        closeListener();
    });
}());


function closeListener() {
    console.log('closeListener');
    btnClose.addEventListener('click', bindCloseModal, false);
}

function boucle() {
    ajaxCall();
}

function ajaxCall() {
    $.ajax({
        url: 'localhost/',
        method: 'POST',
        data: 'html',
        success: function (response) {
            console.log(response)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERROR AJAX');
            boucle();
        },
        complete: function () {
            console.log('COMPLETE AJAX');
        }
    });
}

function modalDisplay(type) {
    var modalContainer = $('.modal-container');
    var modalOpen = $('.modal-container').hasClass('open');

    if (modalContainer.length && !modalOpen) {
        // hideLoader();
        $('html, body').addClass('no-overflow');
        modalContainer.addClass('open ' + type);
    } else {
        $('html, body').removeClass('no-overflow');
        modalContainer.removeClass('open ' + type);
    }

}

function bindCloseModal() {
    event.preventDefault();
    console.log('CLOSE');
    var modalContainer = $('.modal-container');
    $('html, body').removeClass('no-overflow');
    modalContainer.removeClass('open ');
};












// var createForm = null;

// /*------------- ORDER DELIVERY ADDRESS ------------*/
// function orderDeliveryAddress() {
//     $('body').on('click', 'div.cs-select.cs-active', function () {
//         $('body').trigger('listAddress', [$('select.address-list').get(0)]);
//     });

//     /* ********************* CREATE / UPDATE ********************* */
//     /* *************** CREATE EVENTS *************** */
//     $(".js-delivery_content").on('click', '#js-create-address', function (e) {
//         e.preventDefault();
//         $(".js-form-update-address").html("");
//         $(".js-form-create-address").html(createForm);
//         $("#js-shipping-title").show();
//         $("#js-billing-title").hide();

//         var addressType = document.querySelector('#js-create-address').dataset.addressType;
//         document.querySelector('#mdm_order_address_type').value = addressType;

//         var formCreateAddress = document.querySelector(".js-form-create-address");
//         var title = formCreateAddress.querySelector('[data-delivery]');
//         title.innerHTML = title.dataset.delivery;
//         disableStoreCheckbox();
//         showFormCreate();
//         hideEditBtn();
//         if (typeof bindCapAddress == 'function') {
//             bindCapAddress();
//         }
//     });

//     /* *************** UPDATE EVENTS *************** */
//     $(".js-delivery_content").on('click', '#js-update-address', function (e) {
//         e.preventDefault();
//         $(".js-form-create-address").html("");
//         showLoader();
//         disableStoreCheckbox();
//         hideEditBtn();

//         var currentSelectedAddressId = $("#mdm_order_list_addresses_shippingAddresses").val();
//         if (!currentSelectedAddressId) {
//             return false;
//         }

//         showEditAddressForm(currentSelectedAddressId);
//     });

//     $(".js-delivery_content").on('submit', '.js-form-update-address .js-form-address', function () {
//         showLoader();
//         bindChoiceBtn();
//         processAddress($('.js-form-update-address'), false);
//         return false;
//     });

//     /* *************** CREATE EVENTS *************** */
//     $(".js-delivery_content").on('submit', '.js-form-create-address .js-form-address', function () {
//         showLoader();
//         bindChoiceBtn();
//         processAddress($('.js-form-create-address'), false);
//         return false;
//     });

//     /* *************** CANCEL EVENTS *************** */
//     $(".js-delivery_content").on('click', '.js-btn-form-cancel', function () {
//         $(".js-form-create-address").hide();
//         $(".js-form-update-address").hide();
//         $("#js-billing-address-component .js-address-content").show();
//         showEditBtn();
//         initMdmRender(this);
//         selectFirstAddress();
//         initStoreCheckbox();
//         return false;
//     });

//     $(".js-delivery_content").on('focus', 'select[data-event-change="address-list-change"]', function () {
//         previousValue = this.value;
//     });

//     /* **************** VALIDATE FORM WITH INVALID ADDRESS // IE9 FIX **************** */
//     if ($("html").is(".lt-ie10")) {
//         $(".js-delivery_content").on('click', '.js-btn-form-validate', function () {
//             if ($(this).hasClass('btn-form--submit-disable')) {
//                 return false;
//             }
//         });
//     }

//     /* **************** ADDRESS CHANGE EVENTS **************** */
//     $(".js-delivery_content").on('change', 'select[data-event-change="address-list-change"]', function () {
//         var selectedOption = $(this).find(":selected");

//         changeAddress($(this).val(), selectedOption.data('country'), selectedOption.data('default-language'));
//     });

//     /* **************** MOBILE PHONE CHANGE EVENTS **************** */
//     $(".js-delivery_content").on('focusout', 'input#phone,input#mobile-phone', function () {
//         var phones = $(".js-delivery_content .js-phonenumber, .js-delivery_content .js-mobile-phone");

//         if (phones.length != 2) {
//             return false;
//         }

//         var socoFirst = phones.first().attr('id') == 'mobile-phone';
//         var socoPhone = socoFirst ? phones.first() : phones.last();
//         var addressPhone = socoFirst ? phones.last() : phones.first();

//         if (socoPhone.is(":visible") && addressPhone.is(":visible") && !phones.hasClass('mirrored')) {
//             if (socoFirst) {
//                 addressPhone.val(addressPhone.val().length == 0 ? socoPhone.val() : addressPhone.val());
//             } else {
//                 socoPhone.val(socoPhone.val().length == 0 ? addressPhone.val() : socoPhone.val());
//             }
//             phones.addClass('mirrored');
//         }
//     });

//     /* **************** COUNTRY CHANGE EVENTS **************** */
//     $(".js-delivery_content").on('change', 'select#js-country', function () {
//         var selectedOption = $(this).find(":selected").data('country');

//         updateCountryFlag(selectedOption);
//     });
// } // end orderDeliveryAddress

// /* ******************************* PLACEHOLDER / INPUT/TEXTAREA/OPTIONAL  ********************* */
// function placeholderFormDisplay() {
//     if ($("html").is(".lt-ie10")) { /* ****** IE9 FIX ****** */
//         var $specificField = $('.js-form-update-address input, .js-form-update-address textarea, .js-form-create-address input, .js-form-create-address textarea');
//         $input = $('.fields-content .input[required=required]');

//         $specificField.each(function () {
//             if ($(this).val().length) {
//                 $(this).next('label').removeClass('slideup-placeholder');
//                 $(this).next('label').addClass('slideup-placeholder');
//             }
//         });

//         $specificField.focusout(function () {
//             if ($(this).val().length) {
//                 $(this).next('label').removeClass('slideup-placeholder');
//                 $(this).next('label').addClass('slideup-placeholder');
//             } else {
//                 $(this).next('label').removeClass('slideup-placeholder');
//             }
//         });

//     } else { /* ****** OTHERS BROWSERS****** */
//         var $specificField = $('.js-form-update-address input:optional, .js-form-update-address textarea, .js-form-create-address input:optional, .js-form-create-address textarea'),
//             $input = $('.fields-content .input:required');

//         $specificField.each(function () {
//             if ($(this).val().length) {
//                 $(this).next('label').removeClass('slideup-placeholder');
//                 $(this).next('label').addClass('slideup-placeholder');
//             }
//         });

//         $specificField.focusout(function () {
//             if ($(this).val().length) {
//                 $(this).next('label').removeClass('slideup-placeholder');
//                 $(this).next('label').addClass('slideup-placeholder');
//             } else {
//                 $(this).next('label').removeClass('slideup-placeholder');
//             }
//         });
//     }

//     /* *************** ERROR MSG *************** */
//     $input.each(function () {
//         if ($(this).siblings('.error-msg').is(':visible') && $(this).val().length <= 0) {
//             $(this).next('.label').removeClass('slideup-placeholder').addClass('slidedown-placeholder');
//         }
//     });

//     $input.focus(function () {
//         if ($(this).siblings('.error-msg').is(':visible')) {
//             $(this).removeClass('error');
//             $(this).siblings('.error-msg').css('display', 'none');
//             $(this).siblings('.label').removeClass('slidedown-placeholder');
//         }
//     });


//     $input.focusout(function () {
//         if ($(this).val().length === 0 && $(this).siblings('.error-msg').length) {
//             $(this).siblings('.error-msg').css('display', 'block');
//             $(this).next('label').addClass('slidedown-placeholder');
//             $(this).addClass('error');
//         } else {
//             $(this).removeClass('error');
//         }
//     });

//     (function taxCodeValidator() {
//         var $taxCodeInput = $('.js-form-create-address .inf-comp-content .taxCode');

//         var validTaxCode = new RegExp('^[a-z0-9A-Z]{16}$');

//         if ($taxCodeInput.length) {
//             $taxCodeInput.focus(function () {
//                 if ($(this).hasClass('error')) {
//                     $(this).removeClass('error');
//                     $(this).siblings('.error-msg').hide();
//                     $(this).siblings('.label').removeClass('slidedown-placeholder');
//                 }
//             }).focusout(function () {
//                 if (!($taxCodeInput.val() === "")) {
//                     if (!(validTaxCode.test($taxCodeInput.val()))) {
//                         $(this).addClass('error');
//                         $(this).siblings('.error-msg').show();
//                         $(this).parents('.inf-comp-content').addClass('error');
//                     }
//                 } else { $(this).parents('.inf-comp-content').removeClass('error'); }
//             });
//         }
//     })();
// }

// /* *************** COUNTRY FLAGS *************** */
// function updateCountryFlag(countryChoice) {
//     var selectorFlag = $('#js-country'),
//         containerFlag = '<div id="js-flag" data-country="' + countryChoice + '">&nbsp;</div>';

//     $('#js-flag').remove();
//     selectorFlag.before(containerFlag);
// }

// /* *********************  ********************* */
// function showFormCreate(scroll) {
//     scroll = typeof (scroll) === 'undefined' ? true : scroll;

//     $(".js-form-create-address").show(0, function () {
//         placeholderFormDisplay();
//         keyboardTabFix();
//         updateCountryFlag(market);

//         $('#js-country option[data-country="' + market + '"]').prop('selected', true);

//         if (scroll) {
//             setTimeout(function () {
//                 scrolltoTarget($('.form--address'));
//             }, 160);
//         }
//     });
// }

// /* ********************* MARKET / LANGUAGE ********************* */
// function changeAddress(addressId, selectedCountry, defaultLanguage) {
//     showLoader();

//     if (typeof (defaultLanguage) === 'undefined') {
//         defaultLanguage = language;
//     }

//     if (market == selectedCountry) {
//         deliveryReload('', addressId, '');
//     } else {
//         if ('store' == context) {
//             defaultLanguage = language;
//         }

//         $.ajax({
//             type: "GET",
//             url: Routing.generate('mdm_order_delivery_select_shipping_address_id', {
//                 shippingAddressId: addressId
//             }),
//             dataType: 'json',
//             cache: false,
//             success: function (data) {
//                 redirectToDeliveryPage(selectedCountry, defaultLanguage);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 redirectToDeliveryPage(market, language);
//                 return false;
//             }
//         })
//     }
// }

// function initStoreCheckbox() {
//     var checkbox = $('#js-isoBilling-row');
//     if ((checkbox.data("nb-address-type") == 1 || checkbox.data("nb-address-type") == 2) && !checkbox.data("add-billing-address")) {
//         checkbox.show();
//     } else {
//         checkbox.hide();
//     }
// }

// function selectFirstAddress() {
//     var selectedAddress = $(".address-list option:first");

//     $(".address-list .cs-placeholder").html($(selectedAddress).text());
//     $(".address-list .cs-selected").removeClass('cs-selected');
//     $('.address-list .cs-options li[data-value="' + $(selectedAddress).val() + '"]').addClass('cs-selected');
//     $('.address-list select option[value="' + $(selectedAddress).val() + '"]').prop('selected', true);

//     $(".address-list .cs-placeholder").html($(selectedAddress).text());

//     $(".cs-select").removeClass('cs-active');
//     $(".js-address-modifier").show();

//     $(selectedAddress).attr('selected', 'selected');
// }

// function hideEditBtn() {
//     $('#js-btn-container-edit').hide();
// }

// function showEditBtn() {
//     $('#js-btn-container-edit').fadeIn('slow');
// }

// /* ********************* SELECT CUSTOM [ONLY ON DESKTOP] ********************* */
// function selectRender() {
//     (function () {
//         [].slice.call(document.querySelectorAll('select.cs-select.address-list ')).forEach(function (el) {
//             new SelectFx(el, {
//                 onChange: function (val) {
//                     var selectedOption = $('select.address-list option[value="' + val + '"]');
//                     $('body').trigger('changeAddress', [
//                         $('<div data-tracking="Tunnel_Livraison|Selection|Adresse"></div>').get(0)
//                     ]);

//                     if ($(selectedOption).is(':first-child')) {
//                         showEditBtn();
//                         $(".js-form-update-address").hide();
//                         $(".js-form-create-address").hide();

//                         $("#js-update-address").show();

//                         return false;
//                     }

//                     changeAddress(val, selectedOption.data('country'), selectedOption.data('default-language'));
//                 }
//             });
//         });
//     })();

//     var $selectLabel = $(".address-list-container label");
//     $('.address-list-container .cs-placeholder').before($selectLabel);
// }

// /* **************** SHOW CREATE FORM AND DISABLE VALIDATE BTN IF NO LIST ADDRESS FOUND **************** */
// function checkListAddress() {
//     if ($('.js-form-create-address').length) {
//         createForm = $(".js-form-create-address").html();
//         if (!$('.js-address-list-container').length) {
//             showFormCreate(false);
//         }
//     }

//     $('#js-isoBilling').change(function () {
//         if (this.checked) {
//             $('#mdm_order_address_isoBillingAddress').val(1);
//             $('#mdm_order_address_type').val(1);
//             $(".js-form-create-address").hide();
//             showEditBtn();
//         } else {
//             $(".js-form-update-address").html("");
//             var formCreateAddress = document.querySelector(".js-form-create-address");
//             formCreateAddress.innerHTML = createForm;
//             showFormCreate();
//             disableSubmitBtn();

//             var title = formCreateAddress.querySelector('[data-billing]');
//             title.innerHTML = title.dataset.billing;
//             $('#mdm_order_address_type').val(2);
//             $('#mdm_order_address_isoBillingAddress').val(0);
//             $("#js-shipping-title").hide();
//             $("#js-billing-title").show();

//             hideEditBtn();
//             if (typeof bindCapAddress === 'function') {
//                 bindCapAddress();
//             }
//         }

//         $(".js-form-address").toggle(!this.checked);
//     });
// }

// /* ****************BIND js-CapForm EVENTS**********************/
// function bindCapForm() {
//     if ($('.js-capForm').length && typeof bindCapAddress == 'function') {
//         bindCapAddress();
//     }
// }


// //todo make it global for all app

// /**
//  * CapAddress form manager
//  *
//  * @param capAddress lib object instance
//  */
// var CapAddressForm = function (form_selector, cap_address) {
//     this.form = $(form_selector);
//     this.capAddress = cap_address;
//     this.initSubmit();
// }

// /**
//  * init submit event
//  * @return void
//  */
// CapAddressForm.prototype.initSubmit = function () {
//     var that = this;
//     this.form.submit(function () {
//         that.capAddress.validateForm(this);
//         return true;
//     })
// }

// /***************** SHOW EDIT ADDRESS FORM ***************************/
// function showEditAddressForm(addressId) {
//     $.get(Routing.generate('mdm_order_delivery_address_form', {
//         'addressId': addressId,
//         'market': market,
//         'language': language
//     }), function (result) {
//         hideLoader();

//         $(".js-form-create-address").hide();
//         $(".js-form-update-address").html(result.form);
//         $(".js-form-update-address").show();

//         placeholderFormDisplay();
//         keyboardTabFix();
//         updateCountryFlag(result.market);

//         $(".js-form-update-address").slideDown('slow', function () {
//             scrolltoTarget($('.form--address'));
//         });

//         if (typeof bindCapAddress == 'function') {
//             bindCapAddress();
//         }

//     }).fail(function () {
//         redirectToDeliveryPage(market, language);
//     });
// }

// /********************** CREATE ADDRESS ACTION ************************/
// function processAddress($this, submit) {
//     var form = $this.find('.js-form-address');
//     var infCompActive = form.find('.js-inf-comp-container').hasClass('active');
//     var cityInputDisabled = $('.js-cap-city.disabled');
//     var selectedLanguage = $("#js-country").find(':selected').data('default-language');
//     var selectedMarket = $("#js-country").find(':selected').data('country');
//     var mobilePhone = $('.js-mobile-phone').val();
//     var mobilePhoneError = $(".js-mobile-phone-error");
//     var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
//     var addressCodeQuality = {
//         default: '60',
//         contentious: '10',
//         forced: '63',
//         reject: '20',
//         truncate: '80',
//         valid: '00',
//     } 

//     $.ajax({
//         url: Routing.generate('mdm_order_delivery_process_address', {
//             'market': selectedMarket,
//             'language': selectedLanguage,
//             'mobilePhone': mobilePhone,
//             'carrierId': carrierId,
//             'submit': submit ? 1 : 0
//         }),
//         method: 'POST',
//         data: form.serialize(),
//         success: function (result) {
//             var resultAddressResponse = result.address;
            
//             $this.html(result.form);

//             if (infCompActive) {
//                 $this.find('.js-inf-comp-container').addClass('active');
//             }

//             if (result.success) {
//                 if (submit && result.valid_zipcode) {
//                     deliverySubmit(result.address.id, true);
//                     return false;
//                 }

//                 changeAddress(result.address.id, result.address.country, selectedLanguage);
//                 return false;
//             } else if (result.mobile_phone_error) {
//                 $(".js-mobile-phone-error.error-msg").html(result.mobile_phone_error);
//                 mobilePhoneError = $(".js-mobile-phone-error");
//                 if (typeof mobilePhoneError != "undefined") {
//                     mobilePhoneError.show();
//                     placeholderFormDisplay();
//                     mobilePhoneError.siblings(".input").addClass('error');
//                 }
//             } else if (result.address.score !== null && result.address.score !== addressCodeQuality.valid) {
//                 capVerifAddress(resultAddressResponse, addressCodeQuality);
//                 modalDisplay(popinParams.type.suggest); 
//             }

//             hideLoader();
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             redirectToDeliveryPage(market, language);
//         },
//         complete: function () {
//             columnEqualizer();
//             placeholderFormDisplay();
//             keyboardTabFix();
//             updateCountryFlag(market);
//             btnModifyAddress.addEventListener('click', modifyCustomerAddress, false);

//             if ($('.error').length) {
//                 var selectedOption = $("#js-country").find(":selected").data("country");
//                 scrolltoTarget($('.error:first'));
//                 updateCountryFlag(selectedOption);
//             }

//             if (typeof bindCapAddress == 'function') {
//                 bindCapAddress();
//             }

//             /**
//              * Need to manage placeholder behaviour on disabled input
//              */
//             if (typeof cityInputDisabled !== "undefined" && cityInputDisabled.length) {
//                 var cityValueExist = cityInputDisabled.val().length;

//                 if (cityValueExist) {
//                     $('.js-cap-city.disabled').next('label').addClass('slideup-placeholder');
//                 }
//             }
//         }
//     });
// }

// /********************** BILLING ADDRESS ****************************/
// $(".js-delivery_content").on('click', '#js-billing-address-component .js-edit-address', function () {
//     showLoader();
//     $('#js-billing-address-component .js-address-content').hide();
//     var addressId = $('#js-billing-address-component .js-address-content').data('address-id');
//     showEditAddressForm(addressId);
// });

// function keyboardTabFix() {
//     if (navigator.userAgent.indexOf('Android') != -1) {
//         $('.fields-content input').on('focus', function (e) {
//             $('body > .wrapper').css({ 'padding-bottom': '400px' });
//             scrolltoTarget($(this));
//         });
//     }
// }

// /* *************** CHOICE DELIVERY MODE  *************** */
// function choiceDeliveryMode() {
//     var inputChoiceContainer = $('.js-delivery-choice'),
//         inputChoice = $('.js-delivery-choice-entry');

//     inputChoiceContainer.on('click', inputChoice, function (e) {
//         if ($(this).hasClass('active') || $(this).hasClass('disabled')) {
//             return false;
//         }

//         var carrierId = $(this).find(inputChoice).data('carrier-id');
//         var href = $(this).find(inputChoice).data('href');
//         inputChoiceContainer.removeClass('active');
//         inputChoice.removeAttr('checked');
//         $(this).find(inputChoice).attr('checked', true);
//         $(this).addClass('active');
//         if (href) {
//             e.preventDefault();
//             $(location).attr("href", href);
//             showLoader();

//             return false;
//         }

//         deliveryReload(carrierId, '', '');
//         $('body').trigger('changeDeliveryMode', [this]);

//         return false;
//     });

//     infoToggle();
//     bindScheduleListener();
// }
// $( document ).ready(function() {
//     /* ********** IF BROWSER BACK BUTTON DETECTED > RELOAD PAGE *********** */
//     if ($('#refreshed').val() == 'true') {
//         $('#refreshed').val('false');
//     } else {
//         deliveryReload('', '', '');
//     }

//     /* ********************* Bind event for tracking ********************* */
//     $('body').on('changeAddress listAddress changeDeliveryMode markerClick', function(e, elem) {
//         initMdmRender(elem);
//     });

//     /* ********************* LOAD / ORIENTATION / RESIZE ********************* */
//     if($("html").is(".lt-ie10")) { /* ****** IE9 FIX ****** */
//         $(window).on('load', function () {
//             mobileDetect();
//             iosDetect();
//             placeholderFormDisplay();
//             errorDisableSubmitBtn();
//             keyboardTabFix();
//             columnEqualizer();
//             initStoreCheckbox();
//         });
//     } else { /* ****** OTHERS BROWSERS ****** */
//         $(window).on('load resize orientationchange', function () {
//             mobileDetect();
//             iosDetect();
//             placeholderFormDisplay();
//             errorDisableSubmitBtn();
//             keyboardTabFix();
//             columnEqualizer();
//             initStoreCheckbox();
//         });
//     }

//     activeRecapSticky();

//     /*------------- ORDER DELIVERY ADDRESS ------------*/
//     orderDeliveryAddress();

//     /*------------- ORDER DELIVERY CARRIER ------------*/
//     choiceDeliveryMode();

//     /*------------- ORDER DELIVERY PRM ------------*/
//     changeRelayAddress();
//     bindCurrentUserGeolocation();

//     /*------------- USER WITHOUT ADDRESS --------------*/
//     checkListAddress();
//     bindCapForm();

//     /*------------- DELIVERY SUBMIT ---------------------*/
//     bindSubmitBtn();

//     /*------------- ORDER DELIVERY SPLIT ---------------------*/
//     choiceDeliverySplitMode();


// }); // END $(document).ready
// /* ********************* RELAY MODAL ********************* */
// var currentSearchAddress = $('.js-search-address').val();
// var searchAddress = null;
// var SEARCH_ADDRESS_ACTION = 'search';
// var OPEN_POPIN_ACTION = 'open';

// function bindCloseModal() {
//     $('.js-btn-close-modal').on('click', function () {
//         modalDisplay(popinParams.type.map);
//         $('.js-search-address').val(currentSearchAddress);
//         errorSearchDisplayHide();
//         $('.error-active').removeClass('error-active').addClass('hide');
//         stateCloseModal = true;
//         if (!stateCloseCapModal) {
//             stateCloseCapModal = true;
//             launchCapVerifTracking('order.delivery.cap_verif.close');
//         }

//         return stateCloseModal;
//     });
// }

// function errorSearchDisplayShow() {
//     $('.js-search-address-error').removeClass('hide');
// }

// function errorSearchDisplayHide() {
//     $('.js-search-address-error').addClass('hide');
// };

// function checkSearchAddressVal(searchAddress) {
//     if (!searchAddress.length) {
//         errorSearchDisplayShow();
//     } else {
//         showLoader();
//         errorSearchDisplayHide();
//         $('.error-active').removeClass('error-active').addClass('hide');

//         refreshDeliveryPointByAddress(searchAddress, SEARCH_ADDRESS_ACTION);

//         // Hide mobile Keyboard
//         $('input[type=search]').blur();
//     }
// }

// function searchAction(e) {
//     e.preventDefault();
//     searchAddress = isOpenModal() ? $('.js-search-address').val() : $('.js-dp-search-address').val();
//     checkSearchAddressVal(searchAddress);
// }

// function changeRelayAddress() {
//     iconPath = "/order-static/common/img/pictos/";
//     markers = [];
//     map = null;

//     emptyFieldSearchAddress();

//     // Display relay popin
//     $('.js-btn-relay-mod').on('click', function () {
//         showLoader();
//         refreshDeliveryPointByAddress(currentSearchAddress, OPEN_POPIN_ACTION);
//     });

//     $('.js-btn-search-address').on('click', searchAction);
//     // Event for "search" button on mobile
//     $('.js-search-address-form').on('submit', searchAction);
// }

// function refreshDeliveryPointByAddress(address, action) {
//     var currentSelectedAddressId = $("#mdm_order_selected_shippingAddress_id").attr('data-shippingAddress-id');
//     $.ajax({
//         type: "GET",
//         url: Routing.generate('mdm_order_delivery_get_delivery_points', {
//             market: market,
//             language: language,
//             addressId: currentSelectedAddressId,
//             address: address
//         }),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             if (!stateCloseModal) {
//                 bindCloseModal();
//             }

//             var geoLoc = data.delivery_points;
//             if (geoLoc.state == 'success') {
//                 var addressLat = geoLoc.latitude;
//                 var addressLon = geoLoc.longitude;
//                 var points = geoLoc.points;
//                 var customerLatLng = new google.maps.LatLng(addressLat, addressLon);
//                 modalDisplay(popinParams.type.map);
//                 $('.js-prm-list-content').html(data.delivery_points_content);
//                 $('.js-address-proximity').text(address);
//                 $('.js-search-address').val(address);

//                 bindScheduleListener();
//                 bindDeliveryPointsListener();
//                 bindDeliveryPointsChoseListener();
//                 isMobile ? false : initMap(customerLatLng, points);
//                 var HighlightedDP = getHighlightedDeliveryPoint(points, $('.relay-addresses-container').data('dp-id'));
//                 bindDeliveryPoints(HighlightedDP);
//             } else {
//                 if (!isMobile) {
//                     emptyMap();
//                 }
//                 searchAddress = null;
//                 errorSearchDisplayShow();
//                 modalDisplay(popinParams.type.map);
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             redirectToDeliveryPage(market, language);
//         },
//         complete: function () {
//             hideLoader();
//             columnEqualizer();

//             if (action == OPEN_POPIN_ACTION) {
//                 var selectedDP = $('.relay-addresses-container').data('dp-id');
//             } else {
//                 var selectedDP = $('.js-relay-map-info-list-addresses').first().data('dp-id');
//             }

//             if (typeof selectedDP !== 'undefined') {
//                 scrollListToHighLightedDP(selectedDP);
//             }
//         }
//     })
// }

// function bindDeliveryPointsListener() {
//     $('.relay-map-info-list-addresses .js-dp-infos-pointer, .relay-map-info-list-addresses .js-dp-infos-title').on('click', function () {
//         var selectedDpId = $(this).parents('.relay-map-info-list-addresses').data('dp-id');
//         bindDeliveryPoints(selectedDpId);
//     });
// }

// /* ********** CHANGE DELIVERY POINT ************ */
// function bindDeliveryPointsChoseListener() {
//     $('.js-btn-form-choose').on('click', function () {
//         var containerSubmitBtn = $(this).closest('.js-relay-map-info-list-addresses');
//         var selectedDpId = $(this).data('dp-id');
//         var currentSelectedAddressId = $("#mdm_order_selected_shippingAddress_id").attr('data-shippingAddress-id');
//         var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
//         var $errorMessage = containerSubmitBtn.find('.msg-modifier--error');
//         currentSearchAddress = searchAddress != null ? searchAddress : currentSearchAddress;

//         $.ajax({
//             type: "GET",
//             url: Routing.generate('mdm_order_delivery_point_availability', {
//                 market: market,
//                 language: language,
//                 carrierId: carrierId,
//                 deliveryPointId: selectedDpId
//             }),
//             dataType: 'json',
//             cache: false,
//             success: function (data) {
//                 $('html, body').removeClass('no-overflow');
//                 if (data.success) {
//                     deliveryReload(carrierId, currentSelectedAddressId, selectedDpId, currentSearchAddress);
//                 } else if ('content' in data) {
//                     if (!$errorMessage.length) {
//                         containerSubmitBtn.prepend(data.content);
//                     }
//                 }
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 redirectToDeliveryPage(market, language);
//             }
//         });
//     });
// }

// /* *************** SCHEDULE *************** */
// function bindScheduleListener() {
//     $('.js-schedule-content-title').on('click', function (event) {
//         event.preventDefault();
//         if (event.handled !== true) {
//             $(this).toggleClass('active');
//             $(this).parents('.js-relay-addresses-container').find('.js-schedule-content-body').toggleClass('active');
//             scrolltoTarget($(this));
//             event.handled = true;
//         }
//     });
// }

// /* ******* CURRENT USER GEOLOCATION ******** */
// function bindCurrentUserGeolocation() {
//     $('.js-delivery_content').on('click', '.js-btn-my-geolocation', function () {
//         showLoader();

//         var geolocationContainerSelector = '.js-my-geolocation-container';
//         var trackingCateogry = $(geolocationContainerSelector).data('tracking-category');
//         var trackingAction = $(geolocationContainerSelector).data('tracking-action');

//         if (navigator.geolocation == false) {
//             $('.js-geoloc-support').removeClass('hide');
//             $('.js-geoloc-support').addClass('error-active');
//             launchMdmEvent(5, trackingCateogry, trackingAction, 'Geoloc PRM navigator support');
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(function (position) {
//             var latitude = position.coords.latitude;
//             var longitude = position.coords.longitude;
//             customerLatLng = new google.maps.LatLng(latitude, longitude);

//             $.ajax({
//                 type: "GET",
//                 url: Routing.generate('mdm_order_delivery_get_delivery_points_by_geolocation', {
//                     market: market,
//                     language: language,
//                     longitude: longitude,
//                     latitude: latitude
//                 }),
//                 dataType: 'json',
//                 cache: false,
//                 success: function (data) {
//                     $('.js-geoloc-errors').hide();
//                     if (!stateCloseModal) {
//                         bindCloseModal();
//                     }

//                     var geoLoc = data.delivery_points;
//                     if (geoLoc.state == 'success') {
//                         var points = geoLoc.points;
//                         $('.js-prm-list-content').html(data.delivery_points_content);
//                         modalDisplay(popinParams.type.map);
//                         bindScheduleListener();
//                         bindDeliveryPointsListener();
//                         bindDeliveryPointsChoseListener();
//                         isMobile ? false : initMap(customerLatLng, points);
//                         var HighlightedDP = getHighlightedDeliveryPoint(points, $('.relay-addresses-container').data('dp-id'));
//                         bindDeliveryPoints(HighlightedDP);
//                     }

//                     var geocoder = new google.maps.Geocoder();
//                     geocoder.geocode({
//                         'latLng': customerLatLng
//                     }, function (results, status) {
//                         if (status === google.maps.GeocoderStatus.OK) {
//                             if (results[1]) {
//                                 $('.js-search-address').val(results[1].formatted_address);
//                                 $('.js-address-proximity').text(results[1].formatted_address);
//                                 searchAddress = results[1].formatted_address;
//                             }
//                         }
//                     });

//                     hideLoader();
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                     redirectToDeliveryPage(market, language);
//                 }
//             })
//         }, function (error) {
//             var jsPermissionErrorSelector = '.js-geoloc-permission-denied',
//                 jsGeneralErrorSelector = '.js-geoloc-general',
//                 trackingLabel = '',
//                 errorClasses = 'error-active msg-modifier--error';

//             switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                     $(jsPermissionErrorSelector).removeClass('hide');
//                     $(jsPermissionErrorSelector).addClass(errorClasses);
//                     trackingLabel = 'Geoloc PRM inactive';
//                     break;
//                 case error.TIMEOUT:
//                     $(jsGeneralErrorSelector).removeClass('hide');
//                     $(jsGeneralErrorSelector).addClass(errorClasses);
//                     trackingLabel = 'Geoloc PRM timeout';
//                     break;
//                 case error.POSITION_UNAVAILABLE:
//                     $(jsGeneralErrorSelector).removeClass('hide');
//                     $(jsGeneralErrorSelector).addClass(errorClasses);
//                     trackingLabel = 'Geoloc PRM position unavailable';
//                     break;
//                 case error.UNKNOWN_ERROR:
//                     $(jsGeneralErrorSelector).removeClass('hide');
//                     $(jsGeneralErrorSelector).addClass(errorClasses);
//                     trackingLabel = 'Geoloc PRM unknown error';
//                     break;
//             }
//             hideLoader();
//             launchMdmEvent(5, trackingCateogry, trackingAction, trackingLabel);
//         }, { maximumAge: 600000, enableHighAccuracy: true });
//     });
// }

// /* ******* GET DELIVERY POINT TO HIGHLIGHT ID ******** */
// function getHighlightedDeliveryPoint(points, selectedDP) {
//     var highlightedDP = null;
//     if (points.length > 0) {
//         points.forEach(function (point) {
//             if (point.id == selectedDP) {
//                 highlightedDP = selectedDP;
//             }
//         });

//         if (!highlightedDP) {
//             highlightedDP = points[0].id;
//         }
//     } else {
//         highlightedDP = selectedDP;
//     }

//     return highlightedDP;
// }

// /* ******* UPDATE SCROLL TO SELECTED/HIGHLIGHTED DELIVERY POINT IN LIST ******** */
// function scrollListToHighLightedDP(selectedDP) {
//     var highLightedDP = selectedDP,
//         deliveryPointID = $('#dp-' + highLightedDP),
//         containerDPList = isMobile ? $('.modal-container') : $('.js-prm-list-content'),
//         containerDPListTop = containerDPList.offset().top;

//     if (typeof deliveryPointID.offset() !== 'undefined') {
//         var DPTargetTop = isMobile ? deliveryPointID.offset().top - 30 : deliveryPointID.offset().top;
//     }

//     containerDPList.animate({
//         scrollTop: containerDPList.scrollTop() - containerDPListTop + DPTargetTop
//     }, 400);
// }

// /*------------- ORDER DELIVERY SPLIT ------------*/
// function choiceDeliverySplitMode() {
//     var splitOptionContainer = $('.js-split-option-container');
//     var splitOptions = $('.js-split-option');
//     var inputChoices = $('.js-split-option-entry');
//     var panBlock = $('#bl-pan-date-split');
//     var isSplitted = splitOptionContainer.hasClass('js-splitted');
    
//     if (typeof splitOptionContainer !== "undefined" && typeof splitOptions !== "undefined") {
//         /**
//          * Check if user has already choose a split option
//          */
//         if (isSplitted) {
//             splitOptions.removeClass('active');
//             inputChoices.removeProp('checked');
//             splitOptions.eq(1).addClass('active');
//             inputChoices.eq(1).prop('checked', true);
//             panBlock.prop('checked', true);
//         }


//         /**
//          * User choose a split option
//          */
//         splitOptions.on('click', function (e) {
//             e.preventDefault();
//             var isActive = $(this).hasClass('active');
//             var inputChoicesValue = $(this).find(inputChoices).val();
//             var orderParams = { 'splitChoice': inputChoicesValue };

//             if (isActive) {
//                 return false;
//             }

//             splitOptions.removeClass('active');
//             inputChoices.removeProp('checked');
//             $(this).find(inputChoices).prop('checked', true);
//             $(this).addClass('active');

//             deliveryReload('', '', '', '', orderParams);
//         });
//     }
// }

// /* ********************* MOBILE DEVICE DETECTION  ********************* */
// function mobileDetect() {
//     var checkedBloc = $('input[name=delivery-choice-entry]:checked', '.delivery-choice-list');

//     // use of undefined variables just pray
//     if ((!isMobile) && (!$('div.cs-select').length)) {
//         selectRender();
//     }

//     checkedBloc.parent().addClass('active');
//     $('.submit-container').addClass('active');
// }

// function iosDetect() {
//     if (navigator.userAgent.match(/(iPad|iPhone|iPod touch)/i)) {
//         var selects = document.querySelectorAll("select.address-list");
//         for (var i = 0; i < selects.length; i++) {
//             selects[i].appendChild(document.createElement("optgroup"));
//         }
//     }
// }

// /* ********************* CHECK IF MODAL IS OPEN ********************* */
// function isOpenModal() {
//     return $('.modal-container').hasClass('open');
// };

// /* ************************ COLUMN EQUALIZER *********************************** */
// function columnEqualizer() {
//     var firstCol = $('.js-recap-title'),
//         firstColHeight = firstCol.outerHeight(),
//         secondCol = $('.js-recap-more-info');

//     secondCol.outerHeight(firstColHeight);
// }

// /* ********************* SCROLL TO [FORM] ********************* */
// function scrolltoTarget(blocTarget) {
//     if (blocTarget.offset() != undefined) {
//         var inputTargetTop = blocTarget.offset().top;

//         $('body,html').animate({
//             scrollTop: inputTargetTop
//         }, 800);
//     }
// }

// /* ********************* LOADER / BTN ********************* */
// var $loaderContainerTag = $('.js-loader-container'),
//     $loaderContentTags = $('.js-loader-anim, .js-loader-message');

// function showLoader() {
//     $loaderContainerTag.css('position', 'fixed');
//     $loaderContentTags.addClass('active');
// }

// function hideLoader() {
//     $loaderContainerTag.css('position', '');
//     $loaderContentTags.removeClass('active');
// }

// function disableStoreCheckbox() {
//     $('#js-isoBilling').prop('checked', true);
//     $('#js-isoBilling-row').hide();
//     $('.js-storeForm').hide();
// }

// function hideStoreCheckbox() {
//     $('#js-isoBilling-row').hide();
// }

// function errorDisableSubmitBtn() {
//     if ($('.js-error').length) {
//         scrolltoTarget($('.msg-modifier--error:first'));
//         disableSubmitBtn();
//     }
// }

// function disableSubmitBtn() {
//     $('.btn-form--submit').removeClass('btn-form--submit').addClass('btn-form--submit-disable');
// }

// function enableSubmitBtn() {
//     if (!$('.js-error').length) {
//         $(".btn-form--submit-disable").removeClass("btn-form--submit-disable").addClass('btn-form--submit');
//     }
// }

// function redirectToDeliveryPage(market, language) {
//     window.location.href = Routing.generate('mdm_order_delivery', {
//         market: market,
//         language: language
//     });
// }

// /* ********************* TOGGLE INFO PANEL ********************* */
// function infoToggle() {
//     var blInfoItems = [].slice.call(document.querySelectorAll('.js-bl-info-item')),
//         toogleInfoItems = [].slice.call(document.querySelectorAll('.js-toogle-infos'));

//     blInfoItems.forEach(function (blInfoItem) {
//         blInfoItem.addEventListener('click', function (e) {
//             var target = e.target;
//             var infoItems = [].slice.call(this.querySelectorAll('.js-more-infos, .js-less-infos'));

//             toogleInfoItems.forEach(function (toogleInfoItem) {
//                 if (target == toogleInfoItem) {
//                     infoItems.forEach(function (infoItem) {
//                         infoItem.classList.toggle('switch-off');
//                     });
//                 }
//             });
//         });
//     });
// }

// function emptyFieldSearchAddress() {
//     $('.js-erase-search-address').on('click', function () {
//         var searchAddressVal = isOpenModal() ? $('.js-search-address').val('') : $('.js-dp-search-address').val('');
//         $('input[type=search]').focus();
//     });
// }

// /*------------- STICKY RECAP ------------*/
// function activeRecapSticky() {
//     var stickyBlock = $('#sticky-recap');

//     if (typeof stickyBlock != "undefined") {
//         stickyBlock.affix({
//             offset: {
//                 top: stickyBlock.offset().top
//             }
//         });
//     }
// }

// /* ********* RELOAD DELIVERY PAGE BASED ON PARAMETERS ******** */
// function deliveryReload(carrierId, addressId, deliveryPointId, searchAddress, orderParams) {
//     var splitChoice = null;
//     searchAddress = typeof searchAddress !== 'undefined' ? searchAddress : null;
//     if (typeof orderParams !== 'undefined') {
//         splitChoice = typeof orderParams.splitChoice !== 'undefined' ? orderParams.splitChoice : null;
//     }

//     showLoader();
//     $.ajax({
//         type: "GET",
//         url: Routing.generate('mdm_order_delivery', {
//             market: market,
//             language: language,
//             shippingAddressId: addressId,
//             carrierId: carrierId,
//             deliveryPointId: deliveryPointId,
//             searchAddress: searchAddress,
//             splitChoice: splitChoice
//         }),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             if (data.success) {
//                 $(".js-delivery_content").html(data.content);

//                 mobileDetect();
//                 iosDetect();
//                 columnEqualizer();
//                 choiceDeliveryMode();
//                 changeRelayAddress();
//                 checkListAddress();
//                 bindCapForm();
//                 bindSubmitBtn();
//                 initStoreCheckbox();
//                 currentSearchAddress = $('.js-search-address').val();
//                 choiceDeliverySplitMode();
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             redirectToDeliveryPage(market, language);
//         },
//         complete: function () {
//             var formContainer = $('.js-forms-container');
//             var checkMobilePhone = $('.js-form-create-address').parent('#js-billing-address-component').prev('.js-mobile-phone-container').length;
//             var mobilePhonecontainer = $('.js-mobile-phone-container');
//             var formAddress = checkMobilePhone ? mobilePhonecontainer : formContainer;
//             stateCloseModal = false;

//             errorDisableSubmitBtn();
//             activeRecapSticky();
//             $('#js-isoBilling-row').hide();
//             hideLoader();
//             columnEqualizer();
//             initStoreCheckbox();

//             if (splitChoice !== null) {
//                 $('#bl-pan-date-split').prop('checked', true);
//                 scrolltoTarget($('.js-bl-info-item'));
//                 return false;
//             }
//             scrolltoTarget(formAddress);
//         }
//     })
// }

// /***************** DELIVERY SUBMIT ***************************/
// function deliverySubmit(addressId, refresh) {
//     refresh = (refresh === true) ? 1 : 0;
//     showLoader();
//     var mobilePhone = $('.js-mobile-phone').val(),
//         mobilePhoneError = $(".js-mobile-phone-error");
//     var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
//     $.ajax({
//         type: "GET",
//         url: Routing.generate('mdm_order_delivery_submit', {
//             'addressId': addressId,
//             'mobilePhone': mobilePhone,
//             'market': market,
//             'language': language,
//             'refresh': refresh,
//             'carrierId': carrierId
//         }),
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             if (data.redirect) {
//                 if ('store' == context
//                     && $('.js-form-address').is(':visible')
//                     && $('#mdm_order_address_type').val() != 2
//                 ) {
//                     window.location.reload();
//                 } else {
//                     window.location.href = data.url;
//                 }
//             } else {
//                 $(".js-mobile-phone-error.error-msg").html(data.error);
//                 if (typeof mobilePhoneError != "undefined") {
//                     mobilePhoneError.show();
//                     placeholderFormDisplay();
//                     mobilePhoneError.siblings(".input").addClass('error');
//                 }
//                 hideLoader();
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             redirectToDeliveryPage(market, language);
//         },
//         complete: function () {
//             scrolltoTarget($('.error:first'));
//         }
//     });
// }

// function bindSubmitBtn() {
//     $('.js-btn-form-validate').on('click', function (e) {
//         e.preventDefault();
//         var isCreateAddressFormOn = $('.js-form-create-address').length && $('.js-form-create-address').css('display') !== 'none';
//         var isUpdateAddressFormOn = $('.js-form-update-address').length && $('.js-form-update-address').css('display') !== 'none';

//         if ($('.js-dp-search-address-form').length) {
//             $(".js-btn-search-address").trigger("click");
//         } else if (isCreateAddressFormOn) {
//             showLoader();
//             btnModifyAddress.addEventListener('click', modifyCustomerAddress, false);
//             bindChoiceBtn(true);
//             processAddress($('.js-form-create-address'), true);
//         } else if (isUpdateAddressFormOn) {
//             showLoader();
//             btnModifyAddress.addEventListener('click', modifyCustomerAddress, false);
//             bindChoiceBtn(true);
//             processAddress($('.js-form-update-address'), true);
//         } else {
//             var selector = $("#mdm_order_selected_shippingAddress_id");
//             var addressId = selector.attr('data-shippingAddress-id');

//             if (!addressId) {
//                 addressId = selector.attr('data-billing-address-id');
//             }

//             deliverySubmit(addressId, false);
//         }
//     });
// }

// /***************** POPIN MANAGEMENT ***************************/
// var stateCloseModal;
// var stateCloseCapModal = true;

// /**
//  * Manage popin type/context
//  */
// var popinParams = {
//     type: {
//         map: 'map',
//         suggest: "suggest-adress"
//     }
// }

// function modalDisplay(type) {
//     var modalContainer = $('.modal-container');
//     var modalOpen = $('.modal-container').hasClass('open');

//     if (modalContainer.length && !modalOpen) {
//         hideLoader();
//         $('html, body').addClass('no-overflow');
//         modalContainer.addClass('open ' + type);
//     } else {
//         $('html, body').removeClass('no-overflow');
//         modalContainer.removeClass('open ' + type);
//     }

// }

// /***************** CAP VERIF ***************************/
// var btnModifyAddress = document.querySelector('.js-btn-address-modify');

// function bindChoiceBtn(submit = false) {
//     var choiceButton = document.querySelector('#choose-customer-address');
//     choiceButton.addEventListener('click', function() {
//         launchCapVerifTracking('order.delivery.cap_verif.click_address');
//         forceCustomerAddress(submit);
//     }, false);
// }

// function forceCustomerAddress(submit = false) {
//     var orderAddressForce = document.querySelector('#mdm_order_address_force');
//     var blocFormAddress = ($('.js-form-update-address').is(':visible')) ? $('.js-form-update-address') : $('.js-form-create-address');

//     showLoader();
//     orderAddressForce.value = 'true';
//     processAddress($(blocFormAddress), submit);
// }

// function updateAddressFields(number, street, zipcode, city) {
//     var zipcodeField = document.querySelector('.js-cap-zipcode');
//     var cityField = document.getElementById('city');
//     var addressField = document.getElementById('address');

//     zipcodeField.value = zipcode;
//     cityField.value = city;
//     addressField.value = number + ' ' + street;

//     forceCustomerAddress();
// }

// function fillSuggestAddressList(fragment, itemButton, number, street, zipcode, city) {
//     var itemAddress = document.createElement('li');
//     var itemInfo = document.createElement('span');

//     itemAddress.classList.add('item-address', 'row');
//     itemInfo.classList.add('item-info', 'col-xs-7');
//     itemButton.classList.add('btn', 'btn-lg', 'btn-form--choose', 'js-btn-form-choose', 'col-xs-4', 'col-xs-offset-1');
//     itemInfo.innerText = number + ' ' + street + ' ' + zipcode + ' ' + city;

//     itemAddress.appendChild(itemInfo);
//     itemAddress.appendChild(itemButton);
//     fragment.appendChild(itemAddress);

//     return [fragment, itemButton];
// }

// function modifyCustomerAddress() {
//         $('html, body').removeClass('no-overflow');
//         $('.modal-container').removeClass('open');
//         scrolltoTarget($('.form--address'));
//         stateCloseModal = true;
//         stateCloseCapModal = true;
//         launchCapVerifTracking('order.delivery.cap_verif.edit');
//         return stateCloseModal;
// }

// function hideSuggestAddressBloc(bloc) {
//     if (typeof bloc !== 'undefined' && bloc !== null) {
//         bloc.classList.add('hide');
//     }
// }

// function capVerifAddress(addressResponse, codeQuality) {
//     /* Response vars */
//     var suggestResponse = addressResponse.suggestions;
//     var suggestAddressLength = suggestResponse.length;

//     /* Form vars */
//     var zipcodeField = document.querySelector('.js-cap-zipcode');
//     var cityField = document.getElementById('city');
//     var addressField = document.getElementById('address');

//     /* DOM vars*/
//     var suggestListWrapper = document.querySelector('#suggest-list');
//     var validAddressBloc = document.querySelector('.js-valid-address');

//     capTrackingData = addressResponse.track;
//     stateCloseCapModal = false;
//     launchCapVerifTracking('order.delivery.cap_verif.display');

//     if (!stateCloseModal) {
//         bindCloseModal();
//     }

//     /* Reset suggest list*/
//     if (suggestListWrapper !== null && suggestListWrapper.firstChild) {
//         suggestListWrapper.removeChild(suggestListWrapper.firstChild)
//     }

//     if (addressResponse.score !== codeQuality.reject) {
//         var domFragment = document.createDocumentFragment();

//         /* Suggest list address */
//         for (var i = 0, size = suggestAddressLength; i < size; i++) {
//             var choiceButton = document.createElement('button');

//             var numberSuggestAddress = suggestResponse[i].number || '';
//             var streetSuggestAddress = suggestResponse[i].address_line;
//             var zipCodeSuggestAddress = suggestResponse[i].zip_code;
//             var citySuggestAddress = suggestResponse[i].city;

//             choiceButton.innerText = addressResponse.trans.choose;
//             fillSuggestAddressList(domFragment, choiceButton, numberSuggestAddress, streetSuggestAddress, zipCodeSuggestAddress, citySuggestAddress);

//             choiceButton.addEventListener('click', function (event) {
//                 launchCapVerifTracking('order.delivery.cap_verif.click_suggest');
//                 updateAddressFields(numberSuggestAddress, streetSuggestAddress, zipCodeSuggestAddress, citySuggestAddress);
//             }, false);
//         }
//     }

//     if (typeof suggestListWrapper !== 'undefined' && suggestListWrapper !== null) {
//         validAddressBloc.classList.remove('hide');
//         if (typeof domFragment !== 'undefined') {
//             suggestListWrapper.appendChild(domFragment);
//         }

//         if (!suggestListWrapper.childElementCount) {
//             hideSuggestAddressBloc(validAddressBloc);
//         }
//     }

//     /* Invalid Customer address */
//     var customerAddressInfo = document.querySelector('#customer-address-info');
//     customerAddressInfo.innerText = addressField.value + ' ' + zipcodeField.value + ' ' + cityField.value;
// }

// /* cap verif tracking data*/
// var capTrackingData = [];

// function launchCapVerifTracking(key) {
//     if (key in capTrackingData) {
//         /* launch tracking */
//         var trackDisplay = capTrackingData[key].split("|");
//         launchMdmEvent(5, trackDisplay[0], trackDisplay[1], trackDisplay[2]);
//     }
// }
// /*
//  * Scripts for order Google MAP API
//  */

// /* *************** GOOGLE MAP CONFIG *************** */
// function bindDeliveryPoints(selectedDpId) {
//     if(!isMobile) {
//         var zindex = 100;
//         markers.forEach(function (marker) {
//             var label = marker.getLabel();
//             zindex++;

//             if (label !== undefined) {
//                 if (marker.get('dp-id') == selectedDpId) {
//                     label.color = "#ffffff";
//                     marker.setIcon(getMapIcons(marker.get('dp-type')).selected);
//                     marker.setLabel(label);
//                     marker.setZIndex(1000);
//                 } else {
//                     label.color = "#3b3b3b";
//                     marker.setIcon(getMapIcons(marker.get('dp-type')).default);
//                     marker.setLabel(label);
//                     marker.setZIndex(zindex);
//                 }
//             }
//         });
//     }

//     $('.relay-map-info-list-addresses-content li').each(function () {
//         $(this).removeClass('selected');
//         $(this).find('.js-dp-infos').removeClass('current');
//     });

//     $('#dp-' + selectedDpId).addClass('selected');
//     $('#dp-' + selectedDpId).find('.js-dp-infos').addClass('current');
// }

// /* *************** MAP INIT *************** */
// function initMap(latLng, points) {
//     //Return false on mobile (width device less than 480)
//     var isDraggable = $(document).width() > 480 ? true : false;

//     map = createMap(latLng, isDraggable, 12);

//     /* **** ADD MARKERS AND SET MAP BOUNDS TO FIT ALL MARKERS **** */
//     var bounds = new google.maps.LatLngBounds();
//     var selectedDpId = $('.relay-addresses-container').data('dp-id');
//     markers = [];
//     points.forEach(function(point, index) {
//         var marker = addMarker(point, index);
//         markers.push(marker);
//         bounds.extend(marker.getPosition());
//     });

//     var marker = new google.maps.Marker({
//         icon: iconPath + 'geoloc-position.svg',
//         map: map,
//         position: latLng,
//         title: '',
//     });

//     bounds.extend(marker.getPosition());
//     map.fitBounds(bounds);

//     // Add markers on map
//     function addMarker(point, index) {
//         var iconId = index+1;

//         var marker = new google.maps.Marker({
//             label: {
//                 color: "#3b3b3b",
//                 fontSize: "15px",
//                 fontWeight: "bold",
//                 labelClass: "labels",
//                 text: ''+ iconId +'',
//             },
//             map: map,
//             position: new google.maps.LatLng(point.latitude, point.longitude),
//             optimized: false,
//             title: point.title,
//             zIndex: 100
//         });

//         marker.set('dp-id', point.id);
//         marker.set('dp-type', point.type.name);

//         marker.addListener('click', function() {
//             var selectedDP = marker.get('dp-id');

//             bindDeliveryPoints(marker.get('dp-id'));
//             scrollListToHighLightedDP(selectedDP);
//         });

//         return marker;
//     }

//     /* ADD LIST INDEX ON MARKERS PICTOS */
//     var listMarker = $('.js-relay-map-info-list-addresses'),
//         pointerMarker = $('.js-pointer-number');

//     listMarker.each(function(index) {
//         $(this).find(pointerMarker).text(index+1);
//     });
// }

// /* GENERATE SVG MARKERS ON THE MAP */
// var markerFile = {
//     BPR: 'geoloc-marker-yellow.svg',
//     BDP: 'geoloc-marker-yellow.svg',
//     ACP: 'geoloc-marker-orange.svg',
//     CMT: 'geoloc-marker-orange.svg',
//     A2P: 'geoloc-marker-orange.svg',
//     CDI: 'geoloc-marker-orange.svg',
//     store: 'geoloc-marker.svg',
//     relay: 'geoloc-marker.svg'
// };

// function getMapIcons(carrierType) {
//     return {
//         default: {
//             labelOrigin: new google.maps.Point(21, 17),
//             scaledSize: new google.maps.Size(40, 40),
//             url: iconPath + markerFile[carrierType]
//         },
//         selected: {
//             labelOrigin: new google.maps.Point(21, 17),
//             scaledSize: new google.maps.Size(40, 40),
//             url: iconPath + 'geoloc-selected.svg'
//         }
//     }
// }

// function emptyMap() {
//     createMap(new google.maps.LatLng(46.386250, 3.151197), false, 6);
// }

// function createMap(latLng, isDraggable, zoom) {
//     map = new google.maps.Map(document.getElementById('js-relay-map-embed'), {
//         center: latLng,
//         draggable: isDraggable,
//         mapTypeControl: false,
//         disableDoubleClickZoom: false,
//         zoomControl: isDraggable,
//         zoomControlOptions: {
//             position: google.maps.ControlPosition.RIGHT_CENTER
//         },
//         minZoom: 4,
//         scrollwheel: isDraggable, // Prevent users to start zooming the map when scrolling down the page
//         streetViewControl: false,
//         zoom: zoom
//     });

//     return map;
// }
// /*
//  * Scripts common to several order pages
//  */

// // script async function
// function asyncScript(scriptUrl)
// {
//     var s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = true;
//     s.src = scriptUrl;document.getElementsByTagName('script')
//     if (document.getElementsByTagName('script').length>0) {
//         var x = document.getElementsByTagName('script')[0];
//     } else {
//         var x = document.getElementsByTagName('head')[0];
//     }
//     x.parentNode.insertBefore(s, x);
// }
