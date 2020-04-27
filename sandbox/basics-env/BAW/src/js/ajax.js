console.log("***** XHR Loaded ! *****");

/* ////////////////// AJAX REQUEST //////////////////*/

/* ************************************************** */
/* ****************** XHR REQUEST **********************/
/* var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
    // console.log("READY STATE IS..." + XHR.readyState);
    if(XHR.readyState == 4 && XHR.status == 200) {
        console.log(XHR.responseText);
    } else {
        console.log("Something goes wrong : " + XHR.status);
    }

}
XHR.open("GET", "../json/default.json");
XHR.send(); */

/* ************************************************** */

// Whole DOM loaded include styles, images and others
/* window.onload = function() {
    // console.log("On load !");
    var XHR = new XMLHttpRequest();

    var btn = document.querySelector('button'),
        priceField = document.getElementById('priceBitcoin');

    checkPrice();

    btn.addEventListener('click', function() {
        // console.log("Cliked !");
        checkPrice();
    });

    function checkPrice() {
        XHR.onreadystatechange = function() {
            if(XHR.readyState == 4 && XHR.status == 200 ) {
                var data = JSON.parse(XHR.responseText);
                console.log(data.price);
                priceField.innerHTML = data.price + " " + data.currency.dollar
                // console.log(XHR.responseText);
            }
        }

        var url = "../json/default.json";
        XHR.open("GET", url);
        XHR.send();
    }
}

// Whole DOM only loaded
document.addEventListener("DOMContentLoaded", function() {
    // console.log("DOM loadeed !");
    var btn = document.querySelector('button'),
        priceField = document.getElementById('priceBitcoin');


    btn.addEventListener('click', function() {
        var XHR = new XMLHttpRequest();

        XHR.onload = function() {
            if(XHR.status >== 200 && XHR.status < 400 ) {
                var data = JSON.parse(XHR.responseText);
                priceField.innerHTML = data.price + " " + data.currency.dollar
            }
        }

        XHR.onerror = function() {
            console.log("Request ERROR !");
        }

        var url = "../json/default.json";
        XHR.open("GET", url);
        XHR.send();
    });
}); */


/* ************************************************** */
/* ****************** FETCH API **********************/
var url = "../json/defaults.json";

/* fetch(url) // By default the method is "GET"
.then(function(data) {
    console.log(data);
    console.log("Data status : ", data.status);
})
.catch(function(data) {
    console.log("WRONG", data);
}) */

/* fetch(url)
.then(function(response) {
    console.log(response);
    // console.log(response.json()); ??? Cause problems with next "then" data
    return response.json();
})
.then(function(data) {
    console.log("Data :", data);
})
.catch(function(data) {
    console.log("WRONG", data.status);
}) */

/* OPTIONS */
/* fetch(url, {
    method: "POST",
    // body: "Im FETCH !"
    body: JSON.stringify ({
        name : 'blue',
        login: 'bluecat'
    })
})
.then(function(response) {
    return response.json();
})
.catch(function(data) {
    console.log("WRONG", data.status);
}) */

/* ERROR REQUEST */
fetch(url)
/* .then(function(res) {
    if(!res.ok) {
        // throw Error("ERROOOOR !");
        throw Error(res.status);
    }

    return res;
}) */
.then(handleErrors)
/* .then(function(res) {
    console.log("RES: ", res.status)
}) */
.catch(function(error) {
    // console.log("WRONG RES: ", res.status);
    console.log(error);
})

function handleErrors(request) {
    if(!request.ok) {
        throw Error(request.status);
    }

    return request;
}

/* ************************************************** */