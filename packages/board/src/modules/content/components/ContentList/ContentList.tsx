import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { useStore } from 'src/store';

function ContentList({ children }: { children: JSX.Element[] }): JSX.Element {
  const { settings } = useStore();
  const { value } = settings.size;
  const [sizeValue, setSizeValue] = useState(value.current.id);

  function mount(): void {
    setSizeValue(`content-list_${value.current.id}`);
  }

  useEffect(() => {
    mount();
    reaction(() => value.current, mount);
  }, []);

  return (
    <ol className={`content-list ${sizeValue}`}>
      {children}
    </ol>
  );
}

export { ContentList };
