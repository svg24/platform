import React from 'react';
import ReactDOM from 'react-dom';
import Doc from './modules/doc';
import LayoutRoot from './modules/layout';
import Logos from './modules/logos';

ReactDOM.render(
  <React.StrictMode>
    <Doc>
      <LayoutRoot>
        <Logos />
      </LayoutRoot>
    </Doc>
  </React.StrictMode>,
  document.getElementById('root'),
);
