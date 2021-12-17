import { setRef } from './setRef';
import { getStateAnimation } from './state';
import { initStoreFormParameter, initStoreVisible } from './store';
import { useForkRef } from './useForkRef';

function debounce<F extends (...props: any[]) => any>(fn: F, ms: number): any {
  let timeout: NodeJS.Timeout;

  return (...props: Parameters<F>): Promise<ReturnType<F>> => (
    new Promise((resolve) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        resolve(fn(...props));
      }, ms);
    })
  );
}

function escapeString(string: string): string {
  return JSON.stringify(string).slice(1, -1).replace(/\s+/g, ' ');
}

function isInViewport(element: HTMLDivElement): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= document.documentElement.clientHeight
      && rect.right <= document.documentElement.clientWidth
      && rect.height !== 0
      && rect.width !== 0
  );
}

function getDescriptorMap<S>(source: S): PropertyDescriptorMap & ThisType<S> {
  return Object.getOwnPropertyNames(source).reduce((map, key) => {
    Object.assign(map, {
      [key]: Object.getOwnPropertyDescriptor(source, key),
    });
    return map;
  }, {});
}

function deepAssign<T, S>(target: T, source: S): T & S {
  Object.defineProperties(target, getDescriptorMap(source));
  return target as T & S;
}

function deepCopy<T, S>(target: T, source: S): T & S {
  const obj = {} as T & S;

  Object.defineProperties(obj, getDescriptorMap(target));
  Object.defineProperties(obj, getDescriptorMap(source));

  return obj;
}

export {
  debounce,
  deepAssign,
  deepCopy,
  escapeString,
  getStateAnimation,
  initStoreFormParameter,
  initStoreVisible,
  isInViewport,
  setRef,
  useForkRef,
};
