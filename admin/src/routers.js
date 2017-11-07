import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home/Home.js';
import Login from './views/Login/Login';
import NaviHeader from './components/NaviHeader.js';
import { connectApp } from 'ayano-react';
import Cookies from 'js-cookie';
console.log(Cookies.get())

const Container = ({ match, actions }) => {
  const parent = match.path;
  actions.auth.profile()
  return (
    <div className="app-container">
      <Switch>
        <NaviHeader></NaviHeader>
        <Route path={ `${parent}/admin` } component={ Home } ></Route>
      </Switch>
    </div>
  )
}

export const homeRouter = {
  home: {
    path: '/',
    children: {
      admin: {
        path: 'admin',
        component: connectApp()(Container),
      },
      login: {
        path: 'login',
        component: connectApp()(Login)
      },
      root: {
        path: '',
        exact: true,
        render: () => {
          if (true) {
            return <Redirect to="/login"/>
          } else {
            return <Redirect to="/admin"/>
          }
        }
      }
    }
  },
}
