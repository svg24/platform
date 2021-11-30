import { LogosStore } from '../../store';

export const LogosList = (
  { children }: { children: JSX.Element[] },
): JSX.Element => {
  const { ctx } = LogosStore;
  /**
   * Мы это уберем.
   * Добавить ref на список и через стор менять класс.
   */
  // const mod = `logos-list_${ctx.filter.params.size.val.cur}`;
  const mod = `logos-list_base`;

  return (
    <ol className={`logos-list ${mod}`}>
      {children}
    </ol>
  );
};
