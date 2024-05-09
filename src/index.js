import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FormDataProvider } from './context/FormDataContext';

ReactDOM.render(
  <React.StrictMode>
    <FormDataProvider>
      <App />
    </FormDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
