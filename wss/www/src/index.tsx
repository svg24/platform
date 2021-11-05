import React from 'react';
import ReactDOM from 'react-dom';
import Doc from './modules/doc';
import LayoutRoot from './modules/layout/components/layout-root/layout-root';
import LogosRoot from './modules/logos/components/logos-root/logos-root';

ReactDOM.render(
  <React.StrictMode>
    <Doc>
      <LayoutRoot>
        <LogosRoot />
      </LayoutRoot>
    </Doc>
  </React.StrictMode>,
  document.getElementById('root'),
);
