import { XIcon } from '@heroicons/react/outline';
import { cloneElement, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { DocStore } from 'src/modules/doc';
import './index.css';

export default ({
  children,
  description,
  label,
  onClose,
  slug,
}: {
  children: ReactElement;
  description: string;
  label: string;
  onClose: () => void;
  slug: string;
}): JSX.Element => {
  const { ctx } = DocStore;

  useEffect(() => {
    ctx.fix();

    return () => {
      ctx.unFix();
    };
  });

  const modal = {
    click: (ev: MouseEvent) => {
      if (ev.target === modal.el.current) modal.close();
    },
    close: () => {
      if (modal.el.current) {
        modal.el.current.classList.add('modal_reverse');

        setTimeout(() => {
          ctx.unFix();
          onClose();
        }, 300);
      }
    },
    el: useRef<HTMLDivElement>(null),
    focusout: () => {
      if (modal.el.current) modal.close();
    },
    mount: () => {
      useEffect(() => {
        if (modal.el.current) {
          modal.el.current.addEventListener('click', modal.click);
          modal.el.current.addEventListener('focusout', modal.focusout);
        }
      });
    },
  };

  modal.mount();

  const content = cloneElement(children, {
    className: children.props.className
      ? `modal__content ${children.props.className}`
      : 'modal__content',
  });

  return (
    <div
      aria-describedby={`${slug}-description`}
      aria-labelledby={`${slug}-heading`}
      aria-modal="true"
      className="modal"
      ref={modal.el}
      role="dialog"
    >
      <div className="modal__container">
        <h3
          className="modal__heading"
          id={`${slug}-heading`}
        >
          {label}
        </h3>
        <p
          className="modal__description"
          id={`${slug}-description`}
        >
          {description}
        </p>
        {content}
        <button
          aria-label="Close modal"
          className="modal__toggle"
          type="button"
          onClick={modal.close}
        >
          <XIcon
            aria-hidden="true"
            className="modal__icon"
          />
        </button>
      </div>
    </div>
  );
};
