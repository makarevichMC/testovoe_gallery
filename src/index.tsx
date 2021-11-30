import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Me from './images/me.png';

const me = {
    photoUrl:Me,
    name:'Andrew',
    id: 1
}

export const CurrentUser = React.createContext(me);


ReactDOM.render(
  <React.StrictMode>
      <CurrentUser.Provider value={me}>
          <App />
      </CurrentUser.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
