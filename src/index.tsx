import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DevSupport } from '@react-buddy/ide-toolbox';

import { ComponentPreviews, useInitial } from './dev';

import { store } from './store';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <App />
      </DevSupport>
    </BrowserRouter>
  </Provider>,
);
