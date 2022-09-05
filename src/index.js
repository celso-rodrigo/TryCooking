import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/RecipesProvider';

ReactDOM.render(
  <BrowserRouter>
    <RecipesProvider>
      <App />
    </RecipesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
