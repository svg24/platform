import React, { createContext, useContext } from 'react';
import type { ReactElement } from 'react';

export class DocStore {
  /**
   * React
   */

  readonly ctx = createContext<DocStore | null>(null);

  readonly provider = ({ children }: {
    children: ReactElement;
  }): JSX.Element => (
    <this.ctx.Provider value={this}>
      {children}
    </this.ctx.Provider>
  );

  get inst(): DocStore {
    return useContext(this.ctx);
  }

  /**
   * El
   */

  el = document.documentElement;

  fix(): void {
    this.el.classList.add('doc_fixed');
  }

  unFix(): void {
    this.el.classList.remove('doc_fixed');
  }

  get isFixed(): boolean {
    return this.el.classList.contains('doc_fixed');
  }

  touch(): void {
    this.el.classList.add('doc_touch');
  }

  static get isTouchDevice(): boolean {
    return !!window.ontouchstart || navigator.maxTouchPoints > 0;
  }
}

export default new DocStore();
