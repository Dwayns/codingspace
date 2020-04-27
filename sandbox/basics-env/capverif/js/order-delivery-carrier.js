/* *************** CHOICE DELIVERY MODE  *************** */
function choiceDeliveryMode() {
    $(document).foundation();

    var inputChoiceContainer = $('.js-delivery-choice'),
        inputChoice = $('.js-delivery-choice-entry');

    inputChoiceContainer.on('click', inputChoice, function (e) {
        if ($(this).hasClass('active') || $(this).hasClass('disabled')) {
            return false;
        }

        var carrierId = $(this).find(inputChoice).data('carrier-id');
        var href = $(this).find(inputChoice).data('href');
        inputChoiceContainer.removeClass('active');
        inputChoice.removeAttr('checked');
        $(this).find(inputChoice).attr('checked', true);
        $(this).addClass('active');
        if (href) {
            e.preventDefault();
            $(location).attr("href", href);
            showLoader();

            return false;
        }

        deliveryReload(carrierId, '', '');
        $('body').trigger('changeDeliveryMode', [this]);

        return false;
    });

    infoToggle();
    bindScheduleListener();
}