
import { methods } from 'ayano-react';

let apis = {
  repo: {
    path: '/repos/guoshencheng/ayano',
    method: methods.get
  },
  login: {
    path: '/api/login',
    method: methods.post
  },
  profile: {
    path: '/api/profile',
    method: methods.get
  }
}

export default apis;
