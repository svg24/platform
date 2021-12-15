import type { BaseSyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';
import { Store } from 'src/store';

export function Search(): JSX.Element {
  const field = {
    ref: useRef<HTMLInputElement>(null),
    checkActive(code: string) {
      return code === 'Slash' && document.activeElement !== field.ref.current;
    },
    onKeyup: (ev: KeyboardEvent) => {
      if (field.checkActive(ev.code)) field.ref.current?.focus();
    },
    onKeydown: (ev: KeyboardEvent) => {
      if (field.checkActive(ev.code)) ev.preventDefault();
    },
    mount: () => {
      useEffect(() => {
        document.addEventListener('keyup', field.onKeyup);
        document.addEventListener('keydown', field.onKeydown);

        return () => {
          document.removeEventListener('keyup', field.onKeyup);
          document.removeEventListener('keydown', field.onKeydown);
        };
      }, []);
    },
  };

  field.mount();

  return (
    <form
      className="search"
      id="search"
    >
      <input
        className="search__field"
        placeholder="Search by name"
        ref={field.ref}
        type="search"
        onInput={(ev: BaseSyntheticEvent) => {
          Store.search.process(ev.target.value);
        }}
      />
      <kbd className="search__key">
        /
      </kbd>
    </form>
  );
}
