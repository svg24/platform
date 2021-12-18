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

export { debounce };
