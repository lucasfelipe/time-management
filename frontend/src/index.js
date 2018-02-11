import React from 'react';
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import PrivateRouteContainer from './containers/PrivateRouteContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Root from './containers/Root'
import  configureStore from './store/configureStore'
import configureHistory from './store/configureHistory';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


//import 'admin-lte/dist/css/AdminLTE.css';
//import 'admin-lte/dist/css/skins/skin-blue.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

const store = configureStore(configureHistory)();

render(
    <Root store={store} history={configureHistory} />,
    document.getElementById('root')
)

registerServiceWorker()