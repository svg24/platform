export function toBad(error: unknown): { docs: string; error: unknown } {
  return {
    error,
    docs: 'https://github.com/svg24/platform/blob/main/packages/api/svg24.md',
  };
}
