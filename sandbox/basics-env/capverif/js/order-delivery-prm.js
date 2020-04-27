/* ********************* RELAY MODAL ********************* */
var currentSearchAddress = $('.js-search-address').val();
var searchAddress = null;
var SEARCH_ADDRESS_ACTION = 'search';
var OPEN_POPIN_ACTION = 'open';

function bindCloseModal() {
    $('.js-btn-close-modal').on('click', function () {
        modalDisplay(popinParams.type.map);
        $('.js-search-address').val(currentSearchAddress);
        errorSearchDisplayHide();
        $('.error-active').removeClass('error-active').addClass('hide');
        stateCloseModal = true;
        return stateCloseModal;
    });
}

function errorSearchDisplayShow() {
    $('.js-search-address-error').removeClass('hide');
}

function errorSearchDisplayHide() {
    $('.js-search-address-error').addClass('hide');
};

function checkSearchAddressVal(searchAddress) {
    if (!searchAddress.length) {
        errorSearchDisplayShow();
    } else {
        showLoader();
        errorSearchDisplayHide();
        $('.error-active').removeClass('error-active').addClass('hide');

        refreshDeliveryPointByAddress(searchAddress, SEARCH_ADDRESS_ACTION);

        // Hide mobile Keyboard
        $('input[type=search]').blur();
    }
}

function searchAction(e) {
    e.preventDefault();
    searchAddress = isOpenModal() ? $('.js-search-address').val() : $('.js-dp-search-address').val();
    checkSearchAddressVal(searchAddress);
}

function changeRelayAddress() {
    iconPath = "/order-static/common/img/pictos/";
    markers = [];
    map = null;

    emptyFieldSearchAddress();

    // Display relay popin
    $('.js-btn-relay-mod').on('click', function () {
        showLoader();
        refreshDeliveryPointByAddress(currentSearchAddress, OPEN_POPIN_ACTION);
    });

    $('.js-btn-search-address').on('click', searchAction);
    // Event for "search" button on mobile
    $('.js-search-address-form').on('submit', searchAction);
}

function refreshDeliveryPointByAddress(address, action) {
    var currentSelectedAddressId = $("#mdm_order_selected_shippingAddress_id").attr('data-shippingAddress-id');
    $.ajax({
        type: "GET",
        url: Routing.generate('mdm_order_delivery_get_delivery_points', {
            market: market,
            language: language,
            addressId: currentSelectedAddressId,
            address: address
        }),
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (!stateCloseModal) {
                bindCloseModal();
            }

            var geoLoc = data.delivery_points;
            if (geoLoc.state == 'success') {
                var addressLat = geoLoc.latitude;
                var addressLon = geoLoc.longitude;
                var points = geoLoc.points;
                var customerLatLng = new google.maps.LatLng(addressLat, addressLon);
                modalDisplay(popinParams.type.map);
                $('.js-prm-list-content').html(data.delivery_points_content);
                $('.js-address-proximity').text(address);
                $('.js-search-address').val(address);

                bindScheduleListener();
                bindDeliveryPointsListener();
                bindDeliveryPointsChoseListener();
                isMobile ? false : initMap(customerLatLng, points);
                var HighlightedDP = getHighlightedDeliveryPoint(points, $('.relay-addresses-container').data('dp-id'));
                bindDeliveryPoints(HighlightedDP);
            } else {
                if (!isMobile) {
                    emptyMap();
                }
                searchAddress = null;
                errorSearchDisplayShow();
                modalDisplay(popinParams.type.map);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            redirectToDeliveryPage(market, language);
        },
        complete: function () {
            hideLoader();
            columnEqualizer();

            if (action == OPEN_POPIN_ACTION) {
                var selectedDP = $('.relay-addresses-container').data('dp-id');
            } else {
                var selectedDP = $('.js-relay-map-info-list-addresses').first().data('dp-id');
            }

            if (typeof selectedDP !== 'undefined') {
                scrollListToHighLightedDP(selectedDP);
            }
        }
    })
}

function bindDeliveryPointsListener() {
    $('.relay-map-info-list-addresses .js-dp-infos-pointer, .relay-map-info-list-addresses .js-dp-infos-title').on('click', function () {
        var selectedDpId = $(this).parents('.relay-map-info-list-addresses').data('dp-id');
        bindDeliveryPoints(selectedDpId);
    });
}

/* ********** CHANGE DELIVERY POINT ************ */
function bindDeliveryPointsChoseListener() {
    $('.js-btn-form-choose').on('click', function () {
        var containerSubmitBtn = $(this).closest('.js-relay-map-info-list-addresses');
        var selectedDpId = $(this).data('dp-id');
        var currentSelectedAddressId = $("#mdm_order_selected_shippingAddress_id").attr('data-shippingAddress-id');
        var carrierId = $('input[name=delivery-choice-entry]:checked').data('carrier-id');
        var $errorMessage = containerSubmitBtn.find('.msg-modifier--error');
        currentSearchAddress = searchAddress != null ? searchAddress : currentSearchAddress;

        $.ajax({
            type: "GET",
            url: Routing.generate('mdm_order_delivery_point_availability', {
                market: market,
                language: language,
                carrierId: carrierId,
                deliveryPointId: selectedDpId
            }),
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('html, body').removeClass('no-overflow');
                if (data.success) {
                    deliveryReload(carrierId, currentSelectedAddressId, selectedDpId, currentSearchAddress);
                } else if ('content' in data) {
                    if (!$errorMessage.length) {
                        containerSubmitBtn.prepend(data.content);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                redirectToDeliveryPage(market, language);
            }
        });
    });
}

/* *************** SCHEDULE *************** */
function bindScheduleListener() {
    $('.js-schedule-content-title').on('click', function (event) {
        event.preventDefault();
        if (event.handled !== true) {
            $(this).toggleClass('active');
            $(this).parents('.js-relay-addresses-container').find('.js-schedule-content-body').toggleClass('active');
            scrolltoTarget($(this));
            event.handled = true;
        }
    });
}

/* ******* CURRENT USER GEOLOCATION ******** */
function bindCurrentUserGeolocation() {
    $('.js-delivery_content').on('click', '.js-btn-my-geolocation', function () {
        showLoader();

        var geolocationContainerSelector = '.js-my-geolocation-container';
        var trackingCateogry = $(geolocationContainerSelector).data('tracking-category');
        var trackingAction = $(geolocationContainerSelector).data('tracking-action');

        if (navigator.geolocation == false) {
            $('.js-geoloc-support').removeClass('hide');
            $('.js-geoloc-support').addClass('error-active');
            launchMdmEvent(5, trackingCateogry, trackingAction, 'Geoloc PRM navigator support');
            return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            customerLatLng = new google.maps.LatLng(latitude, longitude);

            $.ajax({
                type: "GET",
                url: Routing.generate('mdm_order_delivery_get_delivery_points_by_geolocation', {
                    market: market,
                    language: language,
                    longitude: longitude,
                    latitude: latitude
                }),
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('.js-geoloc-errors').hide();
                    if (!stateCloseModal) {
                        bindCloseModal();
                    }

                    var geoLoc = data.delivery_points;
                    if (geoLoc.state == 'success') {
                        var points = geoLoc.points;
                        $('.js-prm-list-content').html(data.delivery_points_content);
                        modalDisplay(popinParams.type.map);
                        bindScheduleListener();
                        bindDeliveryPointsListener();
                        bindDeliveryPointsChoseListener();
                        isMobile ? false : initMap(customerLatLng, points);
                        var HighlightedDP = getHighlightedDeliveryPoint(points, $('.relay-addresses-container').data('dp-id'));
                        bindDeliveryPoints(HighlightedDP);
                    }

                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'latLng': customerLatLng
                    }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                $('.js-search-address').val(results[1].formatted_address);
                                $('.js-address-proximity').text(results[1].formatted_address);
                                searchAddress = results[1].formatted_address;
                            }
                        }
                    });

                    hideLoader();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    redirectToDeliveryPage(market, language);
                }
            })
        }, function (error) {
            var jsPermissionErrorSelector = '.js-geoloc-permission-denied',
                jsGeneralErrorSelector = '.js-geoloc-general',
                trackingLabel = '',
                errorClasses = 'error-active msg-modifier--error';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $(jsPermissionErrorSelector).removeClass('hide');
                    $(jsPermissionErrorSelector).addClass(errorClasses);
                    trackingLabel = 'Geoloc PRM inactive';
                    break;
                case error.TIMEOUT:
                    $(jsGeneralErrorSelector).removeClass('hide');
                    $(jsGeneralErrorSelector).addClass(errorClasses);
                    trackingLabel = 'Geoloc PRM timeout';
                    break;
                case error.POSITION_UNAVAILABLE:
                    $(jsGeneralErrorSelector).removeClass('hide');
                    $(jsGeneralErrorSelector).addClass(errorClasses);
                    trackingLabel = 'Geoloc PRM position unavailable';
                    break;
                case error.UNKNOWN_ERROR:
                    $(jsGeneralErrorSelector).removeClass('hide');
                    $(jsGeneralErrorSelector).addClass(errorClasses);
                    trackingLabel = 'Geoloc PRM unknown error';
                    break;
            }
            hideLoader();
            launchMdmEvent(5, trackingCateogry, trackingAction, trackingLabel);
        }, { maximumAge: 600000, enableHighAccuracy: true });
    });
}

/* ******* GET DELIVERY POINT TO HIGHLIGHT ID ******** */
function getHighlightedDeliveryPoint(points, selectedDP) {
    var highlightedDP = null;
    if (points.length > 0) {
        points.forEach(function (point) {
            if (point.id == selectedDP) {
                highlightedDP = selectedDP;
            }
        });

        if (!highlightedDP) {
            highlightedDP = points[0].id;
        }
    } else {
        highlightedDP = selectedDP;
    }

    return highlightedDP;
}

/* ******* UPDATE SCROLL TO SELECTED/HIGHLIGHTED DELIVERY POINT IN LIST ******** */
function scrollListToHighLightedDP(selectedDP) {
    var highLightedDP = selectedDP,
        deliveryPointID = $('#dp-' + highLightedDP),
        containerDPList = isMobile ? $('.modal-container') : $('.js-prm-list-content'),
        containerDPListTop = containerDPList.offset().top;

    if (typeof deliveryPointID.offset() !== 'undefined') {
        var DPTargetTop = isMobile ? deliveryPointID.offset().top - 30 : deliveryPointID.offset().top;
    }

    containerDPList.animate({
        scrollTop: containerDPList.scrollTop() - containerDPListTop + DPTargetTop
    }, 400);
}
