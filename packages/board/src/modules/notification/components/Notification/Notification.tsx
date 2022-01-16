import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { Transition } from 'src/components';
import { Portal } from 'src/components/Portal';
import { useStore } from 'src/store';

const NotificationIcon = (): JSX.Element => {
  const { notification } = useStore();
  const { isNegative, isPositive, value } = notification.type;
  const className = `notification__icon notification__icon_${value.current}`;

  if (isNegative) return XCircleIcon({ className });
  if (isPositive) return CheckCircleIcon({ className });

  return InformationCircleIcon({ className });
};

export function Notification(): JSX.Element {
  const { notification } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    reaction(() => notification.isVisible, () => {
      if (notification.isVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  return (
    <Portal>
      <Transition
        classNames="notification"
        isVisible={isVisible}
        ms={300}
      >
        <div
          className="notification notification_top-right"
          tabIndex={-1}
        >
          <NotificationIcon />
          <p className="notification__description">
            {notification.description.value.current}
          </p>
        </div>
      </Transition>
    </Portal>
  );
}
