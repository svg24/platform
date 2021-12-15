import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Store, StoreProvider } from './store';
import Home from './views/Home';
import 'swiper/css';
import './index.css';

render(
  <StrictMode>
    <StoreProvider value={Store}>
      <Home />
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root'),
);
