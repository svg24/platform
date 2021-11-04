import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Modal from '@svg24/www/src/components/modal/modal';
import React, { useRef, useState } from 'react';
import './layout-nav.css';

const GITHUB = 'https://github.com/vanyauhalin/svg24';

export default () => {
  const nav = {
    el: useRef<HTMLUnknownElement>(),
    get isListShowed() {
      return nav.el.current.classList.contains('layout-nav_show-list');
    },
    toggleList() {
      nav.el.current.classList.toggle('layout-nav_show-list');
    },
  };

  const toggle = {
    el: useRef<HTMLButtonElement>(),
    _isExpanded: useState(false),
    get isExpanded() {
      return toggle._isExpanded[0];
    },
    set isExpanded(val) {
      toggle._isExpanded[1](val);
    },
    toggleExpand() {
      toggle.isExpanded = !toggle.isExpanded;
    },
    _label: useState('Show navigation'),
    get label() {
      return toggle._label[0];
    },
    set label(val) {
      toggle._label[1](val);
    },
    toggleLabel() {
      if (nav.isListShowed) {
        toggle.label = 'Show navigation';
      } else {
        toggle.label = 'Close navigation';
      }
    },
    onClick: () => {
      toggle.toggleLabel();
      toggle.toggleExpand();
      nav.toggleList();
    },
  };

  const um = {
    slug: 'um-what',
    label: 'Um, what?',
    description: 'Dialog window containing more details about the project.',
    content: (
      <div>
        <p>
          SVG24 is a collection of predictable optimized logos
          designed to be rendered at 24x24.
        </p>
        <p>
          Logos are first optimized manually and then automatically.
        </p>
      </div>
    ),
    visibleState: useState(false),
    get isVisible() {
      return um.visibleState[0];
    },
    set isVisible(value) {
      um.visibleState[1](value);
    },
    show: () => {
      um.isVisible = true;
    },
    close: () => {
      um.isVisible = false;
    },
  };

  const support = {
    slug: 'support',
    label: 'Support',
    description: 'Dialog window containing info on how to support the project.',
    content: (
      <div>
        <p>
          Feel free suggest any logos to add to the collection via
          {' '}
          <a href="mailto:vanyauhalin@gmail.com">
            email
          </a>
          {' or '}
          <a href={`${GITHUB}/issues`}>
            issue
          </a>
          . In addition, you can offer any ideas for project development.
        </p>
        <p>
          Also, I will be glad a star on
          {' '}
          <a href={GITHUB}>
            GitHub
          </a>
          .
        </p>
      </div>
    ),
    visibleState: useState(false),
    get isVisible() {
      return support.visibleState[0];
    },
    set isVisible(value: boolean) {
      support.visibleState[1](value);
    },
    show: () => {
      support.isVisible = true;
    },
    close: () => {
      support.isVisible = false;
    },
  };

  const btns = [um, support].map((item) => (
    <li key={item.slug}>
      <button
        aria-haspopup="true"
        aria-label={`Open "${item.label}" modal`}
        className="layout-nav__el"
        type="button"
        onClick={item.show}
      >
        {item.label}
      </button>
      {item.isVisible && (
        <Modal
          description={item.description}
          label={item.label}
          slug={item.slug}
          onClose={item.close}
        >
          {item.content}
        </Modal>
      )}
    </li>
  ));

  const links = [{
    id: 'sources',
    label: 'Sources',
    url: `${GITHUB}/tree/db`,
  }, {
    id: 'github',
    label: 'GitHub',
    url: GITHUB,
  }].map((link) => (
    <li key={link.id}>
      <a
        className="layout-nav__el"
        href={link.url}
      >
        {link.label}
      </a>
    </li>
  ));

  return (
    <nav
      className="layout-nav"
      ref={nav.el}
    >
      <button
        aria-controls="layout-nav-list"
        aria-expanded={toggle.isExpanded}
        aria-label={toggle.label}
        className="layout-nav__toggle"
        ref={toggle.el}
        type="button"
        onClick={toggle.onClick}
      >
        <MenuIcon
          aria-hidden="true"
          className="layout-nav__icon"
        />
        <XIcon
          aria-hidden="true"
          className="layout-nav__icon"
        />
      </button>
      <ul
        className="layout-nav__list"
        id="layout-nav-list"
      >
        {btns}
        {links}
      </ul>
    </nav>
  );
};
