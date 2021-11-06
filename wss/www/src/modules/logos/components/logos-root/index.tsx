import Store from '../../store';
import LogosFilter from '../logos-filter';
import LogosOutput from '../logos-output';
import './index.css';

export default (): JSX.Element => (
  <Store.Provider>
    <main className="logos-root">
      <h1 className="logos-root__heading">
        Predictable logos
      </h1>
      <LogosFilter />
      <LogosOutput />
    </main>
  </Store.Provider>
);
