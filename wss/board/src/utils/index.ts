import { getStateAnimation } from './state';
import { initStoreFormParameter, initStoreVisible } from './store';

export {
  getStateAnimation,
  initStoreFormParameter,
  initStoreVisible,
};

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

export function deepAssign<Target, Source>(
  target: Target,
  source: Source,
): Target & Source {
  const properties = Object.keys(source).reduce((descriptors, key) => {
    Object.assign(descriptors, {
      [key]: Object.getOwnPropertyDescriptor(source, key),
    });
    return descriptors;
  }, {});

  Object.defineProperties(target, properties);

  return target as Target & Source;
}
