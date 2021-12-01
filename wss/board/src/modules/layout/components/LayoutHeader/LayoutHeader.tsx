import { AdjustmentsIcon, CogIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'src/components';
import { FilterStore } from 'src/modules/filter';
import { LogosStore } from 'src/modules/logos';
import { LayoutStore } from '../../store';

const LayoutHeaderButton = (params: {
  icon: (props: { className: string }) => JSX.Element;
  onClick: () => void;
}): JSX.Element => {
  const { onClick } = params;

  return (
    <button
      className="layout-header__btn"
      type="button"
      onClick={onClick}
    >
      <params.icon className="layout-header__icon" />
    </button>
  );
};

const LayoutHeaderFilter = (): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const filterCtx = FilterStore.ctx;
  const logosCtx = LogosStore.ctx;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    counter: {
      _ms: 300,
      _isShowed: useState(false),
      get isShowed() {
        return root.counter._isShowed[0];
      },
      set isShowed(val) {
        root.counter._isShowed[1](val);
      },
      get isDisplay() {
        return root.ref.current?.classList
          .contains('layout-header__container_counter-display');
      },
      show() {
        root.counter.isShowed = true;

        root.ref.current?.classList.add(
          'layout-header__container_counter-display',
          'layout-header__container_counter-in',
        );
        setTimeout(() => {
          root.ref.current?.classList
            .remove('layout-header__container_counter-in');
        }, root.counter._ms);
      },
      hide() {
        root.ref.current?.classList
          .add('layout-header__container_counter-out');

        setTimeout(() => {
          root.ref.current?.classList.remove(
            'layout-header__container_counter-display',
            'layout-header__container_counter-out',
          );

          root.counter.isShowed = false;
        }, root.counter._ms);
      },
    },
  };

  const counter = {
    el: observer(() => (
      <span className="layout-header__counter">
        {filterCtx.getApplied.length}
      </span>
    )),
    mount() {
      useEffect(() => {
        reaction(() => filterCtx.getApplied, () => {
          if (filterCtx.getApplied.length) {
            if (!root.counter.isDisplay) {
              root.counter.show();
            }
          } else {
            root.counter.hide();
          }
        });
      }, []);
    },
  };

  counter.mount();

  return (
    <div
      className="layout-header__container"
      ref={root.ref}
    >
      <button
        className="layout-header__btn"
        type="button"
        onClick={layoutCtx.root.filter.toggle}
      >
        <AdjustmentsIcon className="layout-header__icon" />
      </button>
      {root.counter.isDisplay
        ? (
          <>
            <counter.el />
            <button
              className="layout-header__btn"
              type="button"
              onClick={() => {
                filterCtx.reset();
                logosCtx.list.reset();
              }}
            >
              <XIcon className="layout-header__icon" />
            </button>
          </>
        )
        : <></>}
    </div>
  );
};

export const LayoutHeader = (): JSX.Element => {
  const logosCtx = LogosStore.ctx;

  const search = {
    el: observer(() => (
      <Search
        val={logosCtx.search.val.field}
        onInput={(ev) => {
          logosCtx.search.process(ev.target.value);
        }}
      />
    )),
  };

  const cog = {
    icon: CogIcon,
    onClick: () => {},
  };

  return (
    <header className="layout-header">
      <div className="layout-header__side">
        <img
          alt="Logo"
          className="layout-header__logo"
          src="https://raw.githubusercontent.com/svg24/.github/main/logo.svg"
        />
        <LayoutHeaderFilter />
        <search.el />
      </div>
      <div className="layout-header__side">
        <LayoutHeaderButton
          icon={cog.icon}
          onClick={cog.onClick}
        />
      </div>
    </header>
  );
};
