export const debounce = <F extends (...args: any[]) => any>(fn: F, ms: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => (
    new Promise((resolve) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => resolve(fn(...args)), ms);
    })
  );
};

export const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const escapeStr = (str: string): string => (
  JSON.stringify(str).slice(1, -1).replace(/\s+/g, ' ')
);
