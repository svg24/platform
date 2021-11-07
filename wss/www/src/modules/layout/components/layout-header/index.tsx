import Logo from 'src/components/logo';
import LayoutNav from '../layout-nav';
import './index.css';

export default (): JSX.Element => (
  <header className="layout-header">
    <span className="layout-header__logo">
      <Logo />
    </span>
    <LayoutNav />
  </header>
);
