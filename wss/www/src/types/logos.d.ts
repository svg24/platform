export type LogosItem = {
  category: string,
  content: string[],
  date: string,
  name: string,
  slug: string,
  src: string,
}

export type LogosList = {
  data: LogosItem[],
  isMore: boolean,
}
