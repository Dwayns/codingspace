/*------------- ORDER DELIVERY SPLIT ------------*/
function choiceDeliverySplitMode() {
    var splitOptionContainer = $('.js-split-option-container');
    var splitOptions = $('.js-split-option');
    var inputChoices = $('.js-split-option-entry');
    var panBlock = $('#bl-pan-date-split');
    var isSplitted = splitOptionContainer.hasClass('js-splitted');
    
    if (typeof splitOptionContainer !== "undefined" && typeof splitOptions !== "undefined") {
        /**
         * Check if user has already choose a split option
         */
        if (isSplitted) {
            splitOptions.removeClass('active');
            inputChoices.removeProp('checked');
            splitOptions.eq(1).addClass('active');
            inputChoices.eq(1).prop('checked', true);
            panBlock.prop('checked', true);
        }


        /**
         * User choose a split option
         */
        splitOptions.on('click', function (e) {
            e.preventDefault();
            var isActive = $(this).hasClass('active');
            var inputChoicesValue = $(this).find(inputChoices).val();
            var orderParams = { 'splitChoice': inputChoicesValue };

            if (isActive) {
                return false;
            }

            splitOptions.removeClass('active');
            inputChoices.removeProp('checked');
            $(this).find(inputChoices).prop('checked', true);
            $(this).addClass('active');

            deliveryReload('', '', '', '', orderParams);
        });
    }
}
