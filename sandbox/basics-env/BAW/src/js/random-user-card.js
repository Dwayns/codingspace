console.log("***** RUC Loaded ! *****");

window.onload = function() {
    var url = "../json/users.json";

    var btnNext = document.querySelector(".btn");

    btnNext.addEventListener('click', function() {
        console.log('Click');

        fetch(url)
        .then(handleErrors)
        .then(function(data) {
            console.log(data);
        })
        .catch(function(response) {
            console.log(response);
        });
    });

    function handleErrors(request) {
            // console.log("TEST : ", request.status);
        if(!request.ok) {
            // console.log("OK : ", response.status);
            throw Error(request.status);
        }

        // return request; // Just the response
        return request.json(); // Parsing response
    }
}
