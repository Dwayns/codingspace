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

                var suggestionLength = result.address.suggestions.length;
                var addressNumber = result.address.suggestions[0].number;
                var addressStreet = result.address.suggestions[0].address_line;
                var addressZipCode = result.address.suggestions[0].zip_code;
                var addressCity = result.address.suggestions[0].city;

                var customerAddress = $('#customer-address-info');
                var suggestListWrapper = $('.js-suggest-list');
                // var itemAddress = $('<li class="item-address row"></li>');

                if (!stateCloseModal) {
                    bindCloseModal();
                }
                
                function fillAddress(number, street, zipcode, city) {
                    var itemInfo = number + ' ' + street + ' ' + zipcode + ' ' + city ;

                    return itemInfo;
                }

                /* RETURN Customer address */
                customerAddress.html( fillAddress(addressNumber, addressStreet, addressZipCode, addressCity) );


                /* RETURN Suggest address */
                /* Vider UL*/
                suggestListWrapper.empty();

                if (suggestionLength > 1) {
                    console.log('suggestionLength', suggestionLength);

                    for (var i = 1; i < suggestionLength; i++) {
                        console.log('SUGGESTION: ', result.address.suggestions[i]);

                        // var suggestionPosition = result.address.suggestions[i];
                        addressNumber = result.address.suggestions[i].number;
                        addressStreet = result.address.suggestions[i].address_line;
                        addressZipCode = result.address.suggestions[i].zip_code;
                        addressCity = result.address.suggestions[i].city;

                        /* Creer items address */
                        var itemAddress = $('<li class="item-address row"></li>');
                        var itemInfoBegin = '<span class="item-info col-xs-7"><strong>';
                        var itemInfoEnd = '</strong></span>';
                        var itemButton = '<button class="btn btn-lg btn-form--choose js-btn-form-choose col-xs-4 col-xs-offset-1">' + 'CHOISIR' + '</button>';

                        // itemAddress.addClass('item-address row');
                        itemAddress.prop('id', 'address-' + [i]);

                        /* Creer span info*/
                        itemAddress.html(itemInfoBegin + fillAddress(addressNumber, addressStreet, addressZipCode, addressCity) + itemInfoEnd + itemButton);

                        /* Ajouter itemAddress au contenu */
                        itemAddress.appendTo(suggestListWrapper);
                    }
                } else {
                    var itemAddress = $('<li class="item-address row"></li>');
                    itemAddress.addClass('item-address row');

                    /* Creer span info*/
                    itemAddress.html('Aucune suggestion.');

                    /* Ajouter itemAddress au contenu */
                    itemAddress.appendTo(suggestListWrapper);
                }

                /* Creer button */
                // itemAddress.innerHTML += '<button class="btn btn-lg btn-form--choose js-btn-form-choose col-xs-4 col-xs-offset-1">'+ 'TEST' +'</button>';
                

                /* BTN CHOISIR */
                // var forceCapAddress = false;
                // var customerAddressId = $('#customer-address-id').prop('id', result.address.id);
                // var selectedDpId = $(this).data('dp-id');
                // deliveryReload(carrierId, currentSelectedAddressId, selectedDpId, currentSearchAddress);
                // form-fields: .js-cap-zipcode | zip_code, .js-cap-city | city, #address | number & address_line
                $('.js-btn-form-choose').on('click', function (){
                    //
                });

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
