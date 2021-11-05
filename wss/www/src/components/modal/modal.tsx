import { XIcon } from '@heroicons/react/outline';
import docStore from '@svg24/www/src/modules/doc/store';
import React, { cloneElement, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import './modal.css';

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
  onClose(): void;
  slug: string;
}): JSX.Element => {
  const docInst = docStore.inst;

  useEffect(() => {
    docInst.fix();

    return () => {
      docInst.unFix();
    };
  });

  const modal = {
    click: (ev: MouseEvent) => {
      if (ev.target === modal.el.current) modal.close();
    },
    close: () => {
      modal.el.current.classList.add('modal_reverse');

      setTimeout(() => {
        docInst.unFix();
        onClose();
      }, 300);
    },
    el: useRef<HTMLDivElement>(),
    focusout: () => {
      if (modal.el.current) modal.close();
    },
    mount: () => {
      useEffect(() => {
        modal.el.current.addEventListener('click', modal.click);
        modal.el.current.addEventListener('focusout', modal.focusout);
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
