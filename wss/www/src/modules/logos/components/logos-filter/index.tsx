import { XIcon } from '@heroicons/react/outline';
import Select from '@svg24/www/src/components/select/select';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import LogosStore from '../../store';
import LogosFilterSearch from '../logos-filter-search';
import './index.css';

export default (): JSX.Element => {
  const { ctx } = LogosStore;

  const form = {
    el: useRef<HTMLFormElement>(null),
    onSubmit: (ev: Event) => {
      ev.preventDefault();
    },
    mount: () => {
      useEffect(() => {
        form.el.current?.addEventListener('submit', form.onSubmit);

        return () => {
          form.el.current?.removeEventListener('submit', form.onSubmit);
        };
      });
    },
  };

  form.mount();

  const Row = observer(() => (
    <div className="logos-filter__row">
      {[
        ctx.filter.params.sortBy,
        ctx.filter.params.size,
      ]
        .map((pr) => (
          <Select
            defaultValue={pr.val.cur}
            key={pr.id}
            legend={pr.name}
            options={pr.opts}
            onChange={pr.onChange}
          />
        ))}
      {ctx.filter.isActive ? (
        <button
          className="logos-filter__clear"
          type="button"
          onClick={ctx.filter.reset}
        >
          <XIcon className="logos-filter__icon" />
        </button>
      ) : <></>}
    </div>
  ));

  return (
    <form
      className="logos-filter"
      id="logos-filter"
      ref={form.el}
    >
      <LogosFilterSearch />
      <Row />
    </form>
  );
};
