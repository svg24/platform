import React, { useEffect, useRef } from 'react';
import docStore from '@svg24/www/src/modules/doc/store';
import store from '../../store';
import './logos-search.css';

export default () => {
  const docInst = docStore.inst;
  const { inst } = store;

  const form = {
    el: useRef<HTMLFormElement>(),
    onSubmit: (ev: Event) => {
      ev.preventDefault();
    },
    mount: () => useEffect(() => {
      form.el.current.addEventListener('submit', form.onSubmit);

      return () => {
        form.el.current.removeEventListener('submit', form.onSubmit);
      };
    }),
  };

  form.mount();

  const field = {
    el: useRef<HTMLInputElement>(),
    ev: null,
    get isActive() {
      return (
        field.ev.code === 'Slash'
          && document.activeElement !== field.el.current
          && !docInst.isFixed
      );
    },
    onKeyup: (ev: KeyboardEvent) => {
      field.ev = ev;

      if (field.isActive) {
        field.el.current.focus();
      }
    },
    onKeydown: (ev: KeyboardEvent) => {
      field.ev = ev;

      if (field.isActive) ev.preventDefault();
    },
    onInput: (ev: React.SyntheticEvent) => {
      inst.processSearch(ev);
    },
    mount: () => useEffect(() => {
      document.addEventListener('keyup', field.onKeyup);
      document.addEventListener('keydown', field.onKeydown);

      return () => {
        document.removeEventListener('keyup', field.onKeyup);
        document.removeEventListener('keydown', field.onKeydown);
      };
    }),
  };

  field.mount();

  return (
    <section className="logos-search">
      <h1 className="logos-search__heading">
        Predictable logos
      </h1>
      <form
        className="logos-search__form"
        id="logos-search-form"
        ref={form.el}
      >
        <input
          className="logos-search__field"
          placeholder="Search by name"
          ref={field.el}
          type="search"
          onInput={field.onInput}
        />
        <kbd className="logos-search__key">
          /
        </kbd>
      </form>
    </section>
  );
};
