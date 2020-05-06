/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-undef */
console.log('***** XHR jQuery Loaded ! *****');

/* ////////////////// AJAX jQuery REQUEST ////////////////// */
// $() => Shorthand for $( document ).ready()
/* $(function() {
  $('.btn').click(function() {
    console.log('jQUEEEERY !!!!');
  });
}); */

/* ****************** $.ajax ********************* */
$(function() {
  $('#ajax').click(function() {
    console.log('CLICKED !');

    $.ajax({
      method: 'GET',
      url: 'https://baconipsum.com/api/?type=meat-and-filler',
      // dataType: 'json', // If not specify by defaut a "intelligent guess" will be used
    })
      // eslint-disable-next-line no-use-before-define
      .done(paddText)
      .fail(function() {
        // eslint-disable-next-line no-alert
        alert('FAILED !');
      });

    function paddText(data) {
      $('p').text(data[0]);
    }
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

  /* ****************** $.get ********************* */
  $('#getBtn').click(function() {
    $.get('../json/default.json')
      .done(function(data) {
        console.log(data);
      })
      .fail(function() {
        console.log('ERROR !');
      });
  });

  /* ****************** $.pos ********************* */
  $('#postBtn').click(function() {
    // eslint-disable-next-line no-var
    var data = { name: 'Jack', city: 'Kin' };

    $.post('www.google.com', data)
      .done(function(data) {
        console.log('Hi!');
      })
      .fail(function() {
        console.log('ERROR !');
      });
  });

  /* ****************** $.getJSON ********************* */
  $('#getJSONBtn').click(function() {
    $.getJSON('../json/default.json')
      .done(function(data) {
        console.log(data);
      })
      .fail(function() {
        console.log('PROBLEM !');
      });
  });
});
