import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  ClipboardIcon,
  DownloadIcon,
} from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { delay } from 'src/utils';
import './index.css';

export default ({
  content,
  name,
  slug,
}: {
  content: {
    html: string;
    isMany: boolean;
    next: () => void;
    prev: () => void;
  };
  name: string;
  slug: string;
}): JSX.Element => {
  const output = {
    ref: useRef<HTMLOutputElement>(null),
    _msg: useState<null | string>(null),
    get msg() {
      return output._msg[0];
    },
    set msg(val) {
      output._msg[1](val);
    },
    mouseleave: null as ((value: unknown) => void) | null,
    show: async (actionEl: RefObject<HTMLButtonElement>, msg: string) => {
      await Promise.race([delay(3000), new Promise((resolve) => {
        output.msg = msg;
        output.mouseleave = resolve;

        output.ref.current?.classList.add('logos-item-actions__output_show');
        output.ref.current?.addEventListener('mouseleave', output.mouseleave);
      })]);

      output.close(actionEl);
    },
    close: (actionEl: RefObject<HTMLButtonElement>) => {
      actionEl.current?.blur();
      output.ref.current?.classList.remove('logos-item-actions__output_show');

      if (output.mouseleave) {
        output.ref.current?.removeEventListener(
          'mouseleave',
          output.mouseleave,
        );
      }
    },
  };

  const actions = [
    ...content.isMany
      ? [{
        id: 'prev',
        icon: ArrowSmLeftIcon,
        label: 'Show previews variant',
        ref: useRef<HTMLButtonElement>(null),
        handler: content.prev,
      }, {
        id: 'next',
        icon: ArrowSmRightIcon,
        label: 'Show next variant',
        ref: useRef<HTMLButtonElement>(null),
        handler: content.next,
      }]
      : [],
    {
      id: 'download',
      icon: DownloadIcon,
      isSubmit: true,
      label: `Download ${name} logo`,
      ref: useRef<HTMLButtonElement>(null),
      handler: (actionEl: RefObject<HTMLButtonElement>) => {
        try {
          const blob = new Blob([content.html]);
          const link = document.createElement('a');

          Object.assign(link, {
            href: window.URL.createObjectURL(blob),
            download: `${slug}.svg`,
          });

          link.click();
          link.remove();
          output.show(actionEl, 'Downloaded');
        } catch (err) {
          output.show(actionEl, 'Download error');
        }
      },
    }, {
      id: 'copy',
      icon: ClipboardIcon,
      isSubmit: true,
      label: `Copy ${name} logo`,
      ref: useRef<HTMLButtonElement>(null),
      handler: async (actionEl: RefObject<HTMLButtonElement>) => {
        try {
          await navigator.clipboard.writeText(content.html);
          output.show(actionEl, 'Copied');
        } catch (err) {
          output.show(actionEl, 'Copy error');
        }
      },
    },
  ].map((action) => (
    <button
      aria-label={action.label}
      className="logos-item-actions__action"
      key={action.id}
      ref={action.ref}
      type={action.isSubmit ? 'submit' : 'button'}
      onClick={() => {
        action.handler(action.ref);
      }}
    >
      <action.icon
        aria-hidden="true"
        className="logos-item-actions__icon"
      />
    </button>
  ));

  return (
    <form
      className="logos-item-actions"
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <div className="logos-item-actions__container">
        {actions}
      </div>
      <output
        className="logos-item-actions__output"
        ref={output.ref}
      >
        <p className="logos-item-actions__msg">
          {output.msg}
        </p>
      </output>
    </form>
  );
};
