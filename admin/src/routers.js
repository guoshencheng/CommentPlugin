import { Switch, Route } from 'react-router-dom';
import Home from './views/Home/Home.js';
import NaviHeader from './components/NaviHeader.js';

const Container = ({ match }) => {
  const parent = match.path;
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
    component: Container,
  },
}
