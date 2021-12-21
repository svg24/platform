import type { BaseSyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';
import { Store } from 'src/store';

function SearchField(): JSX.Element {
  const rootRef = useRef<HTMLInputElement>(null);

  function checkIsActive(code: string): boolean {
    return code === 'Slash' && document.activeElement !== rootRef.current;
  }

  useEffect(() => {
    document.addEventListener('keyup', (ev) => {
      if (checkIsActive(ev.code)) rootRef.current?.focus();
    });
    document.addEventListener('keydown', (ev) => {
      if (checkIsActive(ev.code)) ev.preventDefault();
    });
  }, []);

  return (
    <input
      className="search__field"
      placeholder="Search by name"
      ref={rootRef}
      type="search"
      onInput={(ev: BaseSyntheticEvent) => {
        Store.search.process(ev.target.value);
      }}
    />
  );
}

export function Search(): JSX.Element {
  return (
    <form
      className="search"
      id="search"
    >
      <SearchField />
      <kbd className="search__key">
        /
      </kbd>
    </form>
  );
}
