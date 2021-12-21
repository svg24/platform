import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { Transition } from 'src/components';
import { Portal } from 'src/components/Portal';
import { useStore } from 'src/store';

const NotificationRoot = forwardRef<HTMLDivElement>((_, ref) => {
  const { notification } = useStore();
  const NotificationIconObserved = observer(() => {
    const { current } = notification.type.value;
    const block = 'notification__icon';
    const className = `notification__icon ${block}_${current}`;

    if (current === 'negative') return XCircleIcon({ className });
    if (current === 'positive') return CheckCircleIcon({ className });

    return InformationCircleIcon({ className });
  });
  const NotificationDescriptionObserved = observer(() => (
    <p className="notification__description">
      {notification.description.value.current}
    </p>
  ));

  return (
    <div
      className="notification notification_top-right"
      ref={ref}
      tabIndex={-1}
    >
      <div className="notification__content">
        <NotificationIconObserved />
        <NotificationDescriptionObserved />
      </div>
    </div>
  );
});

export function Notification(): JSX.Element {
  const { notification } = useStore();
  const NotificationTransitionObserved = observer(({ children }) => (
    <Transition
      classNames="notification"
      isVisible={notification.isVisible}
      ms={300}
    >
      {children}
    </Transition>
  ));

  return (
    <Portal>
      <NotificationTransitionObserved>
        <NotificationRoot />
      </NotificationTransitionObserved>
    </Portal>
  );
}
