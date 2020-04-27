console.log("***** XHR jQuery Loaded ! *****");

/* ////////////////// AJAX jQuery REQUEST //////////////////*/

/* ****************** $.ajax **********************/
$("#priceBitcoin").click(function() {
    console.log("CLICKED !");

    $.ajax({
        method: "GET",
        url: "api.com",
        dataType: "json"
    })
    .done(function(data) {
        console.log(data);
        $("p").text(data[0]);
    })
    .fail(function() {
        alert("FAILED !")
    })
});

// POST with datas
/* $.ajax({
    method: "POST",
    url: "api.com",
    data: { name:"Jack", location:"Wwakanda"}
})
.done(function(res) {
    console.log(res);
}) */

/* ****************** $.get **********************/
$("#getBtn").click(function() {
    $.get("../json/defaults.json")
    .done(function(data) {
        console.log(data)
    })
    .fail(function() {
        console.log("ERROR !");
    })
});

/* ****************** $.pos **********************/
$("#postBtn").click(function() {
    var data = {name:"Jack", city:"Kin"};

    $.post("www.url.com", data)
    .done(function(data) {
        console.log("Hi!");
    })
    .fail(function() {
        console.log("ERROR !");
    })
});

/* ****************** $.getJSON **********************/
$("#getJSONBtn").click(function() {
    $.getJSON("../json/defaults.json")
    .done(function(data) {
        console.log(data)
    })
    .fail(function() {
        console.log("PROBLEM !");
    })
});


/* ************************************************** */