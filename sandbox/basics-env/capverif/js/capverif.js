console.log('page LOADED');

var jsonRes = '{"suggestion": "SearchAdresse"}';

/*var jsonRes = {
    "response": "SearchAdresse", 
    "iRet": 0, 
    "AdOut": [{
        "Cp": "75001", "Loc": "PARIS", 
        "INSEE": "75101", 
        "CodeRet": "4X64X72210", 
        "CQA": "20", "ligne1": "", 
        "ligne4": "56PASTEUR", 
        "ligne6": "75001 PARIS", 
        "Pop": "0000016865", 
        "IntPop": 69
    }]
}*/
var result = JSON.parse(jsonRes);
console.log('jSon result: ', result);

/*var json = '{"result":true, "count":42}';
obj = JSON.parse(json);

console.log('jSon result: ', json);*/

Données : json(scoreAdresse, codeQualitéAdresse, listeSuggestion, numeroAdresse, rueAdresse, codepostalAdresse, villeAdresse)
Elements : ul-contenair, li>span, bouton
functions: listerSuggestion, choisirSuggestion, updateAdresseAvecSuggestion, envoiAdresse 
js-suggest-list > id
var addressSuggest = result.address.suggestions;
var addressCustomer = addressSuggest[0];
var addressSuggest = addressSuggest[i];
var itemAddressClasses = ('item-address', 'row');
suggestAddressNumber > numberAddressSuggest

/********************** CREATE ADDRESS ACTION ************************/
function processAddress($this, submit) {
    var form = $this.find('.js-form-address');

    $.ajax({
        url: 'et',
        method: 'POST',
        data: form.serialize(),
        success: function (result) {
            if (result.address.score !== addressQualityCode.valid) {
                console.log('capAddress codeQ : ', result.address.score);
                console.log('capAddress ERROR infos', result.address);
                console.log('capAddress LENGTH', addressSuggest.length);

                /* VAR Result Address */
                var suggestionLength = addressSuggest.length;
                var addressCustomer = addressCustomer;
                var customerAddressNumber = addressCustomer.number;
                var customerAddressStreet = addressCustomer.address_line;
                var customerAddressZipCode = addressCustomer.zip_code;
                var customerAddressCity = addressCustomer.city;
                
                /* VAR DOM */
                var customerAddressInfo = document.querySelector('#customer-address-info');
                var suggestListWrapper = document.querySelector('.js-suggest-list');
                /* Ajouter itemAddress au contenu */
                var itemAddressClasses = ('item-address', 'row');
                var itemInfoClasses = ('item-info', 'col-xs-7');
                // var itemAddress = $('<li class="item-address row"></li>');


                /* VAR Wording */
                var textWording = {
                    fr: {
                        choice: 'choisir'
                    }
                }

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
                        console.log('SUGGESTION: ', addressSuggest[i]);
                        
                        /* VAR DOM */
                        var itemAddress = document.createElement('li');
                        var itemInfo = document.createElement('span');
                        var itemButton = document.createElement('button');

                        /* VAR Result Address */
                        var addressSuggest = addressSuggest[i];
                        var suggestAddressNumber = addressSuggest.number;
                        var suggestAddressStreet = addressSuggest.address_line;
                        var suggestAddressZipCode = addressSuggest.zip_code;
                        var suggestAddressCity = addressSuggest.city;
                        
                        itemAddress.classList.add(itemAddressClasses);
                        itemInfo.classList.add(itemInfoClasses);
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
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERROR AJAX');
        },
        complete: function () {
            console.log('COMPLETE AJAX');
        }
    });
}