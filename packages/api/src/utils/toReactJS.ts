export function toReactJS(name: string, jsx: string): string {
  return `export const ${name} = (props) => (\n${
    jsx.replace(/<svg (.*?)>/, '<svg $1 {...props}>')
  }\n);`;
}
