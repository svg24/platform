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

export const escapeString = (string: string): string => (
  JSON.stringify(string).slice(1, -1).replace(/\s+/g, ' ')
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
