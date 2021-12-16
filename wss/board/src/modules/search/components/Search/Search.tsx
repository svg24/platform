import type { BaseSyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';
import { Store } from 'src/store';

export function Search(): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  function checkIsActive(code: string): boolean {
    return code === 'Slash' && document.activeElement !== ref.current;
  }
  function handleOnKeyup(ev: KeyboardEvent): void {
    if (checkIsActive(ev.code)) ref.current?.focus();
  }
  function handleOnKeydown(ev: KeyboardEvent): void {
    if (checkIsActive(ev.code)) ev.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('keyup', handleOnKeyup);
    document.addEventListener('keydown', handleOnKeydown);
  }, []);

  return (
    <form
      className="search"
      id="search"
    >
      <input
        className="search__field"
        placeholder="Search by name"
        ref={ref}
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
