import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Spin } from 'src/components/Spin';
import { LogosStore } from '../../store';

export const LogosSentinel = (): JSX.Element => {
  const { ctx } = LogosStore;

  ctx.sentinel.ref = useRef<HTMLDivElement>(null);

  const root = {
    el: observer(() => {
      const mod = ctx.list.isMore ? '' : 'logos-sentinel_hidden';

      return (
        <div
          className={`logos-sentinel ${mod}`}
          ref={ctx.sentinel.ref}
        >
          {root.content}
        </div>
      );
    }),
    content: (
      <>
        <Spin className="logos-sentinel__icon" />
        <span>
          Loading more...
        </span>
      </>
    ),
  };

  return <root.el />;
};
