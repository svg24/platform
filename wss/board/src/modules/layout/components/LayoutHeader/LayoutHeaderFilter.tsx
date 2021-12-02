import { AdjustmentsIcon, XIcon } from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { FilterStore } from 'src/modules/filter';
import { LogosStore } from 'src/modules/logos';
import { LayoutStore } from '../../store';

export const LayoutHeaderFilter = (): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const filterCtx = FilterStore.ctx;
  const logosCtx = LogosStore.ctx;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    get ls() {
      return root.ref.current?.classList;
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
        reaction(() => (
          filterCtx.getApplied.length && layoutCtx.main.filter.isVisible
        ), counter.toggle);
      }, []);
    },
    toggle() {
      if (!filterCtx.getApplied.length || layoutCtx.main.filter.isVisible) {
        if (counter.isDisplay) {
          counter.hide().then(() => {
            counter.isShowed = false;
          });
        }
      } else {
        counter.isShowed = true;
        counter.show();
      }
    },
    _ms: 300,
    _isShowed: useState(false),
    get isShowed() {
      return counter._isShowed[0];
    },
    set isShowed(val) {
      counter._isShowed[1](val);
    },
    get isDisplay() {
      return root.ls?.contains('layout-header__container_counter-display');
    },
    hide(): Promise<void> {
      return new Promise((resolve) => {
        root.ls?.add('layout-header__container_counter-out');
        setTimeout(() => {
          root.ls?.remove('layout-header__container_counter-display');
          root.ls?.remove('layout-header__container_counter-out');
          resolve();
        }, counter._ms);
      });
    },
    show() {
      root.ls?.add('layout-header__container_counter-display');
      root.ls?.add('layout-header__container_counter-in');
      setTimeout(() => {
        root.ls?.remove('layout-header__container_counter-in');
      }, counter._ms);
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
        onClick={layoutCtx.main.filter.toggle}
      >
        <AdjustmentsIcon className="layout-header__icon" />
      </button>
      {counter.isDisplay
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
