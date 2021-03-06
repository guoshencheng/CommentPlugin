var axios = require('axios');
const host = "https://github.com";
const apiHost = "https://api.github.com"

const response_handler = (response) => {
  if (response.status == 200 && response.data) {
    return response.data;
  } else {
    throw "response error";
  }
}

const access_token = (code) => {
  return axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    url: host + '/login/oauth/access_token',
    data: {
      code, client_id, client_secret
    }
  }).then(response_handler);
}

const user = (access_token) => {
  return axios.get(apiHost + '/user', {
    params: { access_token }
  }).then(response_handler);
}

const redirectUrl = (url) => {
  return "http://github.com/login/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + encodeURIComponent(url)
}

module.exports = {
  access_token,
  user ,
  redirectUrl
}
