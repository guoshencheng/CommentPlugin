import { Switch, Route } from 'react-router-dom';
import Home from './views/Home/Home.js';
import NaviHeader from './components/NaviHeader.js';
import { connectApp } from 'ayano-react';

const Container = ({ match, actions }) => {
  const parent = match.path;
  actions.auth.profile()
  return (
    <div className="app-container">
      <Switch>
        <NaviHeader></NaviHeader>
        <Route path={ `${parent}` } component={ Home } ></Route>
      </Switch>
    </div>
  )
}

export const homeRouter = {
  home: {
    path: '/',
    component: connectApp()(Container),
  },
}
