import { StrictMode } from 'react';
import { render } from 'react-dom';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Store, StoreProvider } from './store';
import { Home } from './views/Home';
import 'swiper/css';
import './index.css';

SwiperCore.use([Navigation, Thumbs]);

render(
  <StrictMode>
    <StoreProvider value={Store}>
      <Home />
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root'),
);
