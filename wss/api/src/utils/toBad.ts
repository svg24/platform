export function toBad(error: unknown): { docs: string; error: unknown } {
  return {
    error,
    docs: 'https://github.com/svg24/platform/blob/main/wss/api/svg24.md',
  };
}
