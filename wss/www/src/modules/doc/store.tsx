import React from 'react';

export class DocStore {
  /**
   * React
   */

  readonly ctx = React.createContext<DocStore | null>(null);

  readonly provider = ({ children }: { children: React.ReactElement }) => (
    <this.ctx.Provider value={this}>
      {children}
    </this.ctx.Provider>
  );

  get inst() {
    return React.useContext(this.ctx);
  }

  /**
   * El
   */

  el = document.documentElement;

  fix() {
    this.el.classList.add('doc_fixed');
  }

  unFix() {
    this.el.classList.remove('doc_fixed');
  }

  get isFixed() {
    return this.el.classList.contains('doc_fixed');
  }

  touch() {
    this.el.classList.add('doc_touch');
  }

  static get isTouchDevice() {
    return window.ontouchstart || navigator.maxTouchPoints > 0;
  }
}

export default new DocStore();
