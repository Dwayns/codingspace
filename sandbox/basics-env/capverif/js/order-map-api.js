/*
 * Scripts for order Google MAP API
 */

/* *************** GOOGLE MAP CONFIG *************** */
function bindDeliveryPoints(selectedDpId) {
    if(!isMobile) {
        var zindex = 100;
        markers.forEach(function (marker) {
            var label = marker.getLabel();
            zindex++;

            if (label !== undefined) {
                if (marker.get('dp-id') == selectedDpId) {
                    label.color = "#ffffff";
                    marker.setIcon(getMapIcons(marker.get('dp-type')).selected);
                    marker.setLabel(label);
                    marker.setZIndex(1000);
                } else {
                    label.color = "#3b3b3b";
                    marker.setIcon(getMapIcons(marker.get('dp-type')).default);
                    marker.setLabel(label);
                    marker.setZIndex(zindex);
                }
            }
        });
    }

    $('.relay-map-info-list-addresses-content li').each(function () {
        $(this).removeClass('selected');
        $(this).find('.js-dp-infos').removeClass('current');
    });

    $('#dp-' + selectedDpId).addClass('selected');
    $('#dp-' + selectedDpId).find('.js-dp-infos').addClass('current');
}

/* *************** MAP INIT *************** */
function initMap(latLng, points) {
    //Return false on mobile (width device less than 480)
    var isDraggable = $(document).width() > 480 ? true : false;

    map = createMap(latLng, isDraggable, 12);

    /* **** ADD MARKERS AND SET MAP BOUNDS TO FIT ALL MARKERS **** */
    var bounds = new google.maps.LatLngBounds();
    var selectedDpId = $('.relay-addresses-container').data('dp-id');
    markers = [];
    points.forEach(function(point, index) {
        var marker = addMarker(point, index);
        markers.push(marker);
        bounds.extend(marker.getPosition());
    });

    var marker = new google.maps.Marker({
        icon: iconPath + 'geoloc-position.svg',
        map: map,
        position: latLng,
        title: '',
    });

    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);

    // Add markers on map
    function addMarker(point, index) {
        var iconId = index+1;

        var marker = new google.maps.Marker({
            label: {
                color: "#3b3b3b",
                fontSize: "15px",
                fontWeight: "bold",
                labelClass: "labels",
                text: ''+ iconId +'',
            },
            map: map,
            position: new google.maps.LatLng(point.latitude, point.longitude),
            optimized: false,
            title: point.title,
            zIndex: 100
        });

        marker.set('dp-id', point.id);
        marker.set('dp-type', point.type.name);

        marker.addListener('click', function() {
            var selectedDP = marker.get('dp-id');

            bindDeliveryPoints(marker.get('dp-id'));
            scrollListToHighLightedDP(selectedDP);
        });

        return marker;
    }

    /* ADD LIST INDEX ON MARKERS PICTOS */
    var listMarker = $('.js-relay-map-info-list-addresses'),
        pointerMarker = $('.js-pointer-number');

    listMarker.each(function(index) {
        $(this).find(pointerMarker).text(index+1);
    });
}

/* GENERATE SVG MARKERS ON THE MAP */
var markerFile = {
    BPR: 'geoloc-marker-yellow.svg',
    BDP: 'geoloc-marker-yellow.svg',
    ACP: 'geoloc-marker-orange.svg',
    CMT: 'geoloc-marker-orange.svg',
    A2P: 'geoloc-marker-orange.svg',
    CDI: 'geoloc-marker-orange.svg',
    store: 'geoloc-marker.svg',
    relay: 'geoloc-marker.svg'
};

function getMapIcons(carrierType) {
    return {
        default: {
            labelOrigin: new google.maps.Point(21, 17),
            scaledSize: new google.maps.Size(40, 40),
            url: iconPath + markerFile[carrierType]
        },
        selected: {
            labelOrigin: new google.maps.Point(21, 17),
            scaledSize: new google.maps.Size(40, 40),
            url: iconPath + 'geoloc-selected.svg'
        }
    }
}

function emptyMap() {
    createMap(new google.maps.LatLng(46.386250, 3.151197), false, 6);
}

function createMap(latLng, isDraggable, zoom) {
    map = new google.maps.Map(document.getElementById('js-relay-map-embed'), {
        center: latLng,
        draggable: isDraggable,
        mapTypeControl: false,
        disableDoubleClickZoom: false,
        zoomControl: isDraggable,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        minZoom: 4,
        scrollwheel: isDraggable, // Prevent users to start zooming the map when scrolling down the page
        streetViewControl: false,
        zoom: zoom
    });

    return map;
}