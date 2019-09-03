import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Firebase, {FirebaseContext} from './components/Firebase/index';
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app.jsx'
import './assets/sass/style.scss'
import reducer from './reducer/index'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);
