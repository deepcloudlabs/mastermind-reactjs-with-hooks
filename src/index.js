import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import Mastermind from './components/mastermind';

ReactDOM.render(
  <React.StrictMode>
    <Mastermind />
  </React.StrictMode>,
  document.getElementById('root')
);
