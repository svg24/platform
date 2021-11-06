import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import type { BaseSyntheticEvent } from 'react';
import { DocStore } from 'src/modules/doc';
import LogosStore from '../../store';
import './index.css';

export default (): JSX.Element => {
  const docCtx = DocStore.ctx;
  const logosCtx = LogosStore.ctx;

  const field = {
    ref: useRef<HTMLInputElement>(null),
    el: observer(() => (
      <input
        className="logos-filter-search__field"
        placeholder="Search by name"
        ref={field.ref}
        type="search"
        value={field.val}
        onInput={field.onInput}
      />
    )),
    get val() {
      return logosCtx.filter.params.search.val.field;
    },
    checkActive(code: string) {
      return (
        code === 'Slash'
          && document.activeElement !== field.ref.current
          && !docCtx.isFixed
      );
    },
    onKeyup: (ev: KeyboardEvent) => {
      if (field.checkActive(ev.code)) field.ref.current?.focus();
    },
    onKeydown: (ev: KeyboardEvent) => {
      if (field.checkActive(ev.code)) ev.preventDefault();
    },
    onInput: (ev: BaseSyntheticEvent) => {
      logosCtx.filter.params.search.process(ev.target.value);
    },
    mount: () => {
      useEffect(() => {
        document.addEventListener('keyup', field.onKeyup);
        document.addEventListener('keydown', field.onKeydown);

        return () => {
          document.removeEventListener('keyup', field.onKeyup);
          document.removeEventListener('keydown', field.onKeydown);
        };
      });
    },
  };

  field.mount();

  return (
    <fieldset className="logos-filter-search">
      <legend className="logos-filter-search__legend">
        Search by name
      </legend>
      <field.el />
      <kbd className="logos-filter-search__key">
        /
      </kbd>
    </fieldset>
  );
};
