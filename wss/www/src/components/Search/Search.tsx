import type { BaseSyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';

export const Search = ({
  onInput,
  val,
}: {
  onInput: (ev: BaseSyntheticEvent) => void;
  val: string;
}): JSX.Element => {
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
    <form className="search">
      <input
        className="search__field"
        placeholder="Search by name"
        ref={field.ref}
        type="search"
        value={val}
        onInput={onInput}
      />
      <kbd className="search__key">
        /
      </kbd>
    </form>
  );
};
