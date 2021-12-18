import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';

function ContentList({ children }: { children: JSX.Element[] }): JSX.Element {
  const { settings } = useStore();
  const ContentListObserved = observer(() => {
    const { current } = settings.size.value;
    const size = current ? `content-list_${current.id}` : '';

    return (
      <ol className={`content-list ${size}`}>
        {children}
      </ol>
    );
  });

  return <ContentListObserved />;
}

export { ContentList };
