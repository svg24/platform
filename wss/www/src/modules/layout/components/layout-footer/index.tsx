import './index.css';

export default (): JSX.Element => (
  <footer className="layout-footer">
    <p className="layout-footer__by">
      {'Made by '}
      <a
        className="layout-footer__link"
        href="https://github.com/vanyauhalin"
      >
        @vanyauhalin
      </a>
      {' for everyone'}
    </p>
  </footer>
);
