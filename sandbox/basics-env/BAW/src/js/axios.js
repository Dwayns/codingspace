console.log("***** XHR jQuery Loaded ! *****");

/* ////////////////// AXIOS REQUEST //////////////////*/

/* ****************** axios.get **********************/
var url= "../json/defaults.json";

axios.get(url)
.then(function(data) {
    console.log(res.data);
})
.catch(function(e) {
    console.log(e);
});

/* ****************** axios.get with params **********************/
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

/* ****************** axios.get handle errors **********************/
function handleErrors(err) {
    if(err.response) {
        console.log("Problem with response", err.response.status);
    } else if (err.request) {
        console.log("Problem with request");
    } else {
        console.log("ERROR", err.message);
    }
}


/* ************************************************** */