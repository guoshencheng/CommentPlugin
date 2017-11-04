import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createApp } from 'ayano-react';
import ReactDOM from 'react-dom';
import { homeRouter } from './routers';

//redux actions and reducers
import reducers from './scripts/reducers';
import * as actions from './scripts/actions';

// api routers define
import apis from './scripts/apis.js';

import './index.scss';

const app = createApp({ reducers, routers: homeRouter, actions, apis, auto: true, customThunk: true, prefix: "@ayano-react" });

app.start(document.querySelector('#root'));
