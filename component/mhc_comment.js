import Cookies from 'js-cookie';
import config from './config.js';
import axios from 'axios';

const expires = 365;
const USER_INFO_KEY = "mhc_comment_user_info";
var mhc_comment = {};

window.mhc_comment = mhc_comment;

mhc_comment.setUserInfo = (userInfo) => {
   Cookies.set(USER_INFO_KEY, { id: userInfo.id }, { expires })
  mhc_comment.logincb && mhc_comment.logincb(userInfo);
}

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

mhc_comment.check = () => {
  return !!Cookies.get(USER_INFO_KEY);
}

mhc_comment.logout = () => {
  Cookies.remove(USER_INFO_KEY);
}

export default mhc_comment;

