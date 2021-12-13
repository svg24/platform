import { XIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
import { UserStore } from 'src/modules/user';

export function Modal({
  children,
  heading,
  onClose,
}: {
  children: JSX.Element;
  heading: string;
  onClose: () => void;
}): JSX.Element {
  const userCtx = UserStore.ctx;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    get rect() {
      return root.ref.current?.getBoundingClientRect();
    },
    mount() {
      useEffect(root.setRect, []);
    },
    setRect() {
      const parentRect = root.ref
        .current?.parentElement?.getBoundingClientRect();
      const { current } = root.ref;

      if (parentRect && current) {
        const render = {
          _pd: userCtx.document.toRem(0.5),
          get width() {
            return current.clientWidth + render._pd * 2;
          },
          get isTop() {
            return parentRect.top > render.width;
          },
          get isLeft() {
            return parentRect.left > render.width;
          },
          get yStyle() {
            return '100%';
          },
          get xStyle() {
            return '0';
          },
        };

        if (render.isTop) {
          current.style.bottom = render.yStyle;
        } else {
          current.style.top = render.yStyle;
        }

        if (render.isLeft) {
          current.style.right = render.xStyle;
        } else {
          current.style.left = render.xStyle;
        }

        current.style.display = 'block';
      }
    },
  };

  root.mount();

  return (
    <div
      className="modal"
      ref={root.ref}
    >
      <header className="modal__header">
        <h3 className="modal__heading">
          {heading}
        </h3>
        <button
          className="modal__button"
          type="button"
          onClick={onClose}
        >
          <XIcon className="modal__icon" />
        </button>
      </header>
      <div className="modal__content">
        {children}
      </div>
      {/* <footer className="modal__footer">
        <button
          className="button"
          type="button"
        >
          Reset to default
        </button>
      </footer> */}
    </div>
  );
}
