import { initStore } from './store';

export { initStore };

export const debounce = (
  <F extends (...args: any[]) => any>(fn: F, ms: number): any => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => (
      new Promise((resolve) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
          resolve(fn(...args));
        }, ms);
      })
    );
  }
);

export const escapeStr = (str: string): string => (
  JSON.stringify(str).slice(1, -1).replace(/\s+/g, ' ')
);

export const delay = (ms: number): Promise<unknown> => (
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
);

export const isInViewport = (element: HTMLDivElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= document.documentElement.clientHeight
      && rect.right <= document.documentElement.clientWidth
      && rect.height !== 0
      && rect.width !== 0
  );
};
