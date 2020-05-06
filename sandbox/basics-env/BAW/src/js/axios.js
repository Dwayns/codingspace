/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
console.log('***** Axios Loaded ! *****');

/* ****************** AXIOS REQUEST ****************** */

/* ****************** axios.get ********************* */
$(function() {
  var url = '../json/default.json';

  axios
    .get(url)
    .then(function(res) {
      console.log(res);
      console.log(res.data);
    })
    .catch(function(e) {
      console.log(e);
    });

  $('#axiosBtn').click(sendAxiosRequest);
  /* $('#axiosBtn').click(function () {
		console.log('axBtn');
	}); */

  function sendAxiosRequest() {
    axios.get('https://jsonplaaskjldceholder.typicode.com/comments', {
        params: {
          postId: 1,
        },
      })
      .then(addComments)
      .catch(handleErrors);
  }
});

function addComments(res) {
  res.data.forEach(function(comment) {
    appendComment(comment);
  });
}

function appendComment(comment) {
  // eslint-disable-next-line no-var
  var newP = $('<p></p>');
  newP.text(comment.email);
  $('section').append(newP);
}

/* ****************** axios.get with params ********************* */
/* function sendRequest() {
    // instead of www.url.com/comments?postId=1
    axios.get("www.url.com/comments", {
        params: {
            postId: 1
        }
    })
    .then(//do something)
    .catch(//do something)
} */

/* ****************** axios.get handle errors ********************* */
function handleErrors(err) {
  if (err.response) {
    console.log('Problem with response', err.response.status);
  } else if (err.request) {
    console.log('Problem with request');
  } else {
    console.log('ERROR', err.message);
  }
}

/* ************************************************** */
