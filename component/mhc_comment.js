import Cookies from 'js-cookie';
import config from './config.js';
import axios from 'axios';

const expires = 365;
const USER_ID_KEY = "comment_user_id";
var mhc_comment = {};

const handleResponse = (response) => {
  if (response.status == 200) {
    return response.data;
  } else {
    throw new Error(`error with status code: ${ response.status }`)
  }
}

window.mhc_comment = mhc_comment;

mhc_comment.login = (cb) => {
  var windowObjectReference = window.open(
    config.host + "/comment/login",
    "DescriptiveWindowName",
    "width=420,height=230,resizable,scrollbars=yes,status=1"
  );
  var timer = setInterval(function() {   
    if(windowObjectReference.closed) {  
      clearInterval(timer);  
      cb && cb()
    }  
  }, 1000); 
}

mhc_comment.comments = () => {
  return axios.get(`${config.host}/comments`, {
    params: {
      url: window.location.href
    },
    withCredentials: true
  }).then(handleResponse)
}

mhc_comment.user = () => {
  return axios.get(`${config.host}/users`, {
    withCredentials: true
  }).then(handleResponse)
}

mhc_comment.createComment = (data) => {
  return axios({
    url: `${config.host}/comments`,
    method: "post",
    data: data
  }).then(handleResponse);
}

mhc_comment.check = () => {
  return !!Cookies.get(USER_ID_KEY);
}

mhc_comment.logout = () => {
  Cookies.remove(USER_ID_KEY);
}

export default mhc_comment;

