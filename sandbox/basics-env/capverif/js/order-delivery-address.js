var createForm = null;

/*------------- ORDER DELIVERY ADDRESS ------------*/
function orderDeliveryAddress() {
    $('body').on('click', 'div.cs-select.cs-active', function () {
        $('body').trigger('listAddress', [$('select.address-list').get(0)]);
    });

    /* ********************* CREATE / UPDATE ********************* */
    /* *************** CREATE EVENTS *************** */
    $(".js-delivery_content").on('click', '#js-create-address', function (e) {
        e.preventDefault();
        $(".js-form-update-address").html("");
        $(".js-form-create-address").html(createForm);
        $("#js-shipping-title").show();
        $("#js-billing-title").hide();

        var addressType = document.querySelector('#js-create-address').dataset.addressType;
        document.querySelector('#mdm_order_address_type').value = addressType;

        var formCreateAddress = document.querySelector(".js-form-create-address");
        var title = formCreateAddress.querySelector('[data-delivery]');
        title.innerHTML = title.dataset.delivery;
        disableStoreCheckbox();
        showFormCreate();
        hideEditBtn();
        if (typeof bindCapAddress == 'function') {
            bindCapAddress();
        }
    });

    /* *************** UPDATE EVENTS *************** */
    $(".js-delivery_content").on('click', '#js-update-address', function (e) {
        e.preventDefault();
        $(".js-form-create-address").html("");
        showLoader();
        disableStoreCheckbox();
        hideEditBtn();

        var currentSelectedAddressId = $("#mdm_order_list_addresses_shippingAddresses").val();
        if (!currentSelectedAddressId) {
            return false;
        }

        showEditAddressForm(currentSelectedAddressId);
    });

    $(".js-delivery_content").on('submit', '.js-form-update-address .js-form-address', function () {
        showLoader();
        processAddress($('.js-form-update-address'), false);
        return false;
    });

    /* *************** CREATE EVENTS *************** */
    $(".js-delivery_content").on('submit', '.js-form-create-address .js-form-address', function () {
        showLoader();
        processAddress($('.js-form-create-address'), false);

        return false;
    });

    /* *************** CANCEL EVENTS *************** */
    $(".js-delivery_content").on('click', '.js-btn-form-cancel', function () {
        $(".js-form-create-address").hide();
        $(".js-form-update-address").hide();
        $("#js-billing-address-component .js-address-content").show();
        showEditBtn();
        initMdmRender(this);
        selectFirstAddress();
        initStoreCheckbox();
        return false;
    });

    $(".js-delivery_content").on('focus', 'select[data-event-change="address-list-change"]', function () {
        previousValue = this.value;
    });

    /* **************** VALIDATE FORM WITH INVALID ADDRESS // IE9 FIX **************** */
    if ($("html").is(".lt-ie10")) {
        $(".js-delivery_content").on('click', '.js-btn-form-validate', function () {
            if ($(this).hasClass('btn-form--submit-disable')) {
                return false;
            }
        });
    }

    /* **************** ADDRESS CHANGE EVENTS **************** */
    $(".js-delivery_content").on('change', 'select[data-event-change="address-list-change"]', function () {
        var selectedOption = $(this).find(":selected");

        changeAddress($(this).val(), selectedOption.data('country'), selectedOption.data('default-language'));
    });

    /* **************** MOBILE PHONE CHANGE EVENTS **************** */
    $(".js-delivery_content").on('focusout', 'input#phone,input#mobile-phone', function () {
        var phones = $(".js-delivery_content .js-phonenumber, .js-delivery_content .js-mobile-phone");

        if (phones.length != 2) {
            return false;
        }

        var socoFirst = phones.first().attr('id') == 'mobile-phone';
        var socoPhone = socoFirst ? phones.first() : phones.last();
        var addressPhone = socoFirst ? phones.last() : phones.first();

        if (socoPhone.is(":visible") && addressPhone.is(":visible") && !phones.hasClass('mirrored')) {
            if (socoFirst) {
                addressPhone.val(addressPhone.val().length == 0 ? socoPhone.val() : addressPhone.val());
            } else {
                socoPhone.val(socoPhone.val().length == 0 ? addressPhone.val() : socoPhone.val());
            }
            phones.addClass('mirrored');
        }
    });

    /* **************** COUNTRY CHANGE EVENTS **************** */
    $(".js-delivery_content").on('change', 'select#js-country', function () {
        var selectedOption = $(this).find(":selected").data('country');

        updateCountryFlag(selectedOption);
    });
} // end orderDeliveryAddress

/* ******************************* PLACEHOLDER / INPUT/TEXTAREA/OPTIONAL  ********************* */
function placeholderFormDisplay() {
    if ($("html").is(".lt-ie10")) { /* ****** IE9 FIX ****** */
        var $specificField = $('.js-form-update-address input, .js-form-update-address textarea, .js-form-create-address input, .js-form-create-address textarea');
        $input = $('.fields-content .input[required=required]');

        $specificField.each(function () {
            if ($(this).val().length) {
                $(this).next('label').removeClass('slideup-placeholder');
                $(this).next('label').addClass('slideup-placeholder');
            }
        });

        $specificField.focusout(function () {
            if ($(this).val().length) {
                $(this).next('label').removeClass('slideup-placeholder');
                $(this).next('label').addClass('slideup-placeholder');
            } else {
                $(this).next('label').removeClass('slideup-placeholder');
            }
        });

    } else { /* ****** OTHERS BROWSERS****** */
        var $specificField = $('.js-form-update-address input:optional, .js-form-update-address textarea, .js-form-create-address input:optional, .js-form-create-address textarea'),
            $input = $('.fields-content .input:required');

        $specificField.each(function () {
            if ($(this).val().length) {
                $(this).next('label').removeClass('slideup-placeholder');
                $(this).next('label').addClass('slideup-placeholder');
            }
        });

        $specificField.focusout(function () {
            if ($(this).val().length) {
                $(this).next('label').removeClass('slideup-placeholder');
                $(this).next('label').addClass('slideup-placeholder');
            } else {
                $(this).next('label').removeClass('slideup-placeholder');
            }
        });
    }

    /* *************** ERROR MSG *************** */
    $input.each(function () {
        if ($(this).siblings('.error-msg').is(':visible') && $(this).val().length <= 0) {
            $(this).next('.label').removeClass('slideup-placeholder').addClass('slidedown-placeholder');
        }
    });

    $input.focus(function () {
        if ($(this).siblings('.error-msg').is(':visible')) {
            $(this).removeClass('error');
            $(this).siblings('.error-msg').css('display', 'none');
            $(this).siblings('.label').removeClass('slidedown-placeholder');
        }
    });


    $input.focusout(function () {
        if ($(this).val().length === 0 && $(this).siblings('.error-msg').length) {
            $(this).siblings('.error-msg').css('display', 'block');
            $(this).next('label').addClass('slidedown-placeholder');
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });

    (function taxCodeValidator() {
        var $taxCodeInput = $('.js-form-create-address .inf-comp-content .taxCode');

        var validTaxCode = new RegExp('^[a-z0-9A-Z]{16}$');

        if ($taxCodeInput.length) {
            $taxCodeInput.focus(function () {
                if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                    $(this).siblings('.error-msg').hide();
                    $(this).siblings('.label').removeClass('slidedown-placeholder');
                }
            }).focusout(function () {
                if (!($taxCodeInput.val() === "")) {
                    if (!(validTaxCode.test($taxCodeInput.val()))) {
                        $(this).addClass('error');
                        $(this).siblings('.error-msg').show();
                        $(this).parents('.inf-comp-content').addClass('error');
                    }
                } else { $(this).parents('.inf-comp-content').removeClass('error'); }
            });
        }
    })();
}

/* *************** COUNTRY FLAGS *************** */
function updateCountryFlag(countryChoice) {
    var selectorFlag = $('#js-country'),
        containerFlag = '<div id="js-flag" data-country="' + countryChoice + '">&nbsp;</div>';

    $('#js-flag').remove();
    selectorFlag.before(containerFlag);
}

/* *********************  ********************* */
function showFormCreate(scroll) {
    scroll = typeof (scroll) === 'undefined' ? true : scroll;

    $(".js-form-create-address").show(0, function () {
        placeholderFormDisplay();
        keyboardTabFix();
        updateCountryFlag(market);

        $('#js-country option[data-country="' + market + '"]').prop('selected', true);

        if (scroll) {
            setTimeout(function () {
                scrolltoTarget($('.form--address'));
            }, 160);
        }
    });
}

/* ********************* MARKET / LANGUAGE ********************* */
function changeAddress(addressId, selectedCountry, defaultLanguage) {
    showLoader();

    if (typeof (defaultLanguage) === 'undefined') {
        defaultLanguage = language;
    }

    if (market == selectedCountry) {
        deliveryReload('', addressId, '');
    } else {
        if ('store' == context) {
            defaultLanguage = language;
        }

        $.ajax({
            type: "GET",
            url: Routing.generate('mdm_order_delivery_select_shipping_address_id', {
                shippingAddressId: addressId
            }),
            dataType: 'json',
            cache: false,
            success: function (data) {
                redirectToDeliveryPage(selectedCountry, defaultLanguage);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                redirectToDeliveryPage(market, language);
                return false;
            }
        })
    }
}

function initStoreCheckbox() {
    var checkbox = $('#js-isoBilling-row');
    if ((checkbox.data("nb-address-type") == 1 || checkbox.data("nb-address-type") == 2) && !checkbox.data("add-billing-address")) {
        checkbox.show();
    } else {
        checkbox.hide();
    }
}

function selectFirstAddress() {
    var selectedAddress = $(".address-list option:first");

    $(".address-list .cs-placeholder").html($(selectedAddress).text());
    $(".address-list .cs-selected").removeClass('cs-selected');
    $('.address-list .cs-options li[data-value="' + $(selectedAddress).val() + '"]').addClass('cs-selected');
    $('.address-list select option[value="' + $(selectedAddress).val() + '"]').prop('selected', true);

    $(".address-list .cs-placeholder").html($(selectedAddress).text());

    $(".cs-select").removeClass('cs-active');
    $(".js-address-modifier").show();

    $(selectedAddress).attr('selected', 'selected');
}

function hideEditBtn() {
    $('#js-btn-container-edit').hide();
}

function showEditBtn() {
    $('#js-btn-container-edit').fadeIn('slow');
}

/* ********************* SELECT CUSTOM [ONLY ON DESKTOP] ********************* */
function selectRender() {
    (function () {
        [].slice.call(document.querySelectorAll('select.cs-select.address-list ')).forEach(function (el) {
            new SelectFx(el, {
                onChange: function (val) {
                    var selectedOption = $('select.address-list option[value="' + val + '"]');
                    $('body').trigger('changeAddress', [
                        $('<div data-tracking="Tunnel_Livraison|Selection|Adresse"></div>').get(0)
                    ]);

                    if ($(selectedOption).is(':first-child')) {
                        showEditBtn();
                        $(".js-form-update-address").hide();
                        $(".js-form-create-address").hide();

                        $("#js-update-address").show();

                        return false;
                    }

                    changeAddress(val, selectedOption.data('country'), selectedOption.data('default-language'));
                }
            });
        });
    })();

    var $selectLabel = $(".address-list-container label");
    $('.address-list-container .cs-placeholder').before($selectLabel);
}

/* **************** SHOW CREATE FORM AND DISABLE VALIDATE BTN IF NO LIST ADDRESS FOUND **************** */
function checkListAddress() {
    if ($('.js-form-create-address').length) {
        createForm = $(".js-form-create-address").html();
        if (!$('.js-address-list-container').length) {
            showFormCreate(false);
        }
    }

    $('#js-isoBilling').change(function () {
        if (this.checked) {
            $('#mdm_order_address_isoBillingAddress').val(1);
            $('#mdm_order_address_type').val(1);
            $(".js-form-create-address").hide();
            showEditBtn();
        } else {
            $(".js-form-update-address").html("");
            var formCreateAddress = document.querySelector(".js-form-create-address");
            formCreateAddress.innerHTML = createForm;
            showFormCreate();
            disableSubmitBtn();

            var title = formCreateAddress.querySelector('[data-billing]');
            title.innerHTML = title.dataset.billing;
            $('#mdm_order_address_type').val(2);
            $('#mdm_order_address_isoBillingAddress').val(0);
            $("#js-shipping-title").hide();
            $("#js-billing-title").show();

            hideEditBtn();
            if (typeof bindCapAddress === 'function') {
                bindCapAddress();
            }
        }

        $(".js-form-address").toggle(!this.checked);
    });
}

/* ****************BIND js-CapForm EVENTS**********************/
function bindCapForm() {
    if ($('.js-capForm').length && typeof bindCapAddress == 'function') {
        bindCapAddress();
    }
}


//todo make it global for all app

/**
 * CapAddress form manager
 *
 * @param capAddress lib object instance
 */
var CapAddressForm = function (form_selector, cap_address) {
    this.form = $(form_selector);
    this.capAddress = cap_address;
    this.initSubmit();
}

/**
 * init submit event
 * @return void
 */
CapAddressForm.prototype.initSubmit = function () {
    var that = this;
    this.form.submit(function () {
        that.capAddress.validateForm(this);
        return true;
    })
}

/***************** SHOW EDIT ADDRESS FORM ***************************/
function showEditAddressForm(addressId) {
    $.get(Routing.generate('mdm_order_delivery_address_form', {
        'addressId': addressId,
        'market': market,
        'language': language
    }), function (result) {
        hideLoader();

        $(".js-form-create-address").hide();
        $(".js-form-update-address").html(result.form);
        $(".js-form-update-address").show();

        placeholderFormDisplay();
        keyboardTabFix();
        updateCountryFlag(result.market);

        $(".js-form-update-address").slideDown('slow', function () {
            scrolltoTarget($('.form--address'));
        });

        if (typeof bindCapAddress == 'function') {
            bindCapAddress();
        }

    }).fail(function () {
        redirectToDeliveryPage(market, language);
    });
}


/********************** CREATE ADDRESS ACTION ************************/
function processAddress($this, submit) {
    var form = $this.find('.js-form-address');
    var infCompActive = form.find('.js-inf-comp-container').hasClass('active');
    var cityInputDisabled = $('.js-cap-city.disabled');
    var selectedLanguage = $("#js-country").find(':selected').data('default-language');
    var selectedMarket = $("#js-country").find(':selected').data('country');
    var mobilePhone = $('.js-mobile-phone').val();
    var mobilePhoneError = $(".js-mobile-phone-error");
    var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
    var addressQualityCode = {
        default: '60',
        contentious: '10',
        forced: '63',
        reject: '20',
        truncate: '80',
        valid: '00',
    } 

    $.ajax({
        url: Routing.generate('mdm_order_delivery_process_address', {
            'market': selectedMarket,
            'language': selectedLanguage,
            'mobilePhone': mobilePhone,
            'carrierId': carrierId,
            'submit': submit ? 1 : 0
        }),
        method: 'POST',
        data: form.serialize(),
        success: function (result) {
            $this.html(result.form);

            if (infCompActive) {
                $this.find('.js-inf-comp-container').addClass('active');
            }

            if (result.success) {
                if (submit && result.valid_zipcode) {
                    deliverySubmit(result.address.id, true);
                    return false;
                }

                changeAddress(result.address.id, result.address.country, selectedLanguage);
                return false;
            } else if (result.mobile_phone_error) {
                $(".js-mobile-phone-error.error-msg").html(result.mobile_phone_error);
                mobilePhoneError = $(".js-mobile-phone-error");
                if (typeof mobilePhoneError != "undefined") {
                    mobilePhoneError.show();
                    placeholderFormDisplay();
                    mobilePhoneError.siblings(".input").addClass('error');
                }
            } else if (result.address.score !== addressQualityCode.valid) {
                console.log('capAddress codeQ : ', result.address.score);
                console.log('capAddress ERROR infos', result.address);
                console.log('capAddress LENGTH', result.address.suggestions.length);

                /* VAR Result Address */
                var suggestionLength = result.address.suggestions.length;
                var customerAddressNumber = result.address.suggestions[0].number;
                var customerAddressStreet = result.address.suggestions[0].address_line;
                var customerAddressZipCode = result.address.suggestions[0].zip_code;
                var customerAddressCity = result.address.suggestions[0].city;
                
                /* VAR DOM */
                var customerAddressInfo = document.querySelector('#customer-address-info');
                var suggestListWrapper = document.querySelector('.js-suggest-list');
                // var itemAddress = $('<li class="item-address row"></li>');

                if (!stateCloseModal) {
                    bindCloseModal();
                }

                /* RETURN Customer address */
                customerAddressInfo.innerHTML = fillSuggestAddressList(customerAddressNumber, customerAddressStreet, customerAddressZipCode, customerAddressCity);

                /* Vider UL*/
                while (suggestListWrapper.firstChild) {
                    suggestListWrapper.removeChild(suggestListWrapper.firstChild)
                };

                if (suggestionLength > 1) {
                    console.log('suggestionLength', suggestionLength);
                    var domFragment = document.createDocumentFragment();

                    for (var i = 1, size = suggestionLength; i < size; i++) {
                        console.log('SUGGESTION: ', result.address.suggestions[i]);
                        
                        /* VAR DOM */
                        var itemAddress = document.createElement('li');
                        var itemInfo = document.createElement('span');
                        var itemButton = document.createElement('button');

                        /* VAR Result Address */
                        var suggestAddressNumber = result.address.suggestions[i].number;
                        var suggestAddressStreet = result.address.suggestions[i].address_line;
                        var suggestAddressZipCode = result.address.suggestions[i].zip_code;
                        var suggestAddressCity = result.address.suggestions[i].city;
                        
                        /* VAR Wording */
                        var textWording = {
                            fr: {
                                choice: 'choisir'
                            }
                        }

                        /* Ajouter itemAddress au contenu */
                        itemAddress.classList.add('item-address', 'row');
                        itemInfo.classList.add('item-info', 'col-xs-7');
                        itemButton.classList.add('btn', 'btn-lg', 'btn-form--choose', 'js-btn-form-choose', 'col-xs-4', 'col-xs-offset-1');
                        
                        itemButton.innerText = textWording.fr.choice;
                        itemInfo.innerText = fillSuggestAddressList(suggestAddressNumber, suggestAddressStreet, suggestAddressZipCode, suggestAddressCity);

                        // itemAddress.setAttribute('id', 'address-' + [i]);

                        itemAddress.appendChild(itemInfo);
                        itemAddress.appendChild(itemButton);
                        domFragment.appendChild(itemAddress);

                        // [].forEach.call(document.querySelectorAll(itemAddress), function (itemButton) {
                        itemButton.addEventListener('click', function (event) {
                            // code…
                            console.log('Choice click');
                            event.preventDefault();
                            console.log('ClassLIST:', this.previousSibling.innerHTML);
                            updateAddressFields(suggestAddressNumber, suggestAddressStreet, suggestAddressZipCode, suggestAddressCity, carrierId);
                        })
                        // });
                    }

                    // if (typeof domFragment !== 'undefined') || (typeof suggestListWrapper !== 'undefined') {
                    suggestListWrapper.appendChild(domFragment);
                    // }
                } else {
                    var domFragment = document.createDocumentFragment();
                    var itemAddress = document.createElement('li');
                    itemAddress.classList.add('item-address', 'row');

                    var itemInfo = document.createElement('span');
                    itemInfo.classList.add('item-info', 'col-xs-7');

                    itemInfo.innerText = 'Aucune suggestion.';

                    /* Ajouter itemAddress au fragment */
                    itemAddress.appendChild(itemInfo);
                    domFragment.appendChild(itemAddress);
                    suggestListWrapper.appendChild(domFragment);
                }

                modalDisplay(popinParams.type.suggest); 
            }

            hideLoader();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            redirectToDeliveryPage(market, language);
        },
        complete: function () {
            columnEqualizer();
            placeholderFormDisplay();
            keyboardTabFix();
            updateCountryFlag(market);

            if ($('.error').length) {
                /* if (!stateCloseModal) {
                    bindCloseModal();
                } */

                // modalDisplay(popinParams.type.suggest);
                
                var selectedOption = $("#js-country").find(":selected").data("country");
                scrolltoTarget($('.error:first'));
                updateCountryFlag(selectedOption);
            }

            if (typeof bindCapAddress == 'function') {
                bindCapAddress();
            }

            /**
             * Need to manage placeholder behaviour on disabled input
             */
            if (typeof cityInputDisabled !== "undefined" && cityInputDisabled.length) {
                var cityValueExist = cityInputDisabled.val().length;

                if (cityValueExist) {
                    $('.js-cap-city.disabled').next('label').addClass('slideup-placeholder');
                }
            }
        }
    });
}

/********************** BILLING ADDRESS ****************************/
$(".js-delivery_content").on('click', '#js-billing-address-component .js-edit-address', function () {
    showLoader();
    $('#js-billing-address-component .js-address-content').hide();
    var addressId = $('#js-billing-address-component .js-address-content').data('address-id');
    showEditAddressForm(addressId);
});

function keyboardTabFix() {
    if (navigator.userAgent.indexOf('Android') != -1) {
        $('.fields-content input').on('focus', function (e) {
            $('body > .wrapper').css({ 'padding-bottom': '400px' });
            scrolltoTarget($(this));
        });
    }
}
