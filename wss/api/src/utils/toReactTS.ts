export function toReactTS(name: string, jsx: string): string {
  return `export const ${name} = (props: React.ComponentProps<'svg'>): JSX.Element => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n);`;
}
