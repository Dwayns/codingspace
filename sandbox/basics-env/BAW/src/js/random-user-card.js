/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-console */
const userCardFn = function() {
  // eslint-disable-next-line no-console
  console.log('***** RUC Loaded ! *****');

  window.onload = function() {
    // DOM
    const avatar = document.querySelector('.avatar');
    const fullName = document.querySelector('.name');
    const userName = document.querySelector('.username');
    const email = document.querySelector('.email');
    const city = document.querySelector('.city');
    const btnNext = document.querySelector('.btn');

    // const url = '../json/users.json'; // Local file
    const urlRandomApi = 'https://randomuser.me/api/';

    btnNext.addEventListener('click', function() {
      console.log('Click');

      fetch(urlRandomApi)
        .then(handleErrors)
        .then(parseJSON)
        .then(fillCard)
        .catch(logError);
    });

    function handleErrors(res) {
      if (!res.ok) {
        // console.log("!OK : ", request.status);
        throw Error(res.status);
      }
      return res;
    }

    function parseJSON(res) {
      const objectData = res.json().then(function(parsedData) {
        return parsedData.results[0];
      });

      return objectData;
    }

    function fillCard(data){
      const nameData = data.name.first;
      const lastNameData = data.name.last;
      const avatarData = data.picture.large;
      const userNameData = data.login.username;
      const emailData = data.email;
      const cityData = data.location.city;

      fullName.innerText = `${nameData} ${lastNameData}`;
      avatar.src = avatarData;
      userName.innerText = userNameData;
      email.innerText = emailData;
      city.innerText = cityData;
    }

    function logError(err) {
      console.log('Something goes wrong : ', err);
    }

    /* function handleErrors(request) {
      console.log('TEST : ', request.status);
      if (!request.ok) {
        // console.log("!OK : ", request.status);
        throw Error(request.status);
      }

      console.log('REQUEST : ', request);
      // return request; // return a response
      return request.json(); // Parsing response and return an object
    } */
  };
};

userCardFn();
