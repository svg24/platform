import { ShoppingBagIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { LayoutStore } from '../../store';
import { LayoutMainContainer } from './LayoutMainContainer';
import { LayoutMainFilter } from './LayoutMainFilter';

export const LayoutMain = (
  { children }: { children: JSX.Element },
): JSX.Element => {
  const { ctx } = LayoutStore;

  const filter = {
    el: observer(() => (
      ctx.main.filter.isVisible
        ? <LayoutMainFilter />
        : <></>
    )),
  };

  const bag = {
    icon: ShoppingBagIcon,
    onClick: () => {},
  };

  return (
    <main
      className="layout-main"
    >
      <filter.el />
      <LayoutMainContainer>
        {children}
      </LayoutMainContainer>
      <div className="layout-main__actions">
        <button
          className="layout-main__btn"
          type="button"
          onClick={bag.onClick}
        >
          <bag.icon className="layout-main__icon" />
        </button>
      </div>
    </main>
  );
};
