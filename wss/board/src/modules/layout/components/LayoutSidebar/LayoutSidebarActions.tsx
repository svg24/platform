export const LayoutSidebarActions = (): JSX.Element => {
  const actions = [{
    id: 'copy',
    name: 'Copy',
    checked: true,
    async handler(content: string | undefined) {
      if (content) {
        await navigator.clipboard.writeText(content);
      }
    },
  }, {
    id: 'download',
    name: 'Download',
    async handler(content: string | undefined, file?: string) {
      if (content && file) {
        const blob = new Blob([content]);
        const link = document.createElement('a');

        Object.assign(link, {
          href: window.URL.createObjectURL(blob),
          download: file,
        });

        link.click();
        link.remove();
      }
    },
  }];

  return (
    <form className="layout-sidebar__actions">
      <h2 className="layout-sidebar__sub-heading">
        Actions
      </h2>
      {actions.map((action) => (
        <label
          className="layout-sidebar__label"
          key={action.id}
        >
          <input
            className="layout-sidebar__input"
            defaultChecked={action.checked}
            name="actions"
            type="radio"
          />
          <span className="layout-sidebar__name">
            {action.name}
          </span>
        </label>
      ))}
    </form>
  );
};
